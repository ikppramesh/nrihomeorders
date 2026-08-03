import { Controller, Get, Patch, Post, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AdminJwtGuard } from '../../common/guards/admin-jwt.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { AdminOrdersService } from './admin-orders.service';

@ApiTags('admin/orders')
@ApiBearerAuth()
@UseGuards(AdminJwtGuard)
@Controller('admin/orders')
export class AdminOrdersController {
  constructor(private readonly svc: AdminOrdersService) {}

  @Get()                   findAll(@Query() q: any)                                      { return this.svc.findAll(q); }
  @Get(':id')              findOne(@Param('id') id: string)                              { return this.svc.findOne(id); }
  @Patch(':id/status')     updateStatus(@Param('id') id: string, @Body() b: any, @CurrentUser() u: any) { return this.svc.updateStatus(id, b.status, u.id, b.notes); }
  @Patch(':id/assign')     assign(@Param('id') id: string, @Body() b: any, @CurrentUser() u: any)      { return this.svc.assignAgent(id, b.agentId, u.id); }
  @Post(':id/notes')       note(@Param('id') id: string, @Body() b: any, @CurrentUser() u: any)        { return this.svc.addInternalNote(id, u.id, b.note); }
  @Post(':id/message')     message(@Param('id') id: string, @Body() b: any, @CurrentUser() u: any)     { return this.svc.addCustomerMessage(id, u.id, b.message); }
}
