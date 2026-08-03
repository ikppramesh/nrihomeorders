import { Controller, Get, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AdminJwtGuard } from '../../common/guards/admin-jwt.guard';
import { AdminCustomersService } from './admin-customers.service';

@ApiTags('admin/customers')
@ApiBearerAuth()
@UseGuards(AdminJwtGuard)
@Controller('admin/customers')
export class AdminCustomersController {
  constructor(private readonly svc: AdminCustomersService) {}

  @Get()              findAll(@Query('page') p = '1', @Query('limit') l = '20', @Query('search') s?: string) { return this.svc.findAll(+p, +l, s); }
  @Get(':id')         findOne(@Param('id') id: string)                                                      { return this.svc.findOne(id); }
  @Patch(':id/kyc')   kyc(@Param('id') id: string, @Body() b: { status: any; notes?: string })             { return this.svc.updateKycStatus(id, b.status, b.notes); }
  @Patch(':id/toggle') toggle(@Param('id') id: string, @Body() b: { isActive: boolean })                   { return this.svc.toggleActive(id, b.isActive); }
}
