import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { prisma } from '@nri/database';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_SECRET', 'secret'),
    });
  }
  async validate(payload: { sub: string; isAdmin: boolean }) {
    if (!payload.isAdmin) throw new UnauthorizedException();
    const admin = await prisma.adminUser.findUnique({ where: { id: payload.sub } });
    if (!admin?.isActive) throw new UnauthorizedException();
    return admin;
  }
}
