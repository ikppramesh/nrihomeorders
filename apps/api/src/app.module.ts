import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { QuotesModule } from './quotes/quotes.module';
import { AgentsModule } from './agents/agents.module';
import { PaymentsModule } from './payments/payments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AdminModule } from './admin/admin.module';
import { RenewalsModule } from './renewals/renewals.module';
import { StorageModule } from './storage/storage.module';
import { WebhooksModule } from './webhooks/webhooks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['../../.env', '.env'] }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    AuthModule,
    CustomersModule,
    OrdersModule,
    QuotesModule,
    AgentsModule,
    PaymentsModule,
    NotificationsModule,
    AdminModule,
    RenewalsModule,
    StorageModule,
    WebhooksModule,
  ],
})
export class AppModule {}
