"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Sunrise, Zap } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  const getThemeIcon = () => {
    if (!mounted) {
      return <Sun className="h-[1.2rem] w-[1.2rem]" />;
    }

    switch (theme) {
      case "light":
        return <Sun className="h-[1.2rem] w-[1.2rem]" />;
      case "dark":
        return <Moon className="h-[1.2rem] w-[1.2rem]" />;
      case "neon":
        return <Zap className="h-[1.2rem] w-[1.2rem]" />;
      // case 'ocean': return <Waves className="h-[1.2rem] w-[1.2rem]" />
      // case 'forest': return <Leaf className="h-[1.2rem] w-[1.2rem]" />
      default:
        return <Sun className="h-[1.2rem] w-[1.2rem]" />;
    }
  };

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
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <span>Light</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <div className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            <span>Dark</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("neon")}>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span>Neon</span>
          </div>
        </DropdownMenuItem>
        {/* <DropdownMenuItem onClick={() => setTheme("ocean")}>
          <div className="flex items-center gap-2">
            <Waves className="h-4 w-4" /> 
            <span>Ocean</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("forest")}>
          <div className="flex items-center gap-2">
            <Leaf className="h-4 w-4" /> 
            <span>Forest</span>
          </div>
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <div className="flex items-center gap-2">
            <Sunrise className="h-4 w-4" />
            <span>System</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
