"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function TrailingDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full window size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse position
    let mouseX = 0;
    let mouseY = 0;
    const updateMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", updateMouse);

    // Dots array
    const dots: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      phase: number;
    }[] = [];

    // Create dots
    const createDots = () => {
      for (let i = 0; i < 100; i++) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: Math.random() * 2 - 1,
          vy: Math.random() * 2 - 1,
          radius: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.5,
          phase: Math.random() * 2 * Math.PI,
        });
      }
    };
    createDots();

    // Animation loop
    const animate = () => {
      // Clear canvas with semi-transparent background based on theme
      const bgColor =
        theme === "dark" || theme === "neon"
          ? "rgba(0, 0, 0, 0.05)"
          : "rgba(255, 255, 255, 0.05)";
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update dots
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        // Move towards mouse slightly
        const dx = mouseX - dot.x;
        const dy = mouseY - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200) {
          const angle = Math.atan2(dy, dx);
          const influence = (1 - dist / 200) * 0.01;
          dot.vx += Math.cos(angle) * influence;
          dot.vy += Math.sin(angle) * influence;
        }

        // Update position
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Apply friction
        dot.vx *= 0.99;
        dot.vy *= 0.99;

        // Bounce off edges
        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;

        // Draw dot with color based on theme
        const size =
          dot.radius * (1 + Math.sin(dot.phase + Date.now() * 0.001) * 0.5);
        ctx.globalAlpha = dot.alpha;

        // Theme-based dot colors
        let dotColor = "#000000";
        if (theme === "dark") dotColor = "#ffffff";
        else if (theme === "neon") dotColor = "#00ff99";

        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Connect dots within range
        for (let j = i + 1; j < dots.length; j++) {
          const otherDot = dots[j];
          const dx = dot.x - otherDot.x;
          const dy = dot.y - otherDot.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.globalAlpha = (1 - distance / 100) * 0.2;
            ctx.strokeStyle = dotColor;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(otherDot.x, otherDot.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", updateMouse);
    };
  }, [theme]); // Re-run effect when theme changes

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        backgroundColor: "transparent",
        zIndex: "var(--z-trailing-dots)",
      }}
    />
  );
}
