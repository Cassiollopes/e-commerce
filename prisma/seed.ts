import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const categories = await prisma.category.createMany({
    data: [
      { name: 'camisetas' },
      { name: 'eletronicos' },
      { name: 'acessorios' },
      { name: 'outros' },
    ],
  })

  const product1 = await prisma.product.create({
    data: {
      name: 'Celular',
      price: 1999.99,
      description: 'Um celular top de Linha',
      image: 'https://i.ibb.co/RB71Lmm/mediamodifier-image-5.png',
      ProductCategories: {
        create: {
          categoryName: 'eletronicos',
        },
      },
      Variant: {
        create: {
          color: 'Preto',
          image: 'https://i.ibb.co/RB71Lmm/mediamodifier-image-5.png',
          Size: {
            createMany: {
              data: [
                { name: '128gb', stock: 10 },
                { name: '256gb', stock: 5 },
                { name: '512gb', stock: 3 },
              ],
            },
          },
        },
      }
    }
  })

  const product2 = await prisma.product.create({
    data: {
      name: 'Camiseta Lisa',
      price: 49.99,
      description: 'Camiseta basicamente lisa',
      image: 'https://i.ibb.co/7VQQMNN/mediamodifier-image-1.png',
      ProductCategories: { create: { categoryName: 'camisetas' } },
      Variant: {
        create: [
          {
            color: 'Preto',
            image: 'https://i.ibb.co/KWK22hV/mediamodifier-image-2.png',
            Size: {
              createMany: {
                data: [
                  { name: 'P', stock: 3, order: 1 },
                  { name: 'M', stock: 10, order: 2 },
                  { name: 'G', stock: 7, order: 3 },
                  { name: 'GG', stock: 5, order: 4 },
                ],
              },
            },
          },
          {
            color: 'Branco',
            image: 'https://i.ibb.co/7VQQMNN/mediamodifier-image-1.png',
            Size: {
              createMany: {
                data: [
                  { name: 'P', stock: 3, order: 1 },
                  { name: 'M', stock: 4, order: 2 },
                  { name: 'G', stock: 0, order: 3 },
                  { name: 'GG', stock: 2, order: 4 },
                ],
              },
            },
          }
        ]
      }
    }
  })

  const product3 = await prisma.product.create({
    data: {
      name: 'Xicara',
      price: 29.99,
      description: 'Xicrinha linda de bonita',
      image: 'https://i.ibb.co/PtcTDxz/mediamodifier-image-4.png',
      ProductCategories: { create: { categoryName: 'outros' } },
      Variant: {
        create: {
          color: 'Branco',
          image: 'https://i.ibb.co/PtcTDxz/mediamodifier-image-4.png',
          Size: {
            createMany: {
              data: [
                { name: 'Unico', stock: 8 },
              ],
            },
          },
        },
      }
    }
  })

  const product4 = await prisma.product.create({
    data: {
      name: 'Smart Watch',
      price: 149.99,
      description: 'reloginho top',
      image: 'https://i.ibb.co/PCyXgj2/rb-27882.png',
      ProductCategories: {
        createMany: {
          data: [
            { categoryName: 'eletronicos' },
            { categoryName: 'acessorios' },
          ],
        },
      },
      Variant: {
        create: {
          color: 'Preto',
          image: 'e',
          Size: {
            create: { name: 'Unico', stock: 10 }
          },
        },
      }
    }
  })

  console.log({ categories, product1, product2, product3,  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })