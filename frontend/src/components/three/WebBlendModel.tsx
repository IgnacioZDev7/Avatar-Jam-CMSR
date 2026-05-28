import { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, Environment, OrbitControls, useGLTF, useTexture } from '@react-three/drei';
import { DoubleSide, SRGBColorSpace, type Group, type Mesh, type MeshStandardMaterial, type Texture } from 'three';

const MODEL_PATH = '/models/web.glb';
const TEXTURE_PATH = '/models/web_texture.png';

function WebModel() {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(MODEL_PATH);
  const colorTexture = useTexture(TEXTURE_PATH);

  useEffect(() => {
    colorTexture.colorSpace = SRGBColorSpace;
    colorTexture.flipY = false;
    colorTexture.needsUpdate = true;

    scene.traverse((child) => {
      const mesh = child as Mesh;
      if (!mesh.isMesh) return;

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach((mat) => {
        const fixedMaterial = mat as MeshStandardMaterial & {
          map?: Texture | null;
          opacity?: number;
          transparent?: boolean;
          alphaTest?: number;
          depthWrite?: boolean;
          depthTest?: boolean;
          side?: number;
          roughness?: number;
          metalness?: number;
          envMapIntensity?: number;
          toneMapped?: boolean;
          needsUpdate?: boolean;
        };

        fixedMaterial.map = colorTexture;

        fixedMaterial.transparent = Boolean(fixedMaterial.transparent);
        fixedMaterial.opacity = 1;
        fixedMaterial.alphaTest = fixedMaterial.transparent ? 0.02 : 0;
        fixedMaterial.depthWrite = true;
        fixedMaterial.depthTest = true;
        fixedMaterial.side = DoubleSide;
        fixedMaterial.roughness = Math.max(fixedMaterial.roughness ?? 0.55, 0.42);
        fixedMaterial.metalness = Math.min(fixedMaterial.metalness ?? 0, 0.12);
        fixedMaterial.envMapIntensity = 0.42;
        fixedMaterial.toneMapped = true;
        fixedMaterial.needsUpdate = true;
      });
    });
  }, [colorTexture, scene]);

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
        <ambientLight intensity={0.42} />
        <directionalLight position={[3.2, 4.6, 4.5]} intensity={0.95} />
        <directionalLight position={[-3.5, 2.2, -2.0]} color="#38bdf8" intensity={0.25} />
        <pointLight position={[-1.5, 1.25, 1.8]} color="#22d3ee" intensity={0.36} distance={5.2} />
        <Suspense fallback={null}>
          <WebModel />
          <Environment preset="studio" environmentIntensity={0.18} />
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
