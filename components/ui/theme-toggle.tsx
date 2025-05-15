"use client"

import { useTheme } from "next-themes"
import { Moon, Sun, Sunrise, Waves, Zap, Leaf } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // When mounted on client, now we can show the UI
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const getThemeIcon = () => {
    if (!mounted) {
      return <Sun className="h-[1.2rem] w-[1.2rem]" />
    }
    
    switch(theme) {
      case 'light': return <Sun className="h-[1.2rem] w-[1.2rem]" />
      case 'dark': return <Moon className="h-[1.2rem] w-[1.2rem]" />
      case 'neon': return <Zap className="h-[1.2rem] w-[1.2rem]" />
      case 'ocean': return <Waves className="h-[1.2rem] w-[1.2rem]" />
      case 'forest': return <Leaf className="h-[1.2rem] w-[1.2rem]" />
      default: return <Sun className="h-[1.2rem] w-[1.2rem]" />
    }
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          {getThemeIcon()}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" /> Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" /> Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("neon")}>
          <Zap className="mr-2 h-4 w-4" /> Neon
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("ocean")}>
          <Waves className="mr-2 h-4 w-4" /> Ocean
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("forest")}>
          <Leaf className="mr-2 h-4 w-4" /> Forest
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Sunrise className="mr-2 h-4 w-4" /> System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}