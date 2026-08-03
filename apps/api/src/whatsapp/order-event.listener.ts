import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { WhatsappTemplateService } from './whatsapp-template.service';
import { prisma } from '@nri/database';

@Injectable()
export class OrderEventListener {
  constructor(private readonly t: WhatsappTemplateService) {}

  @OnEvent('order.created')
  async onCreated({ order, customerId }: any) {
    const c = await prisma.customer.findUnique({ where: { id: customerId } });
    if (!c?.whatsappPhone) return;
    await this.t.requestReceived(c.whatsappPhone, c.name, order.serviceType.replace(/_/g, ' '));
  }

  @OnEvent('order.approved_paid')
  async onApproved({ order }: any) {
    const c = await prisma.customer.findUnique({ where: { id: order.customerId } });
    if (!c?.whatsappPhone) return;
    await this.t.requestReceived(c.whatsappPhone, c.name, `Order ${order.orderNumber} approved & paid`);
  }
}
