import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminJwtGuard } from '../common/guards/admin-jwt.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { QuotesService } from './quotes.service';

@ApiTags('quotes')
@Controller('quotes')
export class QuotesController {
  constructor(private readonly svc: QuotesService) {}

  // Admin creates quote for an order
  @Post('orders/:orderId')
  @ApiBearerAuth()
  @UseGuards(AdminJwtGuard)
  create(@Param('orderId') orderId: string, @Body() body: any) {
    return this.svc.createQuote(orderId, body);
  }

  // Customer approves quote
  @Patch(':id/approve')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  approve(@CurrentUser() u: any, @Param('id') id: string) {
    return this.svc.approveQuote(u.id, id);
  }

  // Customer rejects quote
  @Patch(':id/reject')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  reject(@CurrentUser() u: any, @Param('id') id: string, @Body() body: { reason?: string }) {
    return this.svc.rejectQuote(u.id, id, body.reason);
  }

  // Customer gets all quotes for an order
  @Get('orders/:orderId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  list(@CurrentUser() u: any, @Param('orderId') orderId: string) {
    return this.svc.getQuotesForOrder(u.id, orderId);
  }
}
