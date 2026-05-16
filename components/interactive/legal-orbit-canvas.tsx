"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Text3D, Center } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

function LegalObject() {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.25;
      group.current.rotation.x = Math.sin(Date.now() * 0.0004) * 0.12;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.7}>
        <Center>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.75}
            height={0.08}
            curveSegments={8}
          >
            Lex
            <meshStandardMaterial color="#f8fafc" roughness={0.25} metalness={0.55} />
          </Text3D>
        </Center>
      </Float>

      <mesh position={[0, -1.1, 0]}>
        <torusGeometry args={[1.8, 0.01, 16, 160]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.35} />
      </mesh>

      <mesh position={[0, -1.1, 0]} rotation={[1.2, 0, 0]}>
        <torusGeometry args={[2.2, 0.008, 16, 160]} />
        <meshStandardMaterial color="#94a3b8" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

export function LegalOrbitCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-80">
      <Canvas camera={{ position: [0, 0, 6], fov: 42 }}>
        <ambientLight intensity={1.3} />
        <directionalLight position={[4, 4, 5]} intensity={2} />
        <LegalObject />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.45} />
      </Canvas>
    </div>
  );
}
