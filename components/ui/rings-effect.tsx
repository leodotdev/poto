"use client"

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface RingsEffectProps {
  className?: string
  colorPreset?: 'monochrome' | 'teal' | 'sunset' | 'ocean' | 'colorfulAudio' | 'neon' | 'retrowave'
}

export function RingsEffect({ 
  className,
  colorPreset = 'retrowave'
}: RingsEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  
  // Current and target mouse positions for smooth easing
  const currentMousePosition = useRef({ x: 0, y: 0 })
  const targetMousePosition = useRef({ x: 0, y: 0 })

  // Color presets for the rings
  const colorPresets = {
    monochrome: {
      background: [0.05, 0.05, 0.05],
      ring1: [0.9, 0.9, 0.9],
      ring2: [0.6, 0.6, 0.6],
      ring3: [0.75, 0.75, 0.75]
    },
    teal: {
      background: [34/255, 30/255, 38/255],
      ring1: [10/255, 205/255, 203/255],
      ring2: [46/255, 72/255, 82/255],
      ring3: [54/255, 147/255, 147/255]
    },
    sunset: {
      background: [15/255, 15/255, 30/255],
      ring1: [255/255, 180/255, 80/255],
      ring2: [240/255, 90/255, 40/255],
      ring3: [180/255, 50/255, 120/255]
    },
    ocean: {
      background: [10/255, 20/255, 30/255],
      ring1: [60/255, 220/255, 250/255],
      ring2: [30/255, 90/255, 180/255],
      ring3: [20/255, 150/255, 200/255]
    },
    colorfulAudio: {
      background: [0.1, 0.05, 0.2],
      ring1: [1.0, 0.5, 0.0], // Orange inner
      ring2: [1.0, 0.0, 0.0], // Red
      ring3: [0.0, 0.0, 1.0]  // Blue
    },
    neon: {
      background: [5/255, 5/255, 15/255],
      ring1: [255/255, 50/255, 220/255],
      ring2: [40/255, 240/255, 100/255],
      ring3: [0/255, 180/255, 255/255]
    },
    retrowave: {
      background: [20/255, 10/255, 40/255],
      ring1: [255/255, 60/255, 220/255],
      ring2: [120/255, 40/255, 180/255],
      ring3: [10/255, 230/255, 230/255]
    }
  }

  // Effect parameters
  const params = {
    mouseStrength: 0.8,       // Bend strength
    mouseRadius: 0.5,         // Radius of effect
    grainIntensity: 0.05,     // Film grain intensity
    grainMean: 0.0,           // Grain mean value
    grainVariance: 0.5,       // Grain variance
    easingSpeed: 0.06,        // How quickly the easing happens
    ringCount: 6,             // Number of rings
    ringWidth: 0.0072,        // Width of rings
    ringSpacing: 0.03,        // Space between rings
    glowStrength: 0.5,        // Strength of bloom effect
    glowSize: 0.03,           // Size of the outer glow
    glowIntensity: 2.0,       // Intensity of the glow
    glowThreshold: 0.0,       // Threshold for glow effect
    colorIntensity: 1.2,      // Color intensity
    additiveBlending: true,   // Whether to use additive blending
    animationSpeed: 0.2,      // Speed of the animation
    proximityRadius: 0.4      // Radius for proximity glow effect
  }

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return

    const container = containerRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    // Set initial dimensions
    const updateDimensions = () => {
      if (!container || !canvas) return
      const { width, height } = container.getBoundingClientRect()
      setDimensions({ width, height })
      canvas.width = width
      canvas.height = height
      
      // Initialize mouse position in the center
      targetMousePosition.current = { x: width / 2, y: height / 2 }
      currentMousePosition.current = { ...targetMousePosition.current }
    }

    // Initialize
    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      targetMousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    const handleMouseLeave = () => {
      // When mouse leaves, move target back to center
      targetMousePosition.current = {
        x: dimensions.width / 2,
        y: dimensions.height / 2
      }
    }

    // Add event listeners
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('resize', updateDimensions)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  // Animation effect
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return
    
    let time = 0
    const PI = Math.PI
    const TAU = PI * 2
    
    // Animation function
    const animate = () => {
      if (!ctx || !canvas) return
      
      // Update time
      time += 0.01 * params.animationSpeed
      
      // Apply easing to mouse movement
      currentMousePosition.current.x += (targetMousePosition.current.x - currentMousePosition.current.x) * params.easingSpeed
      currentMousePosition.current.y += (targetMousePosition.current.y - currentMousePosition.current.y) * params.easingSpeed
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Get the current colors based on preset
      const colors = colorPresets[colorPreset]
      
      // Set background
      ctx.fillStyle = `rgb(${colors.background[0] * 255}, ${colors.background[1] * 255}, ${colors.background[2] * 255})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Render rings
      renderRings(ctx, canvas, time, colors)
      
      // Apply noise effect
      applyNoise(ctx, canvas)
      
      // Continue animation
      animationRef.current = requestAnimationFrame(animate)
    }
    
    // Render rings function
    const renderRings = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, time: number, colors: any) => {
      const center = { x: canvas.width / 2, y: canvas.height / 2 }
      const maxRadius = Math.min(canvas.width, canvas.height) * 0.4
      
      // Mouse position relative to center
      const mouseX = currentMousePosition.current.x
      const mouseY = currentMousePosition.current.y
      
      // Mouse in normalized coordinates
      const mouseScaledX = (mouseX - center.x) / (canvas.width / 2)
      const mouseScaledY = (mouseY - center.y) / (canvas.height / 2)
      
      // For each ring
      for (let i = 0; i < params.ringCount; i++) {
        // Base radius for this ring
        const baseRadius = maxRadius - i * (maxRadius * params.ringSpacing)
        if (baseRadius <= 0) continue
        
        // Ring color based on index
        const colorIndex = i % 3
        let ringColor
        
        if (colorIndex === 0) {
          ringColor = colors.ring1
        } else if (colorIndex === 1) {
          ringColor = colors.ring2
        } else {
          ringColor = colors.ring3
        }
        
        // Draw rings
        ctx.beginPath()
        
        // Draw the ring with distortion
        for (let angle = 0; angle < TAU; angle += 0.01) {
          // Calculate ring distortion
          const distortionAngle = angle + (i % 2 === 0 ? time : -time)
          
          // Calculate distance from mouse
          const dx = Math.cos(angle) - mouseScaledX
          const dy = Math.sin(angle) - mouseScaledY
          const distToMouse = Math.sqrt(dx * dx + dy * dy)
          
          // Apply distortion based on mouse proximity
          let distortion = 0
          if (distToMouse < params.mouseRadius) {
            const proximity = 1 - distToMouse / params.mouseRadius
            distortion = proximity * params.mouseStrength * 0.1 * Math.sin(distortionAngle * 7)
          }
          
          // Calculate point position
          const r = baseRadius + distortion * maxRadius
          const x = center.x + r * Math.cos(angle)
          const y = center.y + r * Math.sin(angle)
          
          // First point or connecting point
          if (angle === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        
        ctx.closePath()
        
        // Ring style
        const intensity = params.colorIntensity
        
        // Draw the ring itself
        ctx.strokeStyle = `rgb(${ringColor[0] * 255 * intensity}, ${ringColor[1] * 255 * intensity}, ${ringColor[2] * 255 * intensity})`
        ctx.lineWidth = params.ringWidth * maxRadius
        ctx.stroke()
        
        // Calculate glow based on mouse proximity
        const dx = mouseX - center.x
        const dy = mouseY - center.y
        const distToMouse = Math.sqrt(dx * dx + dy * dy) / maxRadius
        
        // Apply glow
        if (distToMouse < params.proximityRadius) {
          const glowProximity = Math.max(0, 1 - distToMouse / params.proximityRadius)
          const glowStrength = glowProximity * params.glowStrength
          
          // Draw glow
          if (glowStrength > 0) {
            const gradient = ctx.createRadialGradient(
              mouseX, mouseY, 0,
              mouseX, mouseY, params.glowSize * maxRadius
            )
            
            gradient.addColorStop(0, `rgba(${ringColor[0] * 255}, ${ringColor[1] * 255}, ${ringColor[2] * 255}, ${glowStrength * params.glowIntensity})`)
            gradient.addColorStop(1, `rgba(${ringColor[0] * 255}, ${ringColor[1] * 255}, ${ringColor[2] * 255}, 0)`)
            
            ctx.fillStyle = gradient
            ctx.fill()
          }
        }
      }
    }
    
    // Apply noise function
    const applyNoise = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      if (params.grainIntensity <= 0) return
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      
      // Apply grain
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 2 - 1
        const intensity = noise * params.grainIntensity * 255
        
        data[i] += intensity       // R
        data[i + 1] += intensity   // G
        data[i + 2] += intensity   // B
      }
      
      ctx.putImageData(imageData, 0, 0)
    }
    
    // Start animation
    animate()
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [colorPreset, dimensions])

  return (
    <div 
      ref={containerRef} 
      className={cn("w-full h-full overflow-hidden relative", className)}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full absolute inset-0 z-0"
      />
    </div>
  )
}