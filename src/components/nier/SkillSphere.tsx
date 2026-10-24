import { useEffect, useRef } from "react";

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/** Evenly spreads n points over a unit sphere (Fibonacci lattice). */
function fibonacciSphere(n: number): Vec3[] {
  const golden = (1 + Math.sqrt(5)) / 2;
  return Array.from({ length: n }, (_, i) => {
    const theta = (2 * Math.PI * i) / golden;
    const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
    return {
      x: Math.sin(phi) * Math.cos(theta),
      y: Math.sin(phi) * Math.sin(theta),
      z: Math.cos(phi),
    };
  });
}

function rotate(p: Vec3, ax: number, ay: number): Vec3 {
  // around X, then around Y
  const cx = Math.cos(ax);
  const sx = Math.sin(ax);
  const y1 = p.y * cx - p.z * sx;
  const z1 = p.y * sx + p.z * cx;
  const cy = Math.cos(ay);
  const sy = Math.sin(ay);
  return { x: p.x * cy + z1 * sy, y: y1, z: -p.x * sy + z1 * cy };
}

const IDLE_SPEED = { x: 0.002, y: 0.004 };

/**
 * Rotating constellation of skill labels on a canvas. Hovering steers the
 * spin toward the cursor; dragging grabs and throws the sphere.
 */
export function SkillSphere({ skills }: { skills: string[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const points = fibonacciSphere(skills.length);
    const angle = { x: 0, y: 0 };
    const velocity = { ...IDLE_SPEED };
    const pointer = { inside: false, nx: 0, ny: 0 };
    const drag = { active: false, x: 0, y: 0 };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let raf = 0;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const onDown = (e: PointerEvent) => {
      drag.active = true;
      drag.x = e.clientX;
      drag.y = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.inside = true;
      pointer.nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      if (!drag.active) return;
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      angle.x += dy * 0.006;
      angle.y += dx * 0.006;
      velocity.x = dy * 0.0006;
      velocity.y = dx * 0.0006;
      drag.x = e.clientX;
      drag.y = e.clientY;
    };
    const onUp = () => {
      drag.active = false;
    };
    const onLeave = () => {
      pointer.inside = false;
      drag.active = false;
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointerleave", onLeave);

    const draw = () => {
      const ink = document.documentElement.classList.contains("light") ? "7,6,3" : "230,228,224";
      const cx = width / 2;
      const cy = height / 2;
      const r = Math.min(width, height) * 0.36;

      if (!drag.active) {
        // Ease toward a cursor-steered spin, or back to the idle drift.
        const target = pointer.inside
          ? { x: pointer.ny * 0.012, y: pointer.nx * 0.012 }
          : reduceMotion
            ? { x: 0, y: 0 }
            : IDLE_SPEED;
        velocity.x += (target.x - velocity.x) * 0.04;
        velocity.y += (target.y - velocity.y) * 0.04;
        angle.x += velocity.x;
        angle.y += velocity.y;
      }

      ctx.clearRect(0, 0, width, height);

      // Orbit guides
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = `rgba(${ink},0.09)`;
      for (const [rx, ry, rot] of [
        [1.12, 1.12, 0],
        [1, 0.3, 0],
        [0.3, 1, 0],
        [0.85, 0.5, 0.5],
      ]) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, r * rx, r * ry, rot, 0, Math.PI * 2);
        ctx.stroke();
      }

      const projected = points
        .map((p, i) => {
          const q = rotate(p, angle.x, angle.y);
          return { x: cx + q.x * r, y: cy + q.y * r, z: q.z, label: skills[i] };
        })
        .sort((a, b) => a.z - b.z);

      // Constellation lines between near neighbours
      ctx.lineWidth = 0.4;
      const reach = r * 0.6;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const d = Math.hypot(projected[i].x - projected[j].x, projected[i].y - projected[j].y);
          if (d < reach) {
            ctx.strokeStyle = `rgba(${ink},${(1 - d / reach) * 0.12})`;
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes + labels, back to front
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (const p of projected) {
        const depth = (p.z + 1) / 2;
        const alpha = 0.12 + depth * 0.78;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1 + depth * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ink},${alpha * 0.5})`;
        ctx.fill();
        ctx.font = `${depth > 0.6 ? 700 : 400} ${9 + depth * 5}px "Space Mono", monospace`;
        ctx.fillStyle = `rgba(${ink},${alpha})`;
        ctx.fillText(p.label, p.x, p.y - 9 - depth * 4);
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [skills]);

  return (
    <div ref={wrapRef} className="relative h-full w-full touch-pan-y">
      <canvas
        ref={canvasRef}
        aria-label={`Skills: ${skills.join(", ")}`}
        role="img"
        className="h-full w-full cursor-grab active:cursor-grabbing"
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/15" />
      </div>
    </div>
  );
}
