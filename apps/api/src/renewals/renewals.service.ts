import { Injectable } from '@nestjs/common';
import { prisma } from '@nri/database';

@Injectable()
export class RenewalsService {
  async addRenewalItem(customerId: string, dto: {
    label: string;
    renewalType: string;
    dueDate: Date;
    estimatedAmount?: number;
    notes?: string;
  }) {
    return prisma.renewalItem.create({
      data: {
        customerId,
        label: dto.label,
        type: dto.renewalType,
        nextDueDate: dto.dueDate,
        approxAmountInr: dto.estimatedAmount,
      },
    });
  }

  async listRenewals(customerId: string) {
    return prisma.renewalItem.findMany({
      where: { customerId, isActive: true },
      orderBy: { nextDueDate: 'asc' },
    });
  }

  async updateRenewalItem(customerId: string, id: string, dto: any) {
    return prisma.renewalItem.updateMany({ where: { id, customerId }, data: dto });
  }

  async deleteRenewalItem(customerId: string, id: string) {
    return prisma.renewalItem.updateMany({ where: { id, customerId }, data: { isActive: false } });
  }
}
