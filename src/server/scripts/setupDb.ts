
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database setup...');
  
  // This is just a test to check connection
  const productCount = await prisma.product.count();
  console.log(`Current product count: ${productCount}`);
  
  console.log('Database connection successful!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Database setup error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
