import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma, AgentAvailability, InspectionResult, OrderStatus } from '@nri/database';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AgentsService {
  constructor(private readonly events: EventEmitter2) {}

  async getAssignedTasks(agentId: string) {
    return prisma.order.findMany({
      where: {
        assignedAgentId: agentId,
        status: { notIn: [OrderStatus.COMPLETED, OrderStatus.CANCELLED, OrderStatus.ARCHIVED] },
      },
      include: { requestData: true, quotes: { where: { status: 'APPROVED' }, take: 1 } },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async updateAvailability(agentId: string, availability: AgentAvailability) {
    return prisma.agent.update({ where: { id: agentId }, data: { availability } });
  }

  async submitInspection(agentId: string, orderId: string, dto: {
    result: InspectionResult;
    notes: string;
    photoUrls: string[];
    videoUrl?: string;
    vendorName?: string;
    vendorContact?: string;
  }) {
    const order = await prisma.order.findFirst({ where: { id: orderId, assignedAgentId: agentId } });
    if (!order) throw new NotFoundException('Order not assigned to you');

    const inspection = await prisma.orderInspection.upsert({
      where: { orderId },
      create: { orderId, inspectorId: agentId, productType: 'GENERAL', checklist: {}, ...dto } as any,
      update: { ...dto, inspectedAt: new Date() } as any,
    });

    const newStatus = dto.result === InspectionResult.PASS
      ? OrderStatus.QC_APPROVED
      : OrderStatus.QC_ADMIN_REVIEW;

    const updated = await prisma.order.update({ where: { id: orderId }, data: { status: newStatus } });

    if (dto.result === InspectionResult.PASS) {
      this.events.emit('order.inspection_passed', { order: updated, inspection });
    } else {
      this.events.emit('order.inspection_failed', { order: updated, inspection });
    }

    return inspection;
  }

  async updateShipment(agentId: string, orderId: string, dto: {
    courier: string;
    trackingNumber: string;
    estimatedDelivery?: Date;
    actualWeight?: number;
    dimensions?: string;
  }) {
    const order = await prisma.order.findFirst({ where: { id: orderId, assignedAgentId: agentId } });
    if (!order) throw new NotFoundException('Order not assigned to you');

    const shipment = await prisma.orderShipment.upsert({
      where: { orderId },
      create: { orderId, ...dto },
      update: dto,
    });

    const updated = await prisma.order.update({ where: { id: orderId }, data: { status: OrderStatus.DISPATCHED } });
    this.events.emit('order.shipped', { order: updated, shipment });
    return shipment;
  }

  async checkIn(agentId: string, orderId: string, location: string) {
    return prisma.orderEvent.create({
      data: {
        orderId,
        eventType: 'AGENT_CHECKIN',
        toStatus: 'AGENT_CHECKIN',
        actorType: 'FIELD_AGENT' as any,
        actorId: agentId,
        notes: `Agent checked in at: ${location}`,
        isInternal: true,
      },
    });
  }
}
