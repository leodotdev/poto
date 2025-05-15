"use client"

import { useState } from "react"
import { Button, ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ConfettiButtonProps extends ButtonProps {
  confettiColors?: string[]
}

export function ConfettiButton({
  children,
  confettiColors = ["#FFC700", "#FF0099", "#00BFFF", "#7CFF00", "#FF7C00"],
  className,
  ...props
}: ConfettiButtonProps) {
  const [isExploding, setIsExploding] = useState(false)

  const createConfetti = () => {
    setIsExploding(true)
    
    // Create confetti elements
    const container = document.createElement("div")
    container.style.position = "fixed"
    container.style.left = "0"
    container.style.top = "0"
    container.style.width = "100%"
    container.style.height = "100%"
    container.style.pointerEvents = "none"
    container.style.zIndex = "9999"
    document.body.appendChild(container)
    
    // Create 100 confetti pieces
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div")
      const color = confettiColors[Math.floor(Math.random() * confettiColors.length)]
      
      confetti.style.position = "absolute"
      confetti.style.width = `${Math.random() * 10 + 5}px`
      confetti.style.height = `${Math.random() * 5 + 5}px`
      confetti.style.backgroundColor = color
      confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0"
      confetti.style.transformOrigin = "center"
      
      // Random starting position near the button that was clicked
      const buttonRect = (document.activeElement as HTMLElement).getBoundingClientRect()
      confetti.style.left = `${buttonRect.left + buttonRect.width/2}px`
      confetti.style.top = `${buttonRect.top + buttonRect.height/2}px`
      
      // Add animation
      confetti.animate(
        [
          { 
            transform: `translate(0, 0) rotate(0deg)`,
            opacity: 1 
          },
          { 
            transform: `translate(${(Math.random() - 0.5) * 500}px, ${Math.random() * 500}px) rotate(${Math.random() * 360}deg)`,
            opacity: 0 
          }
        ], 
        {
          duration: Math.random() * 2000 + 1000,
          easing: 'cubic-bezier(0.23, 1, 0.32, 1)'
        }
      )
      
      container.appendChild(confetti)
    }
    
    // Remove the container after animation
    setTimeout(() => {
      document.body.removeChild(container)
      setIsExploding(false)
    }, 3000)
  }

  return (
    <Button
      variant="outline"
      onClick={(e) => {
        createConfetti()
        if (props.onClick) props.onClick(e)
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
  )
}