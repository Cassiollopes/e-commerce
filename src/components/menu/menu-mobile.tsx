'use client'

import { Button } from "@/components/ui/button"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, UserRound } from "lucide-react"
import { useSession } from "next-auth/react";
import Image from "next/image";
import Links from "../nav/links";
import ModeToggle from "../mode-toggle";
import LogButton from "../log-button";

export default function MenuMobile() {
  const { data: session } = useSession()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size={"icon"} className="h-11 w-11">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="flex flex-col items-start w-[60vw]">
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <div className="flex items-center justify-between w-full border-b pb-4">
          <h2 className="text-2xl font-bold">
            <span className="text-muted-foreground">Olá, </span><br />{session?.user?.name?.split(" ")[0] || "usuário"}
          </h2>
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || ""} 
              width={60}
              height={60}
              className="rounded-full"
            />
          ) : (
            <div className="bg-background h-[60px] w-[60px] flex items-center justify-center rounded-full border">
              <UserRound className="h-8 w-8" />
            </div>
          )
          }
        </div>
        <div className="border-b pb-4 w-full">
          <Links />
        </div>
        <div className="flex items-center justify-between gap-2 w-full">
          <ModeToggle />
          <LogButton />
        </div>
        <SheetFooter>
          <SheetClose asChild>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}