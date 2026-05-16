"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Text } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

function LegalObject() {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.16;
  });

  return (
    <group ref={group}>
      <Float speed={1.15} rotationIntensity={0.18} floatIntensity={0.45}>
        <Text
          fontSize={0.62}
          letterSpacing={-0.04}
          anchorX="center"
          anchorY="middle"
          color="#f8fafc"
        >
          LexAzerbaijan
        </Text>
      </Float>

      <mesh position={[0, -0.85, 0]}>
        <torusGeometry args={[2.15, 0.008, 12, 96]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.28} />
      </mesh>

      <mesh position={[0, -0.85, 0]} rotation={[1.1, 0, 0]}>
        <torusGeometry args={[2.55, 0.006, 12, 96]} />
        <meshStandardMaterial color="#94a3b8" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

export function LegalOrbitCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-70">
      <Canvas
        dpr={[1, 1.4]}
        frameloop="always"
        camera={{ position: [0, 0, 6], fov: 42 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 3, 4]} intensity={1.4} />
        <LegalObject />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} autoRotate autoRotateSpeed={0.25} />
      </Canvas>
    </div>
  );
}
