import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { prisma } from '@nri/database';
import { WhatsappTemplateService } from '../whatsapp/whatsapp-template.service';

@Injectable()
export class RenewalsService {
  private readonly logger = new Logger(RenewalsService.name);

  constructor(private readonly tpl: WhatsappTemplateService) {}

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

  // Run daily at 9 AM IST (3:30 AM UTC)
  @Cron('30 3 * * *')
  async sendRenewalReminders() {
    this.logger.log('Running renewal reminder cron...');
    const now = new Date();
    const dayOffsets = [30, 7, 1];

    for (const days of dayOffsets) {
      const targetDate = new Date(now);
      targetDate.setDate(targetDate.getDate() + days);
      const start = new Date(targetDate); start.setHours(0, 0, 0, 0);
      const end = new Date(targetDate); end.setHours(23, 59, 59, 999);

      const items = await prisma.renewalItem.findMany({
        where: { nextDueDate: { gte: start, lte: end }, isActive: true },
        include: { customer: { select: { whatsappPhone: true, name: true } } },
      });

      for (const item of items) {
        if (!item.customer?.whatsappPhone) continue;
        try {
          await this.tpl.renewalReminder(
            item.customer.whatsappPhone,
            item.label,
            item.approxAmountInr?.toString() ?? '0',
            item.nextDueDate?.toLocaleDateString('en-IN') ?? '',
            days,
          );
          this.logger.log(`Reminder sent: ${item.label} → ${item.customer.whatsappPhone}`);
        } catch (err) {
          this.logger.error(`Reminder failed for ${item.id}: ${(err as any).message}`);
        }
      }
    }
  }
}
