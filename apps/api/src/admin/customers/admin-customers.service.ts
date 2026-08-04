import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma, KycStatus } from '@nri/database';

@Injectable()
export class AdminCustomersService {
  async findAll(page = 1, limit = 20, search?: string) {
    const where: any = search
      ? { OR: [{ name: { contains: search, mode: 'insensitive' } }, { email: { contains: search, mode: 'insensitive' } }] }
      : {};
    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * limit, take: limit,
        select: { id: true, name: true, email: true, phoneUsa: true, kycStatus: true, subscriptionPlan: true, createdAt: true, isActive: true, _count: { select: { orders: true } } },
      }),
      prisma.customer.count({ where }),
    ]);
    return { customers, total, page, limit };
  }

  async findOne(id: string) {
    const c = await prisma.customer.findUnique({
      where: { id },
      include: { subscription: true, familyMembers: true, orders: { take: 10, orderBy: { createdAt: 'desc' } } },
    });
    if (!c) throw new NotFoundException();
    const { passwordHash, ...safe } = c as any;
    return safe;
  }

  async updateKycStatus(id: string, status: KycStatus, notes?: string) {
    return prisma.customer.update({ where: { id }, data: { kycStatus: status } });
  }

  async toggleActive(id: string, isActive: boolean) {
    return prisma.customer.update({ where: { id }, data: { isActive } });
  }
}
