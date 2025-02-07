import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import Checkout from "@/components/checkout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
};

export default async function CheckoutPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?next=/checkout");
  }

  return (
    <div className="flex items-start justify-start md:justify-center md:items-center md:min-h-screen">
      <Checkout />
    </div>
  );
}
