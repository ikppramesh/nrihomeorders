import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private readonly config: ConfigService) {}

  @OnEvent('order.created')
  async notifyAdminNewOrder({ order }: any) {
    this.logger.log(`[ADMIN ALERT] New order ${order.orderNumber} — ${order.serviceType}`);
    // TODO: integrate SendGrid or push notification for admin alerts
  }

  @OnEvent('order.inspection_failed')
  async notifyAdminInspectionFailed({ order }: any) {
    this.logger.warn(`[ADMIN ALERT] Inspection FAILED for order ${order.orderNumber}`);
  }

  @OnEvent('payment.failed')
  async notifyAdminPaymentFailed({ metadata }: any) {
    this.logger.error(`[ADMIN ALERT] Payment FAILED for order ${metadata?.orderId}`);
  }
}
