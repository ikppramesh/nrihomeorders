import { Controller, Get, Post, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { OrdersService } from './orders.service';

@ApiTags('orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly svc: OrdersService) {}

  @Post() create(@CurrentUser() u: any, @Body() b: any) { return this.svc.create(u.id, b); }
  @Get() findAll(@CurrentUser() u: any, @Query('page') p = '1', @Query('limit') l = '20') { return this.svc.findAll(u.id, +p, +l); }
  @Get(':id') findOne(@CurrentUser() u: any, @Param('id') id: string) { return this.svc.findOne(u.id, id); }
  @Patch(':id/cancel') cancel(@CurrentUser() u: any, @Param('id') id: string) { return this.svc.cancel(u.id, id); }
  @Post(':id/message') reply(@CurrentUser() u: any, @Param('id') id: string, @Body() b: { message: string }) { return this.svc.addCustomerReply(u.id, id, b.message); }
  @Post(':id/rate') rate(@CurrentUser() u: any, @Param('id') id: string, @Body() b: { rating: number; review?: string }) { return this.svc.rateOrder(u.id, id, b.rating, b.review); }
}
