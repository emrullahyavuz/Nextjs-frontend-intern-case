import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.blog.updateMany({
    data: {
      content: `
        Traveling is an enriching experience that opens up new horizons...
        [buraya blog içeriğinizi ekleyin]
      `
    }
  });
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 