import { LoginForm } from "@/components/login-form";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default async function Login(props: {
  searchParams?: Promise<{
    next?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const session = await auth();

  if (session?.user) {
    return redirect("/");
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <LoginForm next={searchParams?.next} />
    </div>
  );
}
