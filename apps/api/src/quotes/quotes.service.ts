import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { prisma, QuoteStatus } from '@nri/database';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class QuotesService {
  constructor(private readonly events: EventEmitter2) {}

  async createQuote(orderId: string, dto: {
    serviceFeeCost: number;
    productCost?: number;
    shippingCost?: number;
    taxCost?: number;
    notes?: string;
    validHours?: number;
  }) {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found');

    // Invalidate previous pending quotes
    await prisma.orderQuote.updateMany({
      where: { orderId, status: QuoteStatus.PENDING_CUSTOMER },
      data: { status: QuoteStatus.EXPIRED },
    });

    const lastQuote = await prisma.orderQuote.findFirst({ where: { orderId }, orderBy: { version: 'desc' } });
    const version = (lastQuote?.version ?? 0) + 1;

    const totalUsd =
      (dto.serviceFeeCost ?? 0) +
      (dto.productCost ?? 0) +
      (dto.shippingCost ?? 0) +
      (dto.taxCost ?? 0);

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + (dto.validHours ?? 48));

    const quote = await prisma.orderQuote.create({
      data: {
        orderId,
        version,
        lineItems: [],
        serviceFeeUsd: dto.serviceFeeCost,
        productCostUsd: dto.productCost ?? 0,
        shippingCostUsd: dto.shippingCost ?? 0,
        totalUsd,
        notes: dto.notes,
        expiresAt,
        status: QuoteStatus.PENDING_CUSTOMER,
      },
    });

    // Update order status
    await prisma.order.update({
      where: { id: orderId },
      data: { status: 'QUOTE_SENT' as any },
    });

    this.events.emit('order.quote_sent', { order, quote });
    return quote;
  }

  async approveQuote(customerId: string, quoteId: string) {
    const quote = await prisma.orderQuote.findUnique({ where: { id: quoteId }, include: { order: true } });
    if (!quote) throw new NotFoundException('Quote not found');
    if (quote.order.customerId !== customerId) throw new ForbiddenException();
    if (quote.status !== QuoteStatus.PENDING_CUSTOMER) throw new ForbiddenException('Quote not pending');
    if (quote.expiresAt < new Date()) throw new ForbiddenException('Quote expired');

    return prisma.orderQuote.update({ where: { id: quoteId }, data: { status: QuoteStatus.APPROVED, approvedAt: new Date() } });
  }

  async rejectQuote(customerId: string, quoteId: string, reason?: string) {
    const quote = await prisma.orderQuote.findUnique({ where: { id: quoteId }, include: { order: true } });
    if (!quote) throw new NotFoundException('Quote not found');
    if (quote.order.customerId !== customerId) throw new ForbiddenException();
    return prisma.orderQuote.update({ where: { id: quoteId }, data: { status: QuoteStatus.REJECTED, rejectionReason: reason, rejectedAt: new Date() } });
  }

  async getQuotesForOrder(customerId: string, orderId: string) {
    const order = await prisma.order.findFirst({ where: { id: orderId, customerId } });
    if (!order) throw new NotFoundException('Order not found');
    return prisma.orderQuote.findMany({ where: { orderId }, orderBy: { version: 'desc' } });
  }
}
