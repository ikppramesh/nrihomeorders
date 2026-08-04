import {
  Injectable, UnauthorizedException, ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { prisma } from '@nri/database';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(dto: { name: string; email: string; password: string; phoneUsa?: string; phoneIndia?: string }) {
    const existing = await prisma.customer.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email already registered');
    const passwordHash = await bcrypt.hash(dto.password, 12);
    const customer = await prisma.customer.create({
      data: {
        name: dto.name, email: dto.email,
        phoneUsa: dto.phoneUsa, phoneIndia: dto.phoneIndia,
        passwordHash,
      },
    });
    const tokens = await this.issueTokens(customer.id, customer.email, false);
    await this.saveRefresh(customer.id, tokens.refreshToken);
    const { passwordHash: _, ...safe } = customer as any;
    return { customer: safe, ...tokens };
  }

  async login(dto: { email: string; password: string }) {
    const customer = await prisma.customer.findUnique({ where: { email: dto.email } });
    if (!customer?.passwordHash) throw new UnauthorizedException('Invalid credentials');
    if (!await bcrypt.compare(dto.password, customer.passwordHash)) throw new UnauthorizedException('Invalid credentials');
    if (!customer.isActive) throw new UnauthorizedException('Account suspended');
    const tokens = await this.issueTokens(customer.id, customer.email, false);
    await this.saveRefresh(customer.id, tokens.refreshToken);
    const { passwordHash: _, ...safe } = customer as any;
    return { customer: safe, ...tokens };
  }

  async adminLogin(dto: { email: string; password: string }) {
    const admin = await prisma.adminUser.findUnique({ where: { email: dto.email } });
    if (!admin || !await bcrypt.compare(dto.password, admin.passwordHash)) throw new UnauthorizedException('Invalid credentials');
    if (!admin.isActive) throw new UnauthorizedException('Account suspended');
    const tokens = await this.issueTokens(admin.id, admin.email, true);
    return { admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role }, ...tokens };
  }

  async refresh(refreshToken: string) {
    const stored = await prisma.refreshToken.findUnique({ where: { token: refreshToken } });
    if (!stored || stored.expiresAt < new Date()) throw new UnauthorizedException('Invalid or expired refresh token');
    const customer = await prisma.customer.findUnique({ where: { id: stored.customerId } });
    if (!customer) throw new UnauthorizedException();
    await prisma.refreshToken.delete({ where: { token: refreshToken } });
    const tokens = await this.issueTokens(customer.id, customer.email, false);
    await this.saveRefresh(customer.id, tokens.refreshToken);
    return tokens;
  }

  async logout(refreshToken: string) {
    await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
  }

  private async issueTokens(sub: string, email: string, isAdmin: boolean) {
    const accessToken = this.jwt.sign({ sub, email, isAdmin });
    return { accessToken, refreshToken: uuidv4() };
  }

  private async saveRefresh(customerId: string, token: string) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);
    await prisma.refreshToken.create({ data: { token, customerId, expiresAt } });
  }
}
