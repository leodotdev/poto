"use client"

import Image from 'next/image'
import { useState } from 'react'

type ResponsiveImageProps = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

export function ResponsiveImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
}: ResponsiveImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={`overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={90}
        priority={priority}
        className={`transition-all duration-500 ${
          isLoading ? 'blur-sm scale-105' : 'blur-0 scale-100'
        }`}
        onLoadingComplete={() => setIsLoading(false)}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </div>
  )
}