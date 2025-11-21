import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function IsometricCubes() {
  const groupRef = useRef<THREE.Group>(null);
  const lightRef1 = useRef<THREE.PointLight>(null);
  const lightRef2 = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
      // Floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }

    // Animated lights
    if (lightRef1.current) {
      lightRef1.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 3;
      lightRef1.current.position.y = Math.cos(state.clock.elapsedTime * 0.5) * 3;
    }
    if (lightRef2.current) {
      lightRef2.current.position.x = Math.cos(state.clock.elapsedTime * 0.7) * 3;
      lightRef2.current.position.z = Math.sin(state.clock.elapsedTime * 0.7) * 3;
    }
  });

  // Create three cubes in isometric arrangement
  const cubeSize = 0.8;
  const cubePositions = [
    [-0.7, -0.3, 0],
    [0.4, 0.5, 0],
    [0.4, -0.5, -0.3],
  ];

  return (
    <>
      <group ref={groupRef} rotation={[0.3, -0.5, 0]}>
        {cubePositions.map((position, index) => (
          <mesh key={index} position={position as [number, number, number]} castShadow receiveShadow>
            <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
            <meshPhysicalMaterial
              color="#4169e1"
              metalness={0.9}
              roughness={0.1}
              clearcoat={1}
              clearcoatRoughness={0.1}
              emissive="#2d5cb8"
              emissiveIntensity={0.3}
              envMapIntensity={1.5}
            />
          </mesh>
        ))}
        
        {/* Add connecting edges for visual interest */}
        {cubePositions.map((position, index) => (
          <lineSegments key={`edge-${index}`} position={position as [number, number, number]}>
            <edgesGeometry args={[new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)]} />
            <lineBasicMaterial color="#6b8cff" linewidth={2} />
          </lineSegments>
        ))}
      </group>

      {/* Dynamic point lights for realistic illumination */}
      <pointLight ref={lightRef1} position={[2, 2, 2]} intensity={2} color="#4169e1" distance={10} decay={2} />
      <pointLight ref={lightRef2} position={[-2, 2, 2]} intensity={2} color="#6b8cff" distance={10} decay={2} />
      <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={1} castShadow color="#ffffff" />
      <spotLight position={[-5, 5, 5]} angle={0.3} penumbra={1} intensity={0.5} castShadow color="#4169e1" />
    </>
  );
}

export const Logo3D = () => {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <hemisphereLight intensity={0.5} groundColor="#000000" color="#4169e1" />
        <IsometricCubes />
      </Canvas>
    </div>
  );
};
