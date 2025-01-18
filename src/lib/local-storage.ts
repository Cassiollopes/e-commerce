import { CartItemType } from "@/types";
import { getSizeStock } from "./data";

export const fetchExistingProducts = (product: CartItemType, storedProducts: CartItemType[]) => {

  const existingProduct = storedProducts.find(
    (p: CartItemType) =>
      p.variantId === product.variantId &&
      p.sizeId === product.sizeId
  );

  return existingProduct
}

export const handleSetItem = async (product: CartItemType) => {
  const stock = await getSizeStock(product.sizeId);
  if (product.quantity <= 0 || product.quantity > stock) return { error: "Quantidade inválida." };

  const products = localStorage.getItem("cartProducts");

  if (products) {
    const storedProducts = JSON.parse(products);
    const existingProduct = fetchExistingProducts(product, storedProducts);

    if (existingProduct) {
      if (existingProduct.quantity === stock) return { alert: "Quantidade máxima atingida" };

      if ((existingProduct.quantity + product.quantity) > stock) return { alert: "Quantidade máxima atingida" }
      existingProduct.quantity += product.quantity;
    } else {
      storedProducts.push(product);
    }

    localStorage.setItem("cartProducts", JSON.stringify(storedProducts));
    window.dispatchEvent(new Event("storage"));
    return;
  }

  localStorage.setItem("cartProducts", JSON.stringify([product]));
  window.dispatchEvent(new Event("storage"));
}

export const handleRemoveItem = (product: CartItemType) => {
  const storedProducts = JSON.parse(localStorage.getItem("cartProducts") || "[]");

  const updatedProducts = storedProducts.filter(
    (p: CartItemType) =>
      p.variantId !== product.variantId ||
      p.sizeId !== product.sizeId
  );

  localStorage.setItem("cartProducts", JSON.stringify(updatedProducts));
  window.dispatchEvent(new Event("storage"));
}

export const handle1Item = async (product: CartItemType, operation: "add" | "remove") => {
  const storedProducts = JSON.parse(localStorage.getItem("cartProducts") || "[]");
  const existingProduct = fetchExistingProducts(product, storedProducts);

  if (existingProduct) {
    if (existingProduct.quantity === 1 && operation === "remove") {
      handleRemoveItem(product);
      window.dispatchEvent(new Event("storage"));
      return;
    }

    if (operation === "add") {
      const stock = await getSizeStock(existingProduct.sizeId);
      if ((existingProduct.quantity + 1) > stock) return { error: "Quantidade máxima atingida" };
    }

    existingProduct.quantity += operation === "add" ? 1 : -1;
  } else {
    storedProducts.push(product);
  }

  localStorage.setItem("cartProducts", JSON.stringify(storedProducts));
  window.dispatchEvent(new Event("storage"));
}