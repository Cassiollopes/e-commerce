'use server'

import { CategoryType, CreateShoppingType, LastSalesType, ProductCardType, ProductDescType, ProductFiltered, SaleType } from "@/types";
import { prisma } from "./db";

export const getProductsCard = async (): Promise<ProductCardType[]> => {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      image: true,
    },
  });
  return products;
};

export const getProductVariantImages = async (id: string) => {
  const product = await prisma.product.findUnique(
    {
      where: { id },
      select: {
        Variant: {
          select: {
            image: true,
          },
        },
      },
    }
  );
  return product?.Variant;
}

export const getProductDesc = async (id: string): Promise<ProductDescType> => {
  const product = await prisma.product.findUnique(
    {
      where: { id },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        Variant: {
          select: {
            id: true,
            color: true,
            image: true,
            Size: {
              select: {
                id: true,
                name: true,
                stock: true,
                order: true
              }
            }
          },
        }
      },
    }
  );

  if (!product) throw new Error("Produto não encontrado.");
  return product
}

export const getCategories = async (): Promise<CategoryType[]> => {
  const category = await prisma.category.findMany(
    {
      select: {
        name: true,
      },
    }
  );
  return category
}

export const getProductsFiltered = async (query?: string, category?: string, price?: string): Promise<ProductFiltered[]> => {
  const product = await prisma.product.findMany(
    {
      where: {
        AND: [
          {
            OR: [
              { name: { contains: query || "", mode: "insensitive" } },
              { description: { contains: query || "", mode: "insensitive" } },
            ]
          },
          {
            categories: category && category !== "tudo"
              ? { some: { categoryName: { contains: category, mode: "insensitive" } } }
              : undefined, // Só aplica o filtro de categorias se um valor for passado
          }
        ]
      },
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
        description: true
      },
      orderBy: {
        price: price === "asc" ? "asc" : "desc",
      },
    }
  );

  return product;
}

export const createShopping = async (data: CreateShoppingType) => {

  try {
    await prisma.$transaction(async (tx) => {
      async function transaction(product: { sizeId: string, quantity: number }) {
        const result = await tx.size.update({
          where: { id: product.sizeId },
          data: { stock: { decrement: product.quantity } },
        });

        if (result.stock < 0) throw new Error("Estoque insuficiente.");
      }

      for (const product of data.products) {
        try {
          await transaction(product);
        } catch (error) {
          throw new Error((error as Error).message);
        }
      }

      try {
        await tx.sale.create({
          data: {
            delivery_method: data.delivery_method,
            payment_method: data.payment_method,
            userId: data.userId,
            total: data.total,
            products: {
              create: data.products
            }
          }
        })
      } catch {
        throw new Error("Erro ao realizar compra.");
      }
    })

    return { success: "Compra realizada com sucesso!" }
  } catch (error) {
    return { error: (error as Error).message }
  }
}

export const getSizeStock = async (id: string) => {
  const size = await prisma.size.findUnique(
    {
      where: { id },
      select: {
        stock: true,
      },
    }
  );
  return size?.stock || 0;
}

export const getSales = async () => {
  const sales = await prisma.sale.findMany(
    {
      select: {
        id: true,
        userId: true,
        total: true,
        createdAt: true,
        user: {
          select: {
            name: true,
            image: true,
          },
        }
      },
    }
  );
  return sales;
}

export const getSalesCards = async () => {
  const sales = await prisma.sale.findMany({
    select: {
      id: true,
      userId: true,
      total: true,
    },
  });
  return sales;
}

export const getSalesDate = async () => {
  const sales = await prisma.sale.findMany({
    select: {
      total: true,
      createdAt: true,
    },
  });
  return sales;
}

export const getLastSales = async () : Promise<LastSalesType[]> => {
  const sales = await prisma.sale.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    select: {
      id: true,
      userId: true,
      total: true,
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  return sales;
}

export const getSalesPaginated = async (page: number, query?: string) : Promise<SaleType[]> => {
  const sales = await prisma.sale.findMany({
    where: {
      OR: [
        { user: { name: { contains: query || "", mode: "insensitive" } } },
        { userId: { contains: query || "", mode: "insensitive" } }
      ]
    },
    skip: (page - 1) * 5,
    take: 5,
    select: {
      id: true,
      userId: true,
      total: true,
      payment_method: true,
      delivery_method: true,
      createdAt: true,
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    }
  });
  return sales;
}

export const getNumberOfPages = async (query?: string) => {
  const salesCount = await prisma.sale.count({
    where: {
      OR: [
        { user: { name: { contains: query || "", mode: "insensitive" } } },
        { userId: { contains: query || "", mode: "insensitive" } }
      ]
    }
  });
  return Math.ceil(salesCount / 5);
}

export const getRelatedProducts = async (id: string) => {
  const products = await prisma.product.findMany({
    where: {
      id: {
        not: id,
      },
    },
    select: {
      id: true,
      name: true,
      price: true,
      image: true,
    },
  });
  return products;
}
