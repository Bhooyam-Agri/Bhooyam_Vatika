'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function Plant() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const scroll = window.scrollY;
      groupRef.current.rotation.x = scroll * 0.001;
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Simple leaf-like shapes */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 4, 8]} />
        <meshBasicMaterial color="#16a34a" opacity={0.1} transparent />
      </mesh>
      <mesh position={[0.5, 1, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.1, 0.1, 3, 8]} />
        <meshBasicMaterial color="#16a34a" opacity={0.1} transparent />
      </mesh>
      <mesh position={[-0.5, 1, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.1, 0.1, 3, 8]} />
        <meshBasicMaterial color="#16a34a" opacity={0.1} transparent />
      </mesh>
    </group>
  );
}

export function BackgroundPlant() {
  return (
    <div className="fixed right-0 top-0 w-full h-screen pointer-events-none opacity-30">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Plant />
      </Canvas>
    </div>
  );
}
