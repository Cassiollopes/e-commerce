"use client"

import * as React from "react"
import {
  Frame,
  Home,
  LayoutDashboard,
  MonitorSmartphone,
  Shirt,
} from "lucide-react"

import { NavMain } from "@/components/side-bar/nav-main"
import { NavLinks } from "@/components/side-bar/nav-links"
import { NavUser } from "@/components/side-bar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Logo, LogoText } from "../logo"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "All",
          url: "/dashboard",
        },
        {
          title: "Todas as vendas",
          url: "/dashboard/all-sales",
        },
      ],
    },
    {
      title: "Home",
      url: "/",
      icon: Home,
      items: [
        {
          title: "Pagina Inicial",
          url: "/",
        },
        {
          title: "Search",
          url: "/search",
        },
      ],
    },
  ],
  Links: [
    {
      name: "All",
      url: "/search",
      icon: Frame,
    },
    {
      name: "camisetas",
      url: "/search?category=camisetas",
      icon: Shirt,
    },
    {
      name: "Eletronicos",
      url: "/search?category=eletronicos",
      icon: MonitorSmartphone,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Logo className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <LogoText className="truncate font-semibold" />
            <span className="truncate text-xs">Enterprise</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavLinks links={data.Links} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
