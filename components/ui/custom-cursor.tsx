"use client"

import React, { useEffect, useRef } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!cursorRef.current) return
    
    const cursor = cursorRef.current
    
    // Update cursor position on mouse move
    const updateCursorPosition = (e: MouseEvent) => {
      // Throttle cursor updates for better performance
      requestAnimationFrame(() => {
        if (cursor) {
          cursor.style.left = `${e.clientX}px`
          cursor.style.top = `${e.clientY}px`
        }
      })
    }
    
    // Make cursor larger on hover over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.classList.contains('interactive')
      ) {
        cursor.classList.add('cursor-hover')
        cursor.style.width = '32px'
        cursor.style.height = '32px'
      }
    }
    
    // Reset cursor size when not hovering over interactive elements
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.classList.contains('interactive')
      ) {
        cursor.classList.remove('cursor-hover')
        cursor.style.width = '16px'
        cursor.style.height = '16px'
      }
    }
    
    // Position cursor in the center initially
    cursor.style.left = `${window.innerWidth / 2}px`
    cursor.style.top = `${window.innerHeight / 2}px`
    
    // Add event listeners
    document.addEventListener('mousemove', updateCursorPosition)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    
    // Cleanup
    return () => {
      document.removeEventListener('mousemove', updateCursorPosition)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])
  
  return (
    <div ref={cursorRef} className="custom-cursor hidden"></div>
  )
}