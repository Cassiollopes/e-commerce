"use server";

import {
  CategoryType,
  CreateShoppingType,
  ProductCardType,
  ProductDescType,
  ProductFiltered,
} from "@/types";
import { prisma } from "./db";

export const getProductsCard = async (): Promise<ProductCardType[]> => {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
      },
    });
    return products;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar produtos.");
  }
};

export const getProductVariantImages = async (id: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        variants: {
          select: {
            image: true,
          },
        },
      },
    });
    return product?.variants;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar produtos.");
  }
};

export const getProductDesc = async (
  id: string,
): Promise<ProductDescType | null> => {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        variants: {
          select: {
            id: true,
            color: true,
            image: true,
            sizes: {
              select: {
                id: true,
                name: true,
                stock: true,
                order: true,
              },
            },
          },
        },
      },
    });

    return product;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar produtos.");
  }
};

export const getCategories = async (): Promise<CategoryType[]> => {
  try {
    const category = await prisma.category.findMany({
      select: {
        name: true,
      },
    });
    return category;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar categorias.");
  }
};

export const getProductsFiltered = async (
  query?: string,
  category?: string,
  price?: string,
): Promise<ProductFiltered[]> => {
  try {
    const product = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query || "", mode: "insensitive" } },
          {
            categories: {
              some: {
                category_name: { contains: query || "", mode: "insensitive" },
              },
            },
          },
          { description: { contains: query || "", mode: "insensitive" } },
        ],
        categories: {
          some: {
            category_name: {
              equals: category === "tudo" ? undefined : category || undefined,
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
        description: true,
      },
      orderBy: {
        price: price === "asc" ? "asc" : "desc",
      },
    });

    return product;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar produtos.");
  }
};

export const createShopping = async (data: CreateShoppingType) => {
  try {
    await prisma.$transaction(async (tx) => {
      async function transaction(product: {
        sizeId: string;
        quantity: number;
      }) {
        const result = await tx.size.update({
          where: { id: product.sizeId },
          data: { stock: { decrement: product.quantity } },
        });

        if (result.stock < 0) throw new Error("Estoque indisponível.");
      }

      for (const product of data.products) {
        await transaction(product);
      }

      try {
        await tx.sale.create({
          data: {
            delivery_method: data.delivery_method,
            payment_method: data.payment_method,
            user_id: data.user_id,
            total: data.total,
            sale_products: {
              createMany: {
                data: data.products.map((product) => ({
                  size_id: product.sizeId,
                  quantity: product.quantity,
                })),
              },
            },
          },
        });
      } catch (error) {
        console.log(error);
        throw new Error("Erro ao realizar compra.");
      }
    });

    return { success: "Compra realizada com sucesso!" };
  } catch (error) {
    return { error: (error as Error).message };
  }
};

export const getSizeStock = async (id: string) => {
  const size = await prisma.size.findUnique({
    where: { id },
    select: {
      stock: true,
    },
  });
  return size?.stock || 0;
};

export const getSales = async () => {
  try {
    const sales = await prisma.sale.findMany({
      select: {
        id: true,
        user_id: true,
        total: true,
        createdAt: true,
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    return sales;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar vendas.");
  }
};

export const getSalesCards = async () => {
  try {
    const sales = await prisma.sale.findMany({
      select: {
        id: true,
        user_id: true,
        total: true,
      },
    });
    return sales;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar vendas.");
  }
};

export const getSalesDate = async () => {
  try {
    const sales = await prisma.sale.findMany({
      select: {
        total: true,
        createdAt: true,
      },
    });
    return sales;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar vendas.");
  }
};

export const getLastSales = async () => {
  try {
    const sales = await prisma.sale.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        user_id: true,
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
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar vendas.");
  }
};

export const getSalesPaginated = async (page: number, query?: string) => {
  try {
    const sales = await prisma.sale.findMany({
      where: {
        OR: [
          { user: { name: { contains: query || "", mode: "insensitive" } } },
          { user_id: { contains: query || "", mode: "insensitive" } },
        ],
      },
      skip: (page - 1) * 5,
      take: 5,
      select: {
        id: true,
        user_id: true,
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
      },
    });
    return sales;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar vendas.");
  }
};

export const getNumberOfPages = async (query?: string) => {
  try {
    const salesCount = await prisma.sale.count({
      where: {
        OR: [
          { user: { name: { contains: query || "", mode: "insensitive" } } },
          { user_id: { contains: query || "", mode: "insensitive" } },
        ],
      },
    });
    return Math.ceil(salesCount / 5);
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar vendas.");
  }
};

export const getRelatedProducts = async (id: string) => {
  try {
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
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar produtos.");
  }
};
