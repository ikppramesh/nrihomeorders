import { Controller, Get, Post, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminJwtGuard } from '../common/guards/admin-jwt.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { StorageService } from './storage.service';

@ApiTags('storage')
@Controller('storage')
export class StorageController {
  constructor(private readonly svc: StorageService) {}

  // Customer: get presigned upload URL
  @Post('orders/:orderId/upload-url')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getUploadUrl(
    @CurrentUser() u: any,
    @Param('orderId') orderId: string,
    @Body() body: { filename: string; contentType: string },
  ) {
    return this.svc.getPresignedUploadUrl(orderId, u.id, body.filename, body.contentType);
  }

  // Customer: get documents shared with them
  @Get('orders/:orderId/documents')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getCustomerDocs(@Param('orderId') orderId: string) {
    return this.svc.getOrderDocuments(orderId, true);
  }

  // Admin: get presigned download URL
  @Get('download/:s3Key(*)')
  @ApiBearerAuth()
  @UseGuards(AdminJwtGuard)
  async getDownloadUrl(@Param('s3Key') key: string) {
    return { url: await this.svc.getPresignedDownloadUrl(key) };
  }

  // Admin: share document with customer
  @Post('documents/:id/share')
  @ApiBearerAuth()
  @UseGuards(AdminJwtGuard)
  share(@Param('id') id: string) {
    return this.svc.shareDocumentWithCustomer(id);
  }

  // Admin: delete document
  @Delete('documents/:id')
  @ApiBearerAuth()
  @UseGuards(AdminJwtGuard)
  delete(@Param('id') id: string) {
    return this.svc.deleteDocument(id);
  }
}
