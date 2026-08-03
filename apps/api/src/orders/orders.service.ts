import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { prisma, OrderStatus, ServiceType } from '@nri/database';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class OrdersService {
  constructor(private readonly events: EventEmitter2) {}

  async create(customerId: string, dto: any) {
    const orderNumber = `ORD-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerId,
        serviceType: dto.serviceType as ServiceType,
        title: dto.title,
        description: dto.description,
        priority: dto.priority ?? 'STANDARD',
        status: OrderStatus.NEW_REQUEST,
        requestData: { create: { data: dto.requestData ?? {} } },
      },
      include: { requestData: true },
    });
    await this.logEvent(order.id, 'ORDER_CREATED', null, OrderStatus.NEW_REQUEST, 'CUSTOMER', customerId);
    this.events.emit('order.created', { order, customerId });
    return order;
  }

  async findAll(customerId: string, page = 1, limit = 20) {
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { customerId },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          quotes: { where: { status: 'PENDING_CUSTOMER' }, take: 1 },
          shipment: { select: { trackingNumber: true, courier: true } },
        },
      }),
      prisma.order.count({ where: { customerId } }),
    ]);
    return { orders, total, page, limit };
  }

  async findOne(customerId: string, id: string) {
    const order = await prisma.order.findFirst({
      where: { id, customerId },
      include: {
        requestData: true,
        quotes: { orderBy: { version: 'desc' } },
        payments: true,
        inspection: true,
        shipment: true,
        events: { where: { isInternal: false }, orderBy: { createdAt: 'asc' } },
        documents: { where: { isSharedWithCustomer: true }, orderBy: { uploadedAt: 'desc' } },
      },
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async cancel(customerId: string, id: string) {
    const order = await prisma.order.findFirst({ where: { id, customerId } });
    if (!order) throw new NotFoundException('Order not found');
    const cancellable: OrderStatus[] = [OrderStatus.NEW_REQUEST, OrderStatus.UNDER_REVIEW, OrderStatus.QUOTE_SENT];
    if (!cancellable.includes(order.status)) throw new ForbiddenException('Cannot cancel at this stage');
    const updated = await prisma.order.update({ where: { id }, data: { status: OrderStatus.CANCELLED } });
    await this.logEvent(id, 'ORDER_CANCELLED', order.status, OrderStatus.CANCELLED, 'CUSTOMER', customerId, 'Cancelled by customer');
    this.events.emit('order.cancelled', { order: updated });
    return updated;
  }

  async rateOrder(customerId: string, id: string, rating: number, review?: string) {
    const order = await prisma.order.findFirst({ where: { id, customerId, status: OrderStatus.COMPLETED } });
    if (!order) throw new NotFoundException('Completed order not found');
    return prisma.order.update({ where: { id }, data: { customerRating: rating, customerReview: review } });
  }

  async addCustomerReply(customerId: string, orderId: string, message: string) {
    const order = await prisma.order.findFirst({ where: { id: orderId, customerId } });
    if (!order) throw new NotFoundException('Order not found');
    return prisma.orderEvent.create({
      data: {
        orderId,
        eventType: 'CUSTOMER_REPLY',
        toStatus: 'NOTE',
        actorType: 'CUSTOMER' as any,
        actorId: customerId,
        notes: message,
        isInternal: false,
      },
    });
  }

  async logEvent(orderId: string, eventType: string, from: string | null, to: string, actorType: string, actorId: string, notes?: string, isInternal = false) {
    return prisma.orderEvent.create({
      data: { orderId, eventType, fromStatus: from ?? undefined, toStatus: to, actorType: actorType as any, actorId, notes, isInternal },
    });
  }
}
