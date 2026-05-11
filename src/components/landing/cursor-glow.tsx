"use client";

import { useEffect, useRef, useState } from "react";

export function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);
  const pos = useRef({ x: -500, y: -500 });
  const smooth = useRef({ x: -500, y: -500 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);

    const PIXEL = 12;
    const RADIUS = 160;

    const animate = () => {
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.12;
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.12;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!visible) {
        requestAnimationFrame(animate);
        return;
      }

      const cx = smooth.current.x;
      const cy = smooth.current.y;

      const startX = Math.floor((cx - RADIUS) / PIXEL) * PIXEL;
      const startY = Math.floor((cy - RADIUS) / PIXEL) * PIXEL;
      const endX = cx + RADIUS;
      const endY = cy + RADIUS;

      for (let x = startX; x < endX; x += PIXEL) {
        for (let y = startY; y < endY; y += PIXEL) {
          const dx = x + PIXEL / 2 - cx;
          const dy = y + PIXEL / 2 - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < RADIUS) {
            const intensity = 1 - dist / RADIUS;
            const alpha = intensity * intensity * 0.18;
            ctx.fillStyle = `rgba(199, 125, 255, ${alpha})`;
            ctx.fillRect(x, y, PIXEL - 1, PIXEL - 1);
          }
        }
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [visible]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
    />
  );
}
