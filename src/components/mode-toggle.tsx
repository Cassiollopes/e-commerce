"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export default function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <Button variant="outline" size="icon" onClick={() => document.documentElement.classList.contains("dark") ? setTheme("light") : setTheme("dark")} className="group h-11 w-11">
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:group-hover:rotate-90 dark:group-hover:scale-100 group-hover:rotate-90 group-hover:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:group-hover:rotate-0 dark:group-hover:scale-0 group-hover:rotate-0 group-hover:scale-100" />
    </Button>
  )
}