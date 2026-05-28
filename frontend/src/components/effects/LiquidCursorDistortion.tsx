import { useEffect, useMemo, useRef } from 'react';

export interface LiquidCursorDistortionProps {
  trailLength?: number;
  distortionStrength?: number;
  radius?: number;
  blur?: number;
  fadeSpeed?: number;
}

type TrailPoint = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  life: number;
};

export const LiquidCursorDistortion = ({
  trailLength = 10,
  distortionStrength = 1,
  radius = 12,
  blur = 10,
  fadeSpeed = 0.11,
}: LiquidCursorDistortionProps) => {
  const nodesRef = useRef<Array<HTMLDivElement | null>>([]);
  const pointsRef = useRef<TrailPoint[]>([]);
  const pointerRef = useRef({ x: -9999, y: -9999, active: false });
  const rafRef = useRef<number | null>(null);
  const idleTimerRef = useRef<number | null>(null);

  const points = useMemo(
    () =>
      Array.from({ length: trailLength }, () => ({
        x: -9999,
        y: -9999,
        targetX: -9999,
        targetY: -9999,
        life: 0,
      })),
    [trailLength],
  );

  useEffect(() => {
    pointsRef.current = points;
  }, [points]);

  useEffect(() => {
    const setPointer = (x: number, y: number) => {
      pointerRef.current.x = x;
      pointerRef.current.y = y;
      pointerRef.current.active = true;

      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
      }

      idleTimerRef.current = window.setTimeout(() => {
        pointerRef.current.active = false;
      }, 90);
    };

    const handleMouseMove = (event: MouseEvent) => {
      setPointer(event.clientX, event.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) {
        setPointer(touch.clientX, touch.clientY);
      }
    };

    const handleLeave = () => {
      pointerRef.current.active = false;
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handleLeave);
    window.addEventListener('touchend', handleLeave);
    window.addEventListener('touchcancel', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('touchend', handleLeave);
      window.removeEventListener('touchcancel', handleLeave);

      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      const pointer = pointerRef.current;
      const trail = pointsRef.current;

      for (let index = 0; index < trail.length; index += 1) {
        const point = trail[index];
        const previous = index === 0 ? pointer : trail[index - 1];
        const node = nodesRef.current[index];
        const follow = index === 0 ? 0.42 : 0.28;
        const fade = Math.max(0.02, fadeSpeed + index * 0.006);

        point.targetX = previous.x;
        point.targetY = previous.y;
        point.x += (point.targetX - point.x) * follow;
        point.y += (point.targetY - point.y) * follow;
        point.life += ((pointer.active ? 1 : 0) - point.life) * fade;

        if (node) {
          const progress = 1 - index / Math.max(trail.length - 1, 1);
          const scaleX = 0.20 + distortionStrength * (0.45 + progress * 0.42);
          const scaleY = 0.58 + progress * 0.32;
          const opacity = point.life * progress * 0.72;
          const rotation = (point.x - point.targetX) * -0.04;
          const size = radius * (0.7 + progress * 0.55);

          node.style.width = `${size * 2}px`;
          node.style.height = `${size}px`;
          node.style.opacity = `${opacity}`;
          node.style.transform = `translate3d(${point.x - size}px, ${point.y - size * 0.5}px, 0) rotate(${rotation}deg) scale(${scaleX}, ${scaleY})`;
          node.style.setProperty('--liquid-blur', `${blur + index * 0.45}px`);
          node.style.setProperty('--liquid-strength', `${distortionStrength}`);
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [blur, distortionStrength, fadeSpeed, radius]);

  return (
    <div className="liquid-cursor-distortion" aria-hidden="true">
      {points.map((_, index) => (
        <div
          key={index}
          ref={(node) => {
            nodesRef.current[index] = node;
          }}
          className="liquid-cursor-distortion__drop"
          style={{ zIndex: trailLength - index }}
        />
      ))}
    </div>
  );
};
