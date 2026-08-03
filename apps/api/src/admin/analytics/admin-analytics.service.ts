import { Injectable } from '@nestjs/common';
import { prisma } from '@nri/database';

@Injectable()
export class AdminAnalyticsService {
  async getDashboardStats() {
    const [
      totalOrders, totalCustomers, pendingOrders,
      completedThisMonth, totalRevenue,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.customer.count(),
      prisma.order.count({ where: { status: { in: ['NEW_REQUEST', 'UNDER_REVIEW', 'QUOTE_SENT', 'PAYMENT_CONFIRMED', 'AGENT_ASSIGNED', 'SOURCING', 'INSPECTION_PASSED'] as any } } }),
      prisma.order.count({
        where: {
          status: 'COMPLETED' as any,
          completedAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) },
        },
      }),
      prisma.orderPayment.aggregate({ _sum: { amountUsd: true }, where: { status: 'CAPTURED' as any } }),
    ]);

    return {
      totalOrders, totalCustomers, pendingOrders,
      completedThisMonth,
      totalRevenueUsd: totalRevenue._sum.amountUsd ?? 0,
    };
  }

  async getOrdersByStatus() {
    return prisma.order.groupBy({ by: ['status'], _count: { id: true } });
  }

  async getOrdersByServiceType() {
    return prisma.order.groupBy({ by: ['serviceType'], _count: { id: true } });
  }

  async getRecentOrders(limit = 10) {
    return prisma.order.findMany({
      orderBy: { createdAt: 'desc' }, take: limit,
      include: { customer: { select: { name: true, email: true } } },
    });
  }
}
