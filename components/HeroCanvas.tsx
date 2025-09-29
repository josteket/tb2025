"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, EffectComposer, Bloom, ChromaticAberration, Noise, Stars } from "@react-three/drei";
import * as THREE from "three";
import { BufferGeometryUtils } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { featureFlags } from "@/lib/featureFlags";

function Helmet() {
  const mesh = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => {
    // Procedural helmet geometry. Заменить на реальный GLB из public/models/ при интеграции фирменного шлема.
    const helmet = new THREE.LatheGeometry(
      Array.from({ length: 24 }, (_, i) => {
        const radius = 0.4 + Math.sin((i / 24) * Math.PI) * 0.2;
        const y = (i / 24) * 1.5;
        return new THREE.Vector2(radius, y);
      })
    );
    helmet.scale(1.2, 1.4, 1.2);

    const visor = new THREE.SphereGeometry(0.6, 32, 32, 0, Math.PI);
    visor.scale(1, 0.7, 1.2);
    visor.translate(0, 0.5, 0.35);

    const base = new THREE.CylinderGeometry(0.8, 0.9, 0.3, 24);
    base.translate(0, -0.9, 0);

    const merged = BufferGeometryUtils.mergeGeometries([helmet, visor, base], false) ?? helmet;
    merged.computeVertexNormals();
    return merged;
  }, []);

  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#CFD8E3"),
      metalness: 0.8,
      roughness: 0.25,
      envMapIntensity: 1.1
    });
    const size = 64;
    const data = new Uint8Array(size * size * 4);
    for (let i = 0; i < size * size; i++) {
      const stride = i * 4;
      data[stride] = 128 + Math.random() * 127;
      data[stride + 1] = 128 + Math.random() * 127;
      data[stride + 2] = 128 + Math.random() * 127;
      data[stride + 3] = 255;
    }
    const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    texture.needsUpdate = true;
    mat.normalMap = texture;
    return mat;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!mesh.current) return;
    mesh.current.rotation.y = Math.sin(t * 0.4) * 0.4;
    mesh.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    const scale = 1 + Math.sin(t * 2) * 0.02;
    mesh.current.scale.setScalar(scale);
  });

  return <mesh ref={mesh} geometry={geometry} material={material} />;
}

function EnergyField() {
  const geo = useMemo(() => new THREE.RingGeometry(1.2, 1.6, 64), []);
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#00E5FF"),
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide
      }),
    []
  );
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.z = clock.getElapsedTime() * 0.2;
    mesh.current.material.opacity = 0.25 + Math.sin(clock.getElapsedTime() * 2) * 0.1;
  });
  return <mesh ref={mesh} geometry={geo} material={mat} rotation={[Math.PI / 2, 0, 0]} />;
}

function Particles() {
  const points = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const count = 1500;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 * Math.random();
      const angle = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 3;
      positions[i * 3 + 2] = Math.sin(angle) * r;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);
  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color("#00E5FF"),
        size: 0.03,
        transparent: true,
        opacity: 0.6
      }),
    []
  );
  const pointsRef = useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.04;
  });
  return <points ref={pointsRef} geometry={points} material={material} />;
}

export function HeroCanvas() {
  return (
    <div className="absolute inset-0">
      <Canvas shadows dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
        <color attach="background" args={["#000000"]} />
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0.6, 3]} fov={40} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 4, 5]} intensity={1.8} castShadow />
          <spotLight position={[-3, 2, -3]} intensity={1.2} angle={0.8} penumbra={0.6} />
          <Helmet />
          <EnergyField />
          {featureFlags.enableParticles ? <Particles /> : null}
          <group position={[0, -1.4, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[8, 8]} />
              <meshStandardMaterial
                color="#0B1E2D"
                metalness={0.9}
                roughness={0.5}
                transparent
                opacity={0.6}
              />
            </mesh>
          </group>
          <Stars radius={50} depth={20} count={2500} factor={4} fade speed={0.8} />
          {featureFlags.enablePostProcessing ? (
            <EffectComposer>
              <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.2} />
              <ChromaticAberration offset={[0.0015, 0.001]} radialModulation={false} />
              <Noise opacity={0.06} />
            </EffectComposer>
          ) : null}
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
