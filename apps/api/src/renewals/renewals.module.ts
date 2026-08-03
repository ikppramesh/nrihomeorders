import { Module } from '@nestjs/common';
import { RenewalsService } from './renewals.service';
import { RenewalsController } from './renewals.controller';
import { WhatsappModule } from '../whatsapp/whatsapp.module';

@Module({
  imports: [WhatsappModule],
  controllers: [RenewalsController],
  providers: [RenewalsService],
  exports: [RenewalsService],
})
export class RenewalsModule {}
