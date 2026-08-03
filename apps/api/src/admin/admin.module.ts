import { Module } from '@nestjs/common';
import { AdminOrdersController } from './orders/admin-orders.controller';
import { AdminOrdersService } from './orders/admin-orders.service';
import { AdminCustomersController } from './customers/admin-customers.controller';
import { AdminCustomersService } from './customers/admin-customers.service';
import { AdminAgentsController } from './agents/admin-agents.controller';
import { AdminAgentsService } from './agents/admin-agents.service';
import { AdminAnalyticsController } from './analytics/admin-analytics.controller';
import { AdminAnalyticsService } from './analytics/admin-analytics.service';

@Module({
  controllers: [
    AdminOrdersController,
    AdminCustomersController,
    AdminAgentsController,
    AdminAnalyticsController,
  ],
  providers: [
    AdminOrdersService,
    AdminCustomersService,
    AdminAgentsService,
    AdminAnalyticsService,
  ],
})
export class AdminModule {}
