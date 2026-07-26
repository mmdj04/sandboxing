"use client";

import { useEffect, useRef } from "react";

export function Tesseract() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const container = canvas.parentElement;
    if (!container) return;

    let width: number;
    let height: number;

    const updateSize = () => {
      const containerWidth = Math.min(container.clientWidth - 32, 500);
      width = containerWidth;
      height = containerWidth;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    updateSize();

    // 16 vertices of a 4D hypercube
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

    // 4D rotations
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

    // Fixed 3D rotation for optimal viewing
    function rotateFixed3D(v: number[]): number[] {
      const angleX = Math.PI / 4;
      const angleY = Math.PI / 4;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const y1 = v[1] * cosX - v[2] * sinX;
      const z1 = v[1] * sinX + v[2] * cosX;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const x2 = v[0] * cosY + z1 * sinY;
      const z2 = -v[0] * sinY + z1 * cosY;

      return [x2, y1, z2];
    }

    function project4Dto3D(v: number[], distance: number): number[] {
      const w = distance / (distance - v[3]);
      return [v[0] * w, v[1] * w, v[2] * w];
    }

    function project3Dto2D(v: number[], distance: number): number[] {
      const z = distance / (distance - v[2]);
      return [v[0] * z, v[1] * z];
    }

    let animationId: number;
    let time = 0;

    function render() {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const scale = Math.min(width, height) * 0.2;

      const rotatedVertices = vertices4D.map((v) => {
        let result = [...v];
        result = rotateXW(result, time * 0.4);
        result = rotateYW(result, time * 0.25);
        result = rotateZW(result, time * 0.35);
        return result;
      });

      const vertices3D = rotatedVertices.map((v) => project4Dto3D(v, 4));
      const rotated3D = vertices3D.map((v) => rotateFixed3D(v));
      const vertices2D = rotated3D.map((v) => project3Dto2D(v, 7));

      const depths = rotated3D.map((v) => v[2]);
      const minDepth = Math.min(...depths);
      const maxDepth = Math.max(...depths);

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

      time += 0.006;
      animationId = requestAnimationFrame(render);
    }

    render();

    const handleResize = () => {
      updateSize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        margin: "0 auto",
        maxWidth: "100%",
      }}
    />
  );
}


