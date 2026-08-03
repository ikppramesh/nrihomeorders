import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AdminJwtGuard } from '../../common/guards/admin-jwt.guard';
import { AdminAnalyticsService } from './admin-analytics.service';

@ApiTags('admin/analytics')
@ApiBearerAuth()
@UseGuards(AdminJwtGuard)
@Controller('admin/analytics')
export class AdminAnalyticsController {
  constructor(private readonly svc: AdminAnalyticsService) {}

  @Get('dashboard') dashboard() { return this.svc.getDashboardStats(); }
  @Get('by-status') byStatus()  { return this.svc.getOrdersByStatus(); }
  @Get('by-type')   byType()    { return this.svc.getOrdersByServiceType(); }
  @Get('recent')    recent()    { return this.svc.getRecentOrders(); }
}
