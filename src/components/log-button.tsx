'use client'

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogIn, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function LogButton({...props}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter()
  const { data: session } = useSession()

  return (
    <Button variant="outline" onClick={() => session ? signOut() : router.push("/login")} className={`${session ? "hover:text-red-500" : "bg-foreground text-background uppercase font-bold flex-1 h-11"} ${props.className}`}>
      {session ? <LogOut className="h-5 w-5" /> : <LogIn className="h-5 w-5" />}
      {session ? "Logout" : "Login"}
    </Button>
  );
}