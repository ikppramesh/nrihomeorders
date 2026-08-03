import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { prisma, PaymentStatus, OrderStatus } from '@nri/database';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PaymentsService {
  private readonly stripe: Stripe;

  constructor(private readonly config: ConfigService, private readonly events: EventEmitter2) {
    this.stripe = new Stripe(config.get('STRIPE_SECRET_KEY', ''), { apiVersion: '2024-04-10' as any });
  }

  async createIntent(orderId: string, quoteId: string, customerId: string) {
    const quote = await prisma.orderQuote.findUnique({ where: { id: quoteId }, include: { order: true } });
    if (!quote) throw new NotFoundException('Quote not found');

    let customer = await prisma.customer.findUnique({ where: { id: customerId } });
    if (!customer) throw new NotFoundException('Customer not found');

    let stripeCustomerId = customer.stripeCustomerId;
    if (!stripeCustomerId) {
      const sc = await this.stripe.customers.create({ email: customer.email, name: customer.name, metadata: { customerId } });
      stripeCustomerId = sc.id;
      await prisma.customer.update({ where: { id: customerId }, data: { stripeCustomerId } });
    }

    const pi = await this.stripe.paymentIntents.create({
      amount: Math.round(Number(quote.totalUsd) * 100),
      currency: 'usd',
      customer: stripeCustomerId,
      metadata: { orderId, quoteId, customerId },
    });

    await prisma.orderPayment.create({
      data: { orderId, quoteId, stripePaymentId: pi.id, amountUsd: quote.totalUsd, status: PaymentStatus.PENDING },
    });

    return { clientSecret: pi.client_secret, paymentIntentId: pi.id };
  }

  async handleWebhook(rawBody: Buffer, sig: string) {
    const event = this.stripe.webhooks.constructEvent(rawBody, sig, this.config.get('STRIPE_WEBHOOK_SECRET', ''));

    if (event.type === 'payment_intent.succeeded') {
      const pi = event.data.object as Stripe.PaymentIntent;
      await prisma.orderPayment.updateMany({ where: { stripePaymentId: pi.id }, data: { status: PaymentStatus.CAPTURED, chargedAt: new Date() } });
      const { orderId, quoteId } = pi.metadata;
      if (orderId) {
        if (quoteId) await prisma.orderQuote.updateMany({ where: { id: quoteId }, data: { status: 'APPROVED', approvedAt: new Date() } });
        const order = await prisma.order.update({ where: { id: orderId }, data: { status: OrderStatus.APPROVED_PAID } });
        this.events.emit('order.approved_paid', { order });
      }
    }

    if (event.type === 'payment_intent.payment_failed') {
      const pi = event.data.object as Stripe.PaymentIntent;
      await prisma.orderPayment.updateMany({ where: { stripePaymentId: pi.id }, data: { status: PaymentStatus.FAILED } });
      this.events.emit('payment.failed', { metadata: pi.metadata });
    }
  }

  async refund(orderId: string, reason: string) {
    const payment = await prisma.orderPayment.findFirst({ where: { orderId, status: PaymentStatus.CAPTURED } });
    if (!payment?.stripePaymentId) throw new NotFoundException('No captured payment');
    const refund = await this.stripe.refunds.create({ payment_intent: payment.stripePaymentId });
    await prisma.orderPayment.update({
      where: { id: payment.id },
      data: { status: PaymentStatus.REFUNDED, refundAmountUsd: payment.amountUsd, refundReason: reason, refundedAt: new Date() },
    });
    return refund;
  }
}
