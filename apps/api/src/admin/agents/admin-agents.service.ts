import { Injectable } from '@nestjs/common';
import { prisma } from '@nri/database';

@Injectable()
export class AdminAgentsService {
  async findAll() {
    return prisma.agent.findMany({
      include: {
        _count: { select: { orders: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(dto: { name: string; phone: string; email: string; city: string }) {
    return prisma.agent.create({ data: dto });
  }

  async update(id: string, dto: any) {
    return prisma.agent.update({ where: { id }, data: dto });
  }
}
