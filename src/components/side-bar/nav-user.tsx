"use client";

import { ChevronsUpDown, LogIn, LogOut, Moon, Sun } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { data: session } = useSession();
  const { setTheme } = useTheme();
  const { replace } = useRouter();
  const pathname = usePathname();

  const user = session?.user;

  return (
    <SidebarMenu className="max-md:pb-4">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              onClick={() => !session && replace(`/login?next=${pathname}`)}
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {user?.name ? user.name : "Entrar"}
                </span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          {user && (
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() =>
                    document.documentElement.classList.contains("dark")
                      ? setTheme("light")
                      : setTheme("dark")
                  }
                >
                  {document.documentElement.classList.contains("dark") ? (
                    <Sun />
                  ) : (
                    <Moon />
                  )}
                  Tema
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => (session?.user ? signOut() : signIn())}
              >
                {session?.user ? <LogOut /> : <LogIn />}
                {session?.user ? "Logout" : "Login"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
