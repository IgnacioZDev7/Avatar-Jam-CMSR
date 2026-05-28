import { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { FrontSide, type Group, type Material, type Mesh } from 'three';

const MODEL_PATH = '/models/web.glb';

function WebModel() {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(MODEL_PATH);

  useEffect(() => {
    scene.traverse((child) => {
      child.frustumCulled = false;
      const mesh = child as Mesh;
      if (!mesh.isMesh) return;

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach((mat) => {
        const fixedMaterial = mat as Material & {
          opacity?: number;
          transparent?: boolean;
          alphaTest?: number;
          depthWrite?: boolean;
          depthTest?: boolean;
          side?: number;
          needsUpdate?: boolean;
        };

        fixedMaterial.transparent = false;
        fixedMaterial.opacity = 1;
        fixedMaterial.alphaTest = 0.02;
        fixedMaterial.depthWrite = true;
        fixedMaterial.depthTest = true;
        fixedMaterial.side = FrontSide;
        fixedMaterial.needsUpdate = true;
      });
    });
  }, [scene]);

  return (
    <Center>
      <group ref={group} rotation={[0, -0.35, 0]} position={[0, -0.12, 0]} scale={1.08}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

export function WebBlendModel() {
  return (
    <div className="pointer-events-auto absolute inset-0 z-20 cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0.72, 6.2], fov: 32 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[3.2, 4.6, 4.5]} intensity={1.9} />
        <directionalLight position={[-3.5, 2.2, -2.0]} color="#38bdf8" intensity={0.45} />
        <pointLight position={[-1.5, 1.25, 1.8]} color="#22d3ee" intensity={0.8} distance={5.2} />
        <Suspense fallback={null}>
          <WebModel />
          <Environment preset="studio" environmentIntensity={0.35} />
        </Suspense>
        <OrbitControls
          enabled
          makeDefault
          enableDamping
          dampingFactor={0.08}
          enablePan={false}
          enableZoom
          minDistance={3.4}
          maxDistance={7.4}
          target={[0, 0.05, 0]}
          maxPolarAngle={Math.PI * 0.74}
          minPolarAngle={Math.PI * 0.22}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_PATH);
