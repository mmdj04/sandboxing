"use client";

import { useEffect, useRef } from "react";

export function Tesseract() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 400;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    // 16 vertices of a 4D hypercube (tesseract)
    const vertices4D: number[][] = [];
    for (let i = 0; i < 16; i++) {
      vertices4D.push([
        (i & 1) ? 1 : -1,
        (i & 2) ? 1 : -1,
        (i & 4) ? 1 : -1,
        (i & 8) ? 1 : -1,
      ]);
    }

    // 32 edges
    const edges: [number, number][] = [];
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        const diff = i ^ j;
        if (diff && (diff & (diff - 1)) === 0) {
          edges.push([i, j]);
        }
      }
    }

    // 4D rotation matrices - only rotate in 4D planes (XW, YW, ZW)
    // This creates the 4D movement without rotating the 3D/2D projection
    function rotateXW(v: number[], angle: number): number[] {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return [v[0] * cos - v[3] * sin, v[1], v[2], v[0] * sin + v[3] * cos];
    }

    function rotateYW(v: number[], angle: number): number[] {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return [v[0], v[1] * cos - v[3] * sin, v[2], v[1] * sin + v[3] * cos];
    }

    function rotateZW(v: number[], angle: number): number[] {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return [v[0], v[1], v[2] * cos - v[3] * sin, v[2] * sin + v[3] * cos];
    }

    // Project 4D to 3D (perspective projection)
    function project4Dto3D(v: number[], distance: number): number[] {
      const w = distance / (distance - v[3]);
      return [v[0] * w, v[1] * w, v[2] * w];
    }

    // Project 3D to 2D (perspective projection)
    function project3Dto2D(v: number[], distance: number): number[] {
      const z = distance / (distance - v[2]);
      return [v[0] * z, v[1] * z];
    }

    let animationId: number;
    let time = 0;

    function render() {
      ctx.clearRect(0, 0, size, size);

      const centerX = size / 2;
      const centerY = size / 2;
      const scale = 80;

      // Apply ONLY 4D rotations (XW, YW, ZW planes)
      // This creates the 4D movement effect without rotating in 3D space
      const rotatedVertices = vertices4D.map((v) => {
        let result = [...v];
        result = rotateXW(result, time * 0.5);
        result = rotateYW(result, time * 0.3);
        result = rotateZW(result, time * 0.4);
        return result;
      });

      // Project to 3D
      const vertices3D = rotatedVertices.map((v) => project4Dto3D(v, 3));

      // Project to 2D
      const vertices2D = vertices3D.map((v) => project3Dto2D(v, 5));

      // Calculate depth for coloring
      const depths = vertices3D.map((v) => v[2]);
      const minDepth = Math.min(...depths);
      const maxDepth = Math.max(...depths);

      // Draw edges
      edges.forEach(([i, j]) => {
        const v1 = vertices2D[i];
        const v2 = vertices2D[j];
        const depth1 = (depths[i] - minDepth) / (maxDepth - minDepth);
        const depth2 = (depths[j] - minDepth) / (maxDepth - minDepth);
        const avgDepth = (depth1 + depth2) / 2;

        const alpha = 0.15 + avgDepth * 0.5;
        const brightness = Math.floor(80 + avgDepth * 175);

        ctx.beginPath();
        ctx.moveTo(centerX + v1[0] * scale, centerY + v1[1] * scale);
        ctx.lineTo(centerX + v2[0] * scale, centerY + v2[1] * scale);
        ctx.strokeStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw vertices
      vertices2D.forEach((v, i) => {
        const depth = (depths[i] - minDepth) / (maxDepth - minDepth);
        const alpha = 0.3 + depth * 0.7;
        const brightness = Math.floor(150 + depth * 105);
        const radius = 2 + depth * 2;

        ctx.beginPath();
        ctx.arc(centerX + v[0] * scale, centerY + v[1] * scale, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${alpha})`;
        ctx.fill();
      });

      time += 0.008;
      animationId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        margin: "0 auto",
      }}
    />
  );
}
