import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { prisma } from '@nri/database';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StorageService {
  private readonly s3: S3Client;
  private readonly bucket: string;
  private readonly logger = new Logger(StorageService.name);

  constructor(private readonly config: ConfigService) {
    this.bucket = config.get<string>('AWS_S3_BUCKET', '');
    this.s3 = new S3Client({
      region: config.get<string>('AWS_REGION', 'ap-south-1'),
      credentials: {
        accessKeyId: config.get<string>('AWS_ACCESS_KEY_ID', ''),
        secretAccessKey: config.get<string>('AWS_SECRET_ACCESS_KEY', ''),
      },
    });
  }

  async getPresignedUploadUrl(orderId: string, uploaderId: string, filename: string, contentType: string) {
    const key = `orders/${orderId}/${uuidv4()}-${filename}`;
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
      Metadata: { orderId, uploaderId },
    });
    const url = await getSignedUrl(this.s3, command, { expiresIn: 900 }); // 15 min

    const s3Url = `https://${this.bucket}.s3.${this.config.get('AWS_REGION', 'ap-south-1')}.amazonaws.com/${key}`;
    const doc = await prisma.document.create({
      data: {
        orderId,
        fileUrl: s3Url,
        fileName: filename,
        fileType: contentType,
        uploadedBy: uploaderId,
        uploaderType: 'FIELD_AGENT' as any,
        docCategory: 'ORDER',
      },
    });

    return { uploadUrl: url, documentId: doc.id, s3Key: key };
  }

  async getPresignedDownloadUrl(s3Key: string) {
    const command = new GetObjectCommand({ Bucket: this.bucket, Key: s3Key });
    return getSignedUrl(this.s3, command, { expiresIn: 3600 }); // 1 hour
  }

  async getOrderDocuments(orderId: string, isSharedWithCustomer?: boolean) {
    const where: any = { orderId };
    if (isSharedWithCustomer !== undefined) where.isSharedWithCustomer = isSharedWithCustomer;
    return prisma.document.findMany({ where, orderBy: { uploadedAt: 'desc' } });
  }

  async shareDocumentWithCustomer(documentId: string) {
    return prisma.document.update({ where: { id: documentId }, data: { isSharedWithCustomer: true } });
  }

  async deleteDocument(documentId: string) {
    const doc = await prisma.document.findUnique({ where: { id: documentId } });
    if (!doc) return;
    // Extract S3 key from the stored URL
    const s3Key = doc.fileUrl.split('.amazonaws.com/').pop() ?? '';
    await this.s3.send(new DeleteObjectCommand({ Bucket: this.bucket, Key: s3Key }));
    await prisma.document.delete({ where: { id: documentId } });
  }
}
