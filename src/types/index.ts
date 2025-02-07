export type ProductCardType = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export type ProductDescType = {
  id: string;
  name: string;
  price: number;
  description: string;
  variants: {
    id: string;
    color: string;
    image: string;
    sizes: {
      id: string;
      name: string;
      stock: number;
      order: number | null;
    }[];
  }[];
};

export type CartItemType = {
  productId: string;
  productName: string;
  variantId: string;
  variantColor: string;
  variantImage: string;
  sizeId: string;
  sizeName: string;
  quantity: number;
  price: number;
};

export type ProductFiltered = ProductCardType & {
  description: string;
};

export type CategoryType = {
  name: string;
};

export type CreateShoppingType = {
  payment_method: string;
  delivery_method: string;
  user_id: string;
  total: number;
  products: { sizeId: string; quantity: number }[];
};
