"use client";

import {
  Barcode,
  ChartNoAxesCombined,
  CircleCheckBig,
  CreditCard,
  DollarSign,
  Store,
  Truck,
  XCircle,
  Zap,
} from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "../ui/card";
import { createShopping } from "@/lib/data";
import { CartItemType } from "@/types";

const paymentMethods = [
  {
    method: "pix",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="100"
        height="100"
        viewBox="0 0 30 30"
        className="dark:invert"
      >
        <path d="M 15 1.0996094 C 13.975 1.0996094 12.949922 1.4895313 12.169922 2.2695312 L 7.1894531 7.25 L 7.3398438 7.25 C 8.6098437 7.25 9.7992188 7.740625 10.699219 8.640625 L 14.189453 12.130859 C 14.639453 12.570859 15.360547 12.570859 15.810547 12.130859 L 19.300781 8.640625 C 20.200781 7.740625 21.390156 7.25 22.660156 7.25 L 22.810547 7.25 L 17.830078 2.2695312 C 17.050078 1.4895313 16.025 1.0996094 15 1.0996094 z M 5.6894531 8.75 L 2.2695312 12.169922 C 0.70953125 13.729922 0.70953125 16.270078 2.2695312 17.830078 L 5.6894531 21.25 L 7.3398438 21.25 C 8.2098438 21.25 9.030625 20.910781 9.640625 20.300781 L 13.130859 16.810547 C 14.160859 15.780547 15.839141 15.780547 16.869141 16.810547 L 20.359375 20.300781 C 20.969375 20.910781 21.790156 21.25 22.660156 21.25 L 24.310547 21.25 L 27.730469 17.830078 C 29.290469 16.270078 29.290469 13.729922 27.730469 12.169922 L 24.310547 8.75 L 22.660156 8.75 C 21.790156 8.75 20.969375 9.0892188 20.359375 9.6992188 L 16.869141 13.189453 C 16.359141 13.699453 15.68 13.960938 15 13.960938 C 14.32 13.960938 13.640859 13.699453 13.130859 13.189453 L 9.640625 9.6992188 C 9.030625 9.0892187 8.2098437 8.75 7.3398438 8.75 L 5.6894531 8.75 z M 15 17.539062 C 14.7075 17.539062 14.414453 17.649141 14.189453 17.869141 L 10.699219 21.359375 C 9.7992188 22.259375 8.6098437 22.75 7.3398438 22.75 L 7.1894531 22.75 L 12.169922 27.730469 C 13.729922 29.290469 16.270078 29.290469 17.830078 27.730469 L 22.810547 22.75 L 22.660156 22.75 C 21.390156 22.75 20.200781 22.259375 19.300781 21.359375 L 15.810547 17.869141 C 15.585547 17.649141 15.2925 17.539062 15 17.539062 z"></path>
      </svg>
    ),
  },
  {
    method: "Cartão de crédito",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    method: "Cartão de débito",
    icon: <CreditCard className="h-5 w-5 opacity-50" />,
  },
  {
    method: "boleto",
    icon: <Barcode className="h-5 w-5" />,
  },
];

const deliveryMethods = [
  {
    method: "Padrão",
    icon: <Truck className="h-6 w-6" />,
    price: 7.0,
  },
  {
    method: "Rápida",
    icon: <Zap className="h-6 w-6" />,
    price: 15.0,
  },
  {
    method: "Retirar na loja",
    icon: <Store className="h-6 w-6" />,
    price: 0,
  },
];

export default function PaymentForm({
  products,
  setDeliveryMethod,
  deliveryMethod,
}: {
  products: CartItemType[];
  setDeliveryMethod: React.Dispatch<
    React.SetStateAction<{ method: string; price: number }>
  >;
  deliveryMethod: { method: string; price: number };
}) {
  const { data: session } = useSession();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [alert, setAlert] = useState("");
  const [message, setMessage] = useState<{ error?: string; success?: string }>({
    error: undefined,
    success: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const sellProducts = async () => {
    setAlert("");
    if (products.length === 0) return setAlert("Nenhum produto selecionado.");
    if (deliveryMethod.method === "")
      return setAlert("Selecione uma forma de entrega.");
    console.log(deliveryMethod);
    if (paymentMethod === "")
      return setAlert("Selecione uma forma de pagamento.");

    setLoading(true);

    const productsSealed: { sizeId: string; quantity: number }[] = [];

    products.map((product: CartItemType) =>
      productsSealed.push({
        sizeId: product.sizeId,
        quantity: product.quantity,
      }),
    );

    const total = products.reduce(
      (total: number, product) => total + product.price * product.quantity,
      0,
    );

    const response = await createShopping({
      delivery_method: deliveryMethod.method,
      payment_method: paymentMethod,
      user_id: session?.user?.email as string,
      total: total,
      products: productsSealed,
    });

    if (response) {
      setMessage({ error: response.error, success: response.success });
      localStorage.removeItem("cartProducts");
      window.dispatchEvent(new Event("storage"));
      setDeliveryMethod({ method: "", price: 0 });
      setLoading(false);
      setShow(true);
      return;
    }

    setAlert("");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {alert && <span className="text-red-500 ">{alert}</span>}
        <h2 className="text-2xl font-bold border-b pb-4">Entrega</h2>
        <ul className="flex gap-4 flex-wrap">
          {deliveryMethods.map((method) => (
            <li
              key={method.method}
              onClick={() =>
                setDeliveryMethod({
                  method: method.method,
                  price: method.price,
                })
              }
            >
              <Button
                variant="outline"
                className={`flex items-center gap-2 ${deliveryMethod.method === method.method ? "border-blue-500" : ""}`}
              >
                {method.icon}
                {method.method}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold border-b pb-4">Forma de pagamento</h2>
        <ul className="flex gap-4 flex-wrap">
          {paymentMethods.map((method) => (
            <li
              key={method.method}
              onClick={() => setPaymentMethod(method.method)}
            >
              <Button
                variant="outline"
                className={`flex items-center gap-2 ${paymentMethod === method.method ? "border-blue-500" : ""}`}
              >
                {method.icon}
                {method.method}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <Button
        onClick={() => sellProducts()}
        className="sticky drop-shadow-2xl bottom-10 w-full mt-2 h-14 rounded-full text-lg md:text-base lg:text-lg"
      >
        <DollarSign className="absolute left-5 md:left-3 lg:left-5" />
        {loading ? "Realizando compra..." : "Realizar compra"}
      </Button>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 1, ease: "anticipate", delay: 0.3 }}
            className="flex justify-center items-center w-screen top-0 left-0 h-screen fixed"
          >
            <div
              className="w-full h-full"
              onClick={() => {
                setShow(false);
                router.push("/");
              }}
            ></div>
            <Card className="absolute aspect-square w-full max-w-[300px] flex flex-col items-center justify-center gap-2 drop-shadow-2xl">
              {message.error !== undefined ? (
                <XCircle className="h-16 w-16 stroke-1 stroke-red-500" />
              ) : (
                <CircleCheckBig className="h-16 w-16 stroke-1 stroke-green-500" />
              )}
              <h2 className="font-bold">
                {message.error !== undefined ? message.error : message.success}
              </h2>
              <h3 className="text-sm text-muted-foreground">
                Veja nosso painel de vendas
              </h3>
              <Button onClick={() => router.push("/dashboard")}>
                <ChartNoAxesCombined />
                Ir para o painel
              </Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
