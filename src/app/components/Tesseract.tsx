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
      canvas.style.overflow = "visible";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    updateSize();

    const vertices4D: number[][] = [];
    for (let i = 0; i < 16; i++) {
      vertices4D.push([
        (i & 1) ? 1 : -1,
        (i & 2) ? 1 : -1,
        (i & 4) ? 1 : -1,
        (i & 8) ? 1 : -1,
      ]);
    }

    const edges: [number, number][] = [];
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        const diff = i ^ j;
        if (diff && (diff & (diff - 1)) === 0) {
          edges.push([i, j]);
        }
      }
    }

    function rotateXW(v: number[], angle: number): number[] {
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      return [v[0] * c - v[3] * s, v[1], v[2], v[0] * s + v[3] * c];
    }

    function rotateYW(v: number[], angle: number): number[] {
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      return [v[0], v[1] * c - v[3] * s, v[2], v[1] * s + v[3] * c];
    }

    function rotateZW(v: number[], angle: number): number[] {
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      return [v[0], v[1], v[2] * c - v[3] * s, v[2] * s + v[3] * c];
    }

    function rotateFixed3D(v: number[]): number[] {
      const aX = Math.PI / 4;
      const aY = Math.PI / 4;
      const cX = Math.cos(aX);
      const sX = Math.sin(aX);
      const y1 = v[1] * cX - v[2] * sX;
      const z1 = v[1] * sX + v[2] * cX;
      const cY = Math.cos(aY);
      const sY = Math.sin(aY);
      const x2 = v[0] * cY + z1 * sY;
      const z2 = -v[0] * sY + z1 * cY;
      return [x2, y1, z2];
    }

    function project4Dto3D(v: number[], dist: number): number[] {
      const w = dist / (dist - v[3]);
      return [v[0] * w, v[1] * w, v[2] * w];
    }

    function project3Dto2D(v: number[], dist: number): number[] {
      const z = dist / (dist - v[2]);
      return [v[0] * z, v[1] * z];
    }

    function render() {
      if (!ctx || !width || !height) return;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const sc = Math.min(width, height) * 0.2;

      const rot4D = vertices4D.map((v) => {
        let r = rotateXW(v, 1.2);
        r = rotateYW(r, 0.8);
        r = rotateZW(r, 1.0);
        return r;
      });

      const v3D = rot4D.map((v) => project4Dto3D(v, 4));
      const r3D = v3D.map((v) => rotateFixed3D(v));
      const v2D = r3D.map((v) => project3Dto2D(v, 7));

      let minD = Infinity;
      let maxD = -Infinity;
      const depths: number[] = [];
      for (let i = 0; i < r3D.length; i++) {
        const d = r3D[i][2];
        depths.push(d);
        if (d < minD) minD = d;
        if (d > maxD) maxD = d;
      }

      const range = maxD - minD || 1;

      for (let ei = 0; ei < edges.length; ei++) {
        const [i, j] = edges[ei];
        const v1 = v2D[i];
        const v2 = v2D[j];
        const d1 = (depths[i] - minD) / range;
        const d2 = (depths[j] - minD) / range;
        const avg = (d1 + d2) / 2;
        const alpha = 0.15 + avg * 0.5;
        const br = Math.floor(80 + avg * 175);

        ctx.beginPath();
        ctx.moveTo(cx + v1[0] * sc, cy + v1[1] * sc);
        ctx.lineTo(cx + v2[0] * sc, cy + v2[1] * sc);
        ctx.strokeStyle = `rgba(${br},${br},${br},${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let i = 0; i < v2D.length; i++) {
        const v = v2D[i];
        const d = (depths[i] - minD) / range;
        const alpha = 0.3 + d * 0.7;
        const br = Math.floor(150 + d * 105);
        const radius = 2 + d * 2;

        ctx.beginPath();
        ctx.arc(cx + v[0] * sc, cy + v[1] * sc, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${br},${br},${br},${alpha})`;
        ctx.fill();
      }
    }

    render();

    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        margin: "0 auto",
        maxWidth: "100%",
        overflow: "visible",
      }}
    />
  );
}
