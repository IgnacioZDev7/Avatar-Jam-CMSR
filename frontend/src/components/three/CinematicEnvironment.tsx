import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const PARTICLE_COUNT = 5000;
const FOREGROUND_COUNT = 2000;

const POSITIONS = new Float32Array(PARTICLE_COUNT * 3);
for (let i = 0; i < PARTICLE_COUNT; i++) {
  const i3 = i * 3;
  POSITIONS[i3] = (Math.random() - 0.5) * 60;
  POSITIONS[i3 + 1] = Math.random() * 10 + 0.1;
  POSITIONS[i3 + 2] = (Math.random() - 0.5) * 100 - 10;
}

const FG_POSITIONS = new Float32Array(FOREGROUND_COUNT * 3);
for (let i = 0; i < FOREGROUND_COUNT; i++) {
  const i3 = i * 3;
  FG_POSITIONS[i3] = (Math.random() - 0.5) * 50;
  FG_POSITIONS[i3 + 1] = Math.random() * 4 + 0.05;
  FG_POSITIONS[i3 + 2] = (Math.random() - 0.5) * 40 + 5;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const ScrollCamera = () => {
  const scrollRef = useRef(0);
  const smoothRef = useRef(0);

  useFrame(({ camera }, delta) => {
    const clampedDelta = Math.min(delta, 0.05);
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const raw = window.scrollY / maxScroll;
    scrollRef.current = raw;

    smoothRef.current += (raw - smoothRef.current) * Math.min(clampedDelta * 2, 0.1);

    const progress = smoothRef.current;
    const eased = easeInOutCubic(progress);

    const startZ = 14;
    const endZ = -85;
    const targetZ = startZ + (endZ - startZ) * eased;

    camera.position.x += (0 - camera.position.x) * 0.05;
    camera.position.y += (2.5 + eased * 1.5 - camera.position.y) * 0.03;
    camera.position.z += (targetZ - camera.position.z) * 0.04;

    const lookZ = camera.position.z - 15;
    camera.lookAt(0, 0, lookZ);
  });

  return null;
};

function usePageVisible() {
  const visibleRef = useRef(true);
  useEffect(() => {
    const handler = () => { visibleRef.current = !document.hidden; };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, []);
  return visibleRef;
}

const FloatingParticles = () => {
  const pointsRef = useRef<THREE.Points>(null!);
  const mouseRef = useRef(new THREE.Vector2(999, 999));
  const positionsRef = useRef(new Float32Array(POSITIONS));
  const velocitiesRef = useRef(new Float32Array(PARTICLE_COUNT * 3));
  const visibleRef = usePageVisible();

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useFrame((_state, delta) => {
    if (!visibleRef.current) return;

    const clampedDelta = Math.min(delta, 0.05);
    const positions = positionsRef.current;
    const velocities = velocitiesRef.current;
    const mouse = mouseRef.current;

    const mx = mouse.x * 25;
    const mz = -mouse.y * 35 + 15;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      const px = positions[i3];
      const py = positions[i3 + 1];
      const pz = positions[i3 + 2];

      const dx = px - mx;
      const dz = pz - mz;
      const dist = Math.sqrt(dx * dx + dz * dz);

      if (dist < 10 && dist > 0.01) {
        const strength = (1 - dist / 10) * 5;
        velocities[i3] += (dx / dist) * strength * clampedDelta;
        velocities[i3 + 2] += (dz / dist) * strength * clampedDelta;
        velocities[i3 + 1] += 2 * clampedDelta;
      }

      const ox = POSITIONS[i3];
      const oy = POSITIONS[i3 + 1];
      const oz = POSITIONS[i3 + 2];

      velocities[i3] += (ox - px) * 0.4 * clampedDelta;
      velocities[i3 + 1] += (oy - py) * 0.2 * clampedDelta;
      velocities[i3 + 2] += (oz - pz) * 0.4 * clampedDelta;

      velocities[i3] *= 0.92;
      velocities[i3 + 1] *= 0.92;
      velocities[i3 + 2] *= 0.92;

      velocities[i3 + 1] -= 0.6 * clampedDelta;

      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      if (positions[i3 + 1] < 0.05) {
        positions[i3 + 1] = 0.05;
        velocities[i3 + 1] = 0;
      }
    }

    const attr = pointsRef.current.geometry.attributes.position;
    (attr.array as Float32Array).set(positions);
    attr.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={POSITIONS} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#f0ece4"
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
};

const ForegroundParticles = () => {
  const pointsRef = useRef<THREE.Points>(null!);
  const positionsRef = useRef(new Float32Array(FG_POSITIONS));
  const velocitiesRef = useRef(new Float32Array(FOREGROUND_COUNT * 3));
  const visibleRef = usePageVisible();

  useFrame((_state, delta) => {
    if (!visibleRef.current) return;

    const clampedDelta = Math.min(delta, 0.05);
    const positions = positionsRef.current;
    const velocities = velocitiesRef.current;

    for (let i = 0; i < FOREGROUND_COUNT; i++) {
      const i3 = i * 3;

      const ox = FG_POSITIONS[i3];
      const oy = FG_POSITIONS[i3 + 1];
      const oz = FG_POSITIONS[i3 + 2];

      velocities[i3] += (ox - positions[i3]) * 0.3 * clampedDelta;
      velocities[i3 + 1] += (oy - positions[i3 + 1]) * 0.2 * clampedDelta;
      velocities[i3 + 2] += (oz - positions[i3 + 2]) * 0.3 * clampedDelta;

      velocities[i3] *= 0.95;
      velocities[i3 + 1] *= 0.95;
      velocities[i3 + 2] *= 0.95;

      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      if (positions[i3 + 1] < 0.03) {
        positions[i3 + 1] = 0.03;
      }
    }

    const attr = pointsRef.current.geometry.attributes.position;
    (attr.array as Float32Array).set(positions);
    attr.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={FG_POSITIONS} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.25}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.9}
      />
    </Points>
  );
};

const SaltTerrain = () => {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(300, 200, 120, 80);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < pos.length; i += 3) {
      const x = pos[i];
      const z = pos[i + 2];
      pos[i + 1] =
        Math.sin(x * 0.06 + z * 0.04) * 0.25 +
        Math.cos(x * 0.03 - z * 0.07) * 0.18 +
        Math.sin(x * 0.1 + z * 0.08) * 0.12;
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} position={[0, -0.6, -15]}>
      <meshStandardMaterial
        color="#d8d4cc"
        roughness={0.7}
        metalness={0.05}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const Structures = () => {
  const groupRef = useRef<THREE.Group>(null!);

  const structures = useMemo(() => [
    { pos: [-14, 0, -25], h: 7 },
    { pos: [16, 0, -30], h: 9 },
    { pos: [-8, 0, -45], h: 5 },
    { pos: [10, 0, -55], h: 11 },
    { pos: [-18, 0, -65], h: 6 },
    { pos: [5, 0, -75], h: 8 },
    { pos: [-22, 0, -50], h: 4 },
    { pos: [20, 0, -40], h: 6.5 },
  ], []);

  return (
    <group ref={groupRef}>
      {structures.map((s, i) => (
        <group key={i} position={[s.pos[0], s.pos[1], s.pos[2]]}>
          <mesh position={[0, s.h / 2, 0]} castShadow>
            <boxGeometry args={[0.6, s.h, 0.6]} />
            <meshStandardMaterial color="#1c1c28" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, s.h + 0.3, 0]}>
            <boxGeometry args={[1.2, 0.1, 1.2]} />
            <meshStandardMaterial color="#2a2a3a" metalness={0.5} roughness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

const HorizonMountains = () => {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const w = 200;
    const segments = 100;
    const points: { x: number; y: number }[] = [];

    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * w - w / 2;
      const amp = 2 + Math.sin(t * 0.02) * 3 + Math.sin(t * 0.05 + 1) * 2 + Math.cos(t * 0.03 + 2) * 1.5;
      points.push({ x: t, y: amp });
    }

    shape.moveTo(points[0].x, 0);
    for (const p of points) {
      shape.lineTo(p.x, p.y);
    }
    shape.lineTo(points[points.length - 1].x, 0);
    shape.closePath();

    const geo = new THREE.ShapeGeometry(shape);
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} position={[0, -0.5, -70]} rotation={[0, 0, 0]}>
      <meshBasicMaterial color="#12121a" side={THREE.DoubleSide} transparent opacity={0.8} />
    </mesh>
  );
};

const Lighting = () => {
  return (
    <group>
      <ambientLight intensity={0.35} color="#c8d0e0" />
      <directionalLight position={[8, 25, -40]} intensity={0.5} color="#e8e4dc" />
      <pointLight position={[-10, 5, -10]} intensity={1.5} color="#8899bb" />
      <pointLight position={[10, 4, 10]} intensity={1} color="#dde4ec" />
      <pointLight position={[0, 8, 30]} intensity={0.8} color="#bbccdd" />
    </group>
  );
};

const Scene = () => {
  return (
    <>
      <color attach="background" args={['#0a0a0e']} />
      <fog attach="fog" args={['#0a0a0e', 20, 85]} />

      <ScrollCamera />
      <Lighting />
      <HorizonMountains />
      <SaltTerrain />
      <Structures />
      <ForegroundParticles />
      <FloatingParticles />
    </>
  );
};

export const CinematicEnvironment: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#0a0a0e]">
      <Canvas
        camera={{ position: [0, 2.5, 14], fov: 40 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};
