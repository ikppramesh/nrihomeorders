import { PrismaClient, AdminRole, AgentAvailability } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const passwordHash = await bcrypt.hash('Admin@123', 12);

  await prisma.adminUser.upsert({
    where: { email: 'admin@nriconcierge.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@nriconcierge.com',
      passwordHash,
      role: AdminRole.SUPER_ADMIN,
    },
  });

  await prisma.adminUser.upsert({
    where: { email: 'ops@nriconcierge.com' },
    update: {},
    create: {
      name: 'Ops Manager',
      email: 'ops@nriconcierge.com',
      passwordHash,
      role: AdminRole.OPS_MANAGER,
    },
  });

  const agentsData = [
    {
      name: 'Ravi Kumar',
      phone: '+919876543210',
      email: 'ravi@nriconcierge.com',
      zones: ['Madhapur', 'Hitech City', 'Kondapur', 'Gachibowli'],
      specializations: ['bills', 'govt_fee', 'shopping', 'packing'],
      availability: AgentAvailability.ACTIVE,
    },
    {
      name: 'Preethi Sharma',
      phone: '+919876543211',
      email: 'preethi@nriconcierge.com',
      zones: ['Banjara Hills', 'Jubilee Hills', 'Panjagutta', 'Somajiguda'],
      specializations: ['insurance', 'bills', 'shopping'],
      availability: AgentAvailability.ACTIVE,
    },
    {
      name: 'Suresh Reddy',
      phone: '+919876543212',
      email: 'suresh@nriconcierge.com',
      zones: ['Secunderabad', 'Bowenpally', 'Malkajgiri', 'Alwal'],
      specializations: ['bills', 'govt_fee'],
      availability: AgentAvailability.ACTIVE,
    },
    {
      name: 'Lakshmi Devi',
      phone: '+919876543213',
      email: 'lakshmi@nriconcierge.com',
      zones: ['Ameerpet', 'SR Nagar', 'Balkampet', 'Erragadda'],
      specializations: ['insurance', 'bills', 'shopping', 'packing'],
      availability: AgentAvailability.ACTIVE,
    },
  ];

  for (const agent of agentsData) {
    const existing = await prisma.agent.findFirst({ where: { phone: agent.phone } });
    if (!existing) {
      await prisma.agent.create({ data: agent });
    }
  }

  console.log('Seeding complete.');
  console.log('Admin login: admin@nriconcierge.com / Admin@123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
