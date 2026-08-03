import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { RenewalsService } from './renewals.service';

@ApiTags('renewals')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('renewals')
export class RenewalsController {
  constructor(private readonly svc: RenewalsService) {}

  @Get()   list(@CurrentUser() u: any) { return this.svc.listRenewals(u.id); }
  @Post()  add(@CurrentUser() u: any, @Body() b: any) { return this.svc.addRenewalItem(u.id, b); }
  @Patch(':id') update(@CurrentUser() u: any, @Param('id') id: string, @Body() b: any) { return this.svc.updateRenewalItem(u.id, id, b); }
  @Delete(':id') remove(@CurrentUser() u: any, @Param('id') id: string) { return this.svc.deleteRenewalItem(u.id, id); }
}
