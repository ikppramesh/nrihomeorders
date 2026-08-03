import { Controller, Get, Post, Patch, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CustomersService } from './customers.service';

@ApiTags('profile')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('profile')
export class CustomersController {
  constructor(private readonly svc: CustomersService) {}

  @Get()            getProfile(@CurrentUser() u: any)                          { return this.svc.getProfile(u.id); }
  @Patch()          updateProfile(@CurrentUser() u: any, @Body() b: any)       { return this.svc.updateProfile(u.id, b); }
  @Get('family-members')   getFamilyMembers(@CurrentUser() u: any)             { return this.svc.getFamilyMembers(u.id); }
  @Post('family-members')  addFamilyMember(@CurrentUser() u: any, @Body() b: any) { return this.svc.addFamilyMember(u.id, b); }
  @Get('india-addresses')  getIndiaAddresses(@CurrentUser() u: any)            { return this.svc.getIndiaAddresses(u.id); }
  @Post('india-addresses') addIndiaAddress(@CurrentUser() u: any, @Body() b: any) { return this.svc.addIndiaAddress(u.id, b); }
  @Get('shipping-addresses')  getUsaAddresses(@CurrentUser() u: any)           { return this.svc.getUsaAddresses(u.id); }
  @Post('shipping-addresses') addUsaAddress(@CurrentUser() u: any, @Body() b: any) { return this.svc.addUsaAddress(u.id, b); }
}
