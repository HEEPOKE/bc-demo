import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.users.createMany({
    data: [
      {
        email: 'admin@example.com',
        password: 'hashed_password',
        balance: 1000000.0,
      },
      {
        email: 'admin2@example.com',
        password: 'hashed_password',
        balance: 1000000.0,
      },
    ],
  });

  await prisma.currencies.createMany({
    data: [
      { symbol: 'BTC', name: 'Bitcoin', price: 60000 },
      { symbol: 'ETH', name: 'Ethereum', price: 3500 },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
