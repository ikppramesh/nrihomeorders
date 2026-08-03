import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@nri/database';

@Injectable()
export class CustomersService {
  async getProfile(id: string) {
    const c = await prisma.customer.findUnique({
      where: { id },
      include: { subscription: true, familyMembers: true, indiaAddresses: true, usaShippingAddresses: true, renewalItems: { where: { isActive: true } } },
    });
    if (!c) throw new NotFoundException();
    const { passwordHash, ...safe } = c as any;
    return safe;
  }

  async updateProfile(id: string, data: any) {
    const { passwordHash, stripeCustomerId, kycStatus, subscriptionPlan, ...safe } = data;
    return prisma.customer.update({ where: { id }, data: safe });
  }

  async addFamilyMember(customerId: string, data: any) { return prisma.familyMember.create({ data: { ...data, customerId } }); }
  async getFamilyMembers(customerId: string) { return prisma.familyMember.findMany({ where: { customerId } }); }
  async addIndiaAddress(customerId: string, data: any) { return prisma.indiaAddress.create({ data: { ...data, customerId } }); }
  async getIndiaAddresses(customerId: string) { return prisma.indiaAddress.findMany({ where: { customerId } }); }
  async addUsaAddress(customerId: string, data: any) {
    if (data.isDefault) await prisma.usaShippingAddress.updateMany({ where: { customerId }, data: { isDefault: false } });
    return prisma.usaShippingAddress.create({ data: { ...data, customerId } });
  }
  async getUsaAddresses(customerId: string) { return prisma.usaShippingAddress.findMany({ where: { customerId } }); }
}
