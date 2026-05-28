import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const SaltParticles = () => {
  const ref = useRef<THREE.Points>(null!);
  
  const [positions] = useMemo(() => {
    const count = 800; // Increased count for better visibility
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = Math.random() * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return [positions];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.015;
    ref.current.position.y = Math.sin(t * 0.08) * 0.3;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.02} // Slightly larger for perceptible "dust"
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.3}
      />
    </Points>
  );
};

const SaltFlat = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial 
        color="#08090d"
        roughness={0.4} // Lowered for better reflective feeling
        metalness={0.1}
        opacity={0.9}
        transparent
      />
    </mesh>
  );
};

const CinematicLighting = () => {
  return (
    <group>
      <ambientLight intensity={0.2} />
      {/* Distant horizon glow */}
      <rectAreaLight
        width={100}
        height={50}
        intensity={5}
        color="#445577"
        position={[0, 10, -40]}
        lookAt={[0, 0, 0]}
      />
      {/* Cold environmental fill */}
      <pointLight position={[10, 5, -15]} intensity={4} color="#7788aa" />
      <pointLight position={[-10, 5, -15]} intensity={2} color="#334466" />
    </group>
  );
};

const Scene = () => {
  return (
    <>
      {/* Background matches CSS salt-night */}
      <color attach="background" args={['#06070a']} />
      {/* Dense cinematic fog */}
      <fog attach="fog" args={['#06070a', 2, 35]} />
      
      <CinematicLighting />
      <SaltFlat />
      <SaltParticles />

      {/* Volumetric Horizon Plane */}
      <mesh position={[0, 10, -30]}>
        <planeGeometry args={[150, 80]} />
        <meshBasicMaterial 
          transparent 
          opacity={0.08} 
          color="#1a2030"
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
};

export const CinematicEnvironment: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#06070a]">
      <Canvas
        camera={{ position: [0, 2, 15], fov: 35 }} // Lowered FOV for more "monumental" scale
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: false,
          powerPreference: "high-performance" 
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};
