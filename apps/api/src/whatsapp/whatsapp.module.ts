import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bullmq';
import { WhatsappController } from './whatsapp.controller';
import { WhatsappService } from './whatsapp.service';
import { WhatsappTemplateService } from './whatsapp-template.service';
import { WhatsappQueueProcessor } from './whatsapp-queue.processor';
import { OrderEventListener } from './order-event.listener';

@Module({
  imports: [
    HttpModule.register({ timeout: 10000 }),
    BullModule.registerQueue({
      name: 'whatsapp-outbound',
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 2000 },
        removeOnComplete: { count: 500 },
      },
    }),
  ],
  controllers: [WhatsappController],
  providers: [WhatsappService, WhatsappTemplateService, WhatsappQueueProcessor, OrderEventListener],
  exports: [WhatsappService, WhatsappTemplateService],
})
export class WhatsappModule {}
