import { Controller, Get, Patch, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AdminJwtGuard } from '../common/guards/admin-jwt.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AgentsService } from './agents.service';

@ApiTags('agents')
@ApiBearerAuth()
@UseGuards(AdminJwtGuard)
@Controller('agents')
export class AgentsController {
  constructor(private readonly svc: AgentsService) {}

  @Get('tasks')
  getTasks(@CurrentUser() u: any) {
    return this.svc.getAssignedTasks(u.id);
  }

  @Patch('availability')
  setAvailability(@CurrentUser() u: any, @Body() body: { availability: any }) {
    return this.svc.updateAvailability(u.id, body.availability);
  }

  @Post('orders/:orderId/inspection')
  inspection(@CurrentUser() u: any, @Param('orderId') id: string, @Body() body: any) {
    return this.svc.submitInspection(u.id, id, body);
  }

  @Post('orders/:orderId/shipment')
  shipment(@CurrentUser() u: any, @Param('orderId') id: string, @Body() body: any) {
    return this.svc.updateShipment(u.id, id, body);
  }

  @Post('orders/:orderId/checkin')
  checkIn(@CurrentUser() u: any, @Param('orderId') id: string, @Body() body: { location: string }) {
    return this.svc.checkIn(u.id, id, body.location);
  }
}
