import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma, OrderStatus } from '@nri/database';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AdminOrdersService {
  constructor(private readonly events: EventEmitter2) {}

  async findAll(filters: {
    status?: string; serviceType?: string; agentId?: string;
    page?: number; limit?: number; search?: string;
  }) {
    const page = parseInt(filters.page as any) || 1;
    const limit = parseInt(filters.limit as any) || 20;
    const { status, serviceType, agentId, search } = filters;
    const where: any = {};
    if (status) where.status = status;
    if (serviceType) where.serviceType = serviceType;
    if (agentId) where.assignedAgentId = agentId;
    if (search) where.OR = [
      { orderNumber: { contains: search, mode: 'insensitive' } },
      { title: { contains: search, mode: 'insensitive' } },
      { customer: { name: { contains: search, mode: 'insensitive' } } },
    ];

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where, orderBy: { updatedAt: 'desc' },
        skip: (page - 1) * limit, take: limit,
        include: {
          customer: { select: { name: true, email: true } },
          agent: { select: { name: true } },
          quotes: { where: { status: 'PENDING_CUSTOMER' }, take: 1 },
        },
      }),
      prisma.order.count({ where }),
    ]);
    return { orders, total, page, limit };
  }

  async findOne(id: string) {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        customer: true, requestData: true,
        quotes: { orderBy: { version: 'desc' } },
        payments: true, inspection: true, shipment: true,
        events: { orderBy: { createdAt: 'asc' } },
        documents: { orderBy: { uploadedAt: 'desc' } },
        agent: true,
      },
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async updateStatus(id: string, status: OrderStatus, adminId: string, notes?: string) {
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException();

    const updated = await prisma.order.update({ where: { id }, data: { status } });
    await prisma.orderEvent.create({
      data: {
        orderId: id, eventType: 'STATUS_UPDATED',
        fromStatus: order.status, toStatus: status,
        actorType: 'OPS_ADMIN' as any, actorId: adminId, notes,
      },
    });
    this.events.emit(`order.${status.toLowerCase()}`, { order: updated });
    return updated;
  }

  async assignAgent(orderId: string, agentId: string, adminId: string) {
    const updated = await prisma.order.update({
      where: { id: orderId },
      data: { assignedAgentId: agentId, status: OrderStatus.SOURCING },
    });
    await prisma.orderEvent.create({
      data: {
        orderId, eventType: 'AGENT_ASSIGNED', toStatus: OrderStatus.SOURCING,
        actorType: 'OPS_ADMIN' as any, actorId: adminId, notes: `Assigned to agent ${agentId}`,
      },
    });
    return updated;
  }

  async addInternalNote(orderId: string, adminId: string, note: string) {
    return prisma.orderEvent.create({
      data: {
        orderId, eventType: 'INTERNAL_NOTE', toStatus: 'NOTE',
        actorType: 'OPS_ADMIN' as any, actorId: adminId, notes: note, isInternal: true,
      },
    });
  }

  async addCustomerMessage(orderId: string, adminId: string, message: string) {
    return prisma.orderEvent.create({
      data: {
        orderId, eventType: 'CUSTOMER_MESSAGE', toStatus: 'NOTE',
        actorType: 'OPS_ADMIN' as any, actorId: adminId, notes: message, isInternal: false,
      },
    });
  }
}
