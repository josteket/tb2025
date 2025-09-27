"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { featureFlags } from "@/lib/featureFlags";
import * as THREE from "three";
import { BufferGeometryUtils } from "three/examples/jsm/utils/BufferGeometryUtils.js";

function Helmet() {
  const mesh = useRef<THREE.Mesh>(null);
  const normalMap = useMemo(() => {
    const size = 128;
    const data = new Uint8Array(size * size * 3);
    for (let i = 0; i < size * size; i++) {
      const stride = i * 3;
      const value = 128 + Math.sin(i / 7) * 20;
      data[stride] = 128;
      data[stride + 1] = value;
      data[stride + 2] = 255 - value;
    }
    const texture = new THREE.DataTexture(data, size, size, THREE.RGBFormat);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y = Math.sin(t / 3) * 0.4 + state.pointer.x * 0.6;
    mesh.current.rotation.x = Math.cos(t / 4) * 0.15 - state.pointer.y * 0.4;
    mesh.current.scale.setScalar(1 + Math.sin(t * 2) * 0.02);
  });

  const geometry = useMemo(() => {
    // Procedural placeholder geometry. Заменить на реальный GLB в public/models/ и загрузить через useGLTF при наличии файла.
    const helmet = new THREE.SphereGeometry(1, 64, 64);
    const visor = new THREE.SphereGeometry(0.9, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2);
    const base = new THREE.CylinderGeometry(0.9, 1.2, 0.5, 64, 1, true);

    visor.translate(0, -0.1, 0);
    base.translate(0, -0.9, 0);

    const merged = BufferGeometryUtils.mergeGeometries([helmet, visor, base], false);
    return merged;
  }, []);

  const material = useMemo(() => (
    new THREE.MeshPhysicalMaterial({
      metalness: 0.8,
      roughness: 0.2,
      clearcoat: 0.6,
      color: "#1f6b89",
      emissive: "#062c4a",
      emissiveIntensity: 0.6,
      reflectivity: 0.9,
      normalMap: normalMap,
      normalScale: new THREE.Vector2(0.4, 0.4),
    })
  ), [normalMap]);

  return <mesh ref={mesh} geometry={geometry} material={material} />;
}

function Particles() {
  const count = 600;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = Math.random() * 4 - 2;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, [count]);

  const points = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y += 0.0008;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime / 6) * 0.2;
    }
  });

  return (
    <points ref={points} rotation={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#00e5ff" size={0.04} sizeAttenuation transparent opacity={0.65} />
    </points>
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 -z-10">
      <Suspense fallback={<CanvasFallback />}> 
        <Canvas camera={{ position: [0, 0, 4], fov: 40 }} dpr={[1, 1.5]}>
          <color attach="background" args={["#07131f"]} />
          <ambientLight intensity={0.8} />
          <directionalLight position={[4, 4, 4]} intensity={1.2} color="#a855f7" />
          <spotLight position={[-5, 5, 2]} angle={0.6} penumbra={0.8} intensity={1.5} color="#00e5ff" />
          <Float floatIntensity={1.5} speed={2.2}>
            <Helmet />
          </Float>
          {featureFlags.enableParticles && <Particles />}
          {featureFlags.enablePostProcessing && (
            <EffectComposer multisampling={0}>
              <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={1.2} />
              <ChromaticAberration offset={[0.0015, 0.0015]} blendFunction={BlendFunction.NORMAL} />
              <Noise opacity={0.08} />
            </EffectComposer>
          )}
          <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.7} minPolarAngle={Math.PI / 3} />
        </Canvas>
      </Suspense>
    </div>
  );
}

function CanvasFallback() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-muted">
        Загрузка сцены
      </div>
    </div>
  );
}
