"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import ModeToggle from "../mode-toggle";
import { SquareUser } from "lucide-react";
import LogButton from "../log-button";
import { useSession } from "next-auth/react";

export default function UserMenu() {
  const { data: session } = useSession();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={`${session ? "" : "bg-foreground/10"}`}
          >
            <SquareUser className="mr-1 h-5 w-5" />
            {session ? (
              <span> Ola, {session?.user?.name?.split(" ")[0]}</span>
            ) : (
              <span className="uppercase font-semibold">Entrar</span>
            )}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="flex gap-2 p-2">
            <ModeToggle />
            <LogButton />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
