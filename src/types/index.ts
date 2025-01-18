export type ProductCardType = {
  id: string,
  name: string,
  price: number,
  image: string
}

export type ProductDescType = {
  id: string,
  name: string,
  price: number,
  description: string,
  Variant: {
    id: string,
    color: string,
    image: string,
    Size: {
      id: string,
      name: string,
      stock: number,
      order: number | null
    }[]
  }[]
}

export type CartItemType = {
  productId: string,
  productName: string,
  variantId: string,
  variantColor: string,
  variantImage: string,
  sizeId: string,
  sizeName: string,
  quantity: number,
  price: number
}

export type ProductFiltered = ProductCardType & {
  description: string
}

export type CategoryType = {
  name: string
}

export type CreateShoppingType = {
  payment_method: string,
  delivery_method: string,
  userId: string,
  total: number,
  products: { sizeId: string, quantity: number }[]
}

export type LastSalesType = {
  user: {
    name: string | null;
    image: string | null;
  };
  id: string;
  total: number;
  userId: string;
}

export type SaleType = LastSalesType & {
  payment_method: string;
  delivery_method: string;
  createdAt: Date;
}