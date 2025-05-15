"use client";

import { useState } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

interface ConfettiButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  confettiColors?: string[];
}

export function ConfettiButton({
  children,
  confettiColors = ["#FFC700", "#FF0099", "#00BFFF", "#7CFF00", "#FF7C00"],
  className,
  onClick,
  ...props
}: ConfettiButtonProps) {
  const [isExploding, setIsExploding] = useState(false);

  const createConfetti = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsExploding(true);

    const targetButton = event.currentTarget as HTMLElement;
    const rect = targetButton.getBoundingClientRect();

    const originX = (rect.left + rect.width / 2) / window.innerWidth;
    const originY = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 250,
      spread: 90,
      origin: { x: originX, y: originY },
      colors: confettiColors,
      startVelocity: 60,
      gravity: 1,
      drift: Math.random() * 0.4 - 0.2,
      scalar: 1.2,
      zIndex: 9999,
    });

    setTimeout(() => {
      setIsExploding(false);
    }, 500);
  };

  return (
    <Button
      variant="outline"
      onClick={(e) => {
        createConfetti(e);
        if (onClick) onClick(e);
      }}
      className={cn(
        "relative overflow-hidden transition-all",
        isExploding && "animate-wiggle",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
