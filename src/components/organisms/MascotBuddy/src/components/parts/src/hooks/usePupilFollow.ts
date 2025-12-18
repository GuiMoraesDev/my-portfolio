import { type RefObject, useEffect, useState } from "react";

type PupilFollowOpts = {
  maxOffset?: number;
  engageRadius?: number;
};

export function usePupilFollow(
  wrapperRef: RefObject<HTMLElement | null>,
  { maxOffset = 2.2, engageRadius = 140 }: PupilFollowOpts = {},
) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!wrapperRef.current) {
        setOffset({ x: 0, y: 0 });
        return;
      }

      const el = wrapperRef.current;
      if (!el) return;

      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      // engage only when close enough
      const dist = Math.hypot(dx, dy);
      if (dist > engageRadius) {
        setOffset({ x: 0, y: 0 });
        return;
      }

      // normalize direction, scale to maxOffset, clamp
      const nx = dx / (dist || 1);
      const ny = dy / (dist || 1);

      // stronger effect when closer (optional)
      const t = 1 - dist / engageRadius; // 0..1
      const strength = maxOffset * (0.35 + 0.65 * t);

      setOffset({
        x: nx * strength,
        y: ny * strength,
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [wrapperRef, maxOffset, engageRadius]);

  return offset;
}
