import { Controller, Get, Post, Body, Query, Param, Res, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { WhatsappService } from './whatsapp.service';
import { HmacVerificationGuard } from '../common/guards/hmac-verification.guard';
import { AdminJwtGuard } from '../common/guards/admin-jwt.guard';

@ApiTags('whatsapp')
@Controller()
export class WhatsappController {
  constructor(private readonly wa: WhatsappService, private readonly config: ConfigService) {}

  @Get('webhooks/whatsapp')
  verify(@Query('hub.mode') mode: string, @Query('hub.verify_token') token: string, @Query('hub.challenge') challenge: string, @Res() res: Response) {
    if (mode === 'subscribe' && token === this.config.get('WHATSAPP_VERIFY_TOKEN'))
      res.status(200).send(challenge);
    else
      res.status(403).json({ error: 'Forbidden' });
  }

  @Post('webhooks/whatsapp')
  @HttpCode(HttpStatus.OK)
  @UseGuards(HmacVerificationGuard)
  async incoming(@Body() body: any) { await this.wa.processWebhook(body); }

  @Get('admin/whatsapp/conversations')
  @UseGuards(AdminJwtGuard)
  list(@Query('page') p = '1', @Query('limit') l = '20', @Query('state') state?: string) {
    return this.wa.getConversations(+p, +l, state);
  }

  @Get('admin/whatsapp/conversations/:id/messages')
  @UseGuards(AdminJwtGuard)
  messages(@Param('id') id: string) { return this.wa.getMessages(id); }

  @Post('admin/whatsapp/conversations/:id/reply')
  @UseGuards(AdminJwtGuard)
  reply(@Param('id') id: string, @Body() body: { text: string }) { return this.wa.adminReply(id, body.text); }
}
