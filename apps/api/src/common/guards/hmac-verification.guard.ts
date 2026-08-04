import {
  CanActivate, ExecutionContext, Injectable,
  Logger, UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { Request } from 'express';

@Injectable()
export class HmacVerificationGuard implements CanActivate {
  private readonly logger = new Logger(HmacVerificationGuard.name);
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const signature = req.headers['x-hub-signature-256'] as string;
    const secret = this.config.get<string>('WEBHOOK_APP_SECRET', '');

    if (!signature) throw new UnauthorizedException('Missing x-hub-signature-256');

    const raw: Buffer = (req as any).rawBody ?? Buffer.from(JSON.stringify(req.body));
    const expected = `sha256=${crypto.createHmac('sha256', secret).update(raw).digest('hex')}`;

    if (
      signature.length !== expected.length ||
      !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
    ) {
      this.logger.warn('HMAC mismatch on webhook');
      throw new UnauthorizedException('Invalid signature');
    }
    return true;
  }
}
