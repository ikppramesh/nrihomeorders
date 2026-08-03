import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AdminJwtGuard } from '../../common/guards/admin-jwt.guard';
import { AdminAgentsService } from './admin-agents.service';

@ApiTags('admin/agents')
@ApiBearerAuth()
@UseGuards(AdminJwtGuard)
@Controller('admin/agents')
export class AdminAgentsController {
  constructor(private readonly svc: AdminAgentsService) {}

  @Get()         list()                                           { return this.svc.findAll(); }
  @Post()        create(@Body() b: any)                           { return this.svc.create(b); }
  @Patch(':id')  update(@Param('id') id: string, @Body() b: any) { return this.svc.update(id, b); }
}
