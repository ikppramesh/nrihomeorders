import { Controller, Post, Headers, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PaymentsService } from '../payments/payments.service';

@ApiTags('webhooks')
@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly payments: PaymentsService) {}

  @Post('stripe')
  @HttpCode(HttpStatus.OK)
  async stripe(@Req() req: Request, @Headers('stripe-signature') sig: string) {
    const raw = (req as any).rawBody as Buffer ?? Buffer.from(JSON.stringify(req.body));
    await this.payments.handleWebhook(raw, sig);
  }
}
