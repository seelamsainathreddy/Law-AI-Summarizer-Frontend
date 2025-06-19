// components/DistortedBackground.tsx
import  { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshWobbleMaterial } from "@react-three/drei";

const WavyPlane = () => {
  const meshRef = useRef<any>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.0015;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[0, 0, 0]}>
      <planeGeometry args={[20, 20, 32, 32]} />
      <MeshWobbleMaterial
        attach="material"
        factor={0.6} // wave intensity
        speed={1.5} // wave speed
        color="#10B981"
        side={2}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
};

export const DistortedBackground = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
        width: "100%",
        height: "100%",
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <WavyPlane />
    </Canvas>
  );
};
