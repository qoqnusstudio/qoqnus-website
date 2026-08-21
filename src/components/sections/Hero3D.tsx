"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Group } from "three";

// Procedural placeholder for the camera-on-tripod mark from the QOQNUS
// logo — built from primitives (no 3D asset exists yet, see the
// roadmap doc). Swap the <CameraRig> body for a real .glb model once
// one is commissioned; everything else (lighting, motion, fallback
// wiring in HeroVisual) stays the same.
function CameraRig() {
  const group = useRef<Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();

    // slow idle spin + gentle float
    group.current.rotation.y = t * 0.25;
    group.current.position.y = Math.sin(t * 0.8) * 0.08;

    // subtle drift toward pointer position, eased
    group.current.rotation.x +=
      (pointer.current.y * 0.15 - group.current.rotation.x) * 0.04;
    group.current.rotation.z +=
      (-pointer.current.x * 0.1 - group.current.rotation.z) * 0.04;
  });

  useEffect(() => {
    function handlePointerMove(e: PointerEvent) {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    }
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <group ref={group} scale={1.5}>
      {/* camera body */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[1.5, 0.9, 1.1]} />
        <meshStandardMaterial
          color="#c9a45c"
          metalness={0.85}
          roughness={0.28}
          emissive="#48121d"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* lens */}
      <mesh position={[0, 0.35, 0.85]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.38, 0.42, 0.6, 24]} />
        <meshStandardMaterial color="#c9a227" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.35, 1.16]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.06, 24]} />
        <meshStandardMaterial color="#48121d" metalness={0.4} roughness={0.5} />
      </mesh>

      {/* top viewfinder hump */}
      <mesh position={[0, 0.92, -0.1]}>
        <boxGeometry args={[0.5, 0.22, 0.5]} />
        <meshStandardMaterial
          color="#c9a45c"
          metalness={0.85}
          roughness={0.28}
          emissive="#48121d"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* tripod legs */}
      {[-1, 0, 1].map((dir) => (
        <mesh
          key={dir}
          position={[dir * 0.55, -0.85, dir === 0 ? 0.5 : -0.2]}
          rotation={[dir === 0 ? -0.45 : 0.15, 0, dir * 0.55]}
        >
          <cylinderGeometry args={[0.035, 0.05, 1.5, 8]} />
          <meshStandardMaterial
            color="#9c7a2e"
            metalness={0.7}
            roughness={0.4}
          />
        </mesh>
      ))}

      {/* tripod hub */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.15, 16]} />
        <meshStandardMaterial color="#7a5f24" metalness={0.7} roughness={0.4} />
      </mesh>
    </group>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      className="absolute inset-0"
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [2.6, 0.6, 4.2], fov: 42 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      {/* directional lights (no distance falloff) read as brighter and
          more predictable than point lights under three.js's physically-
          correct light units — much simpler to tune for a small stylized
          object than chasing point-light intensity/decay numbers. */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={2.4} color="#f3d98a" />
      <directionalLight
        position={[-3, -1, -3]}
        intensity={0.6}
        color="#e8b86d"
      />
      <CameraRig />
    </Canvas>
  );
}
