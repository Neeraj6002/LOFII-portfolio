import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<any>();
  const sphere = random.inSphere(new Float32Array(2000), { radius: 1.5 }) as Float32Array;

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#4169e1"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

function HologramGrid() {
  const gridRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      gridRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={gridRef}>
      {/* Vertical hologram lines */}
      {Array.from({ length: 20 }).map((_, i) => (
        <line key={`v-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                -3 + i * 0.3, -3, 0,
                -3 + i * 0.3, 3, 0
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#4169e1" transparent opacity={0.15} />
        </line>
      ))}
      
      {/* Horizontal hologram lines */}
      {Array.from({ length: 20 }).map((_, i) => (
        <line key={`h-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                -3, -3 + i * 0.3, 0,
                3, -3 + i * 0.3, 0
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#4169e1" transparent opacity={0.15} />
        </line>
      ))}
    </group>
  );
}

function FloatingRings() {
  const ringsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      ringsRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={ringsRef}>
      {[1, 1.5, 2].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.02, 16, 100]} />
          <meshBasicMaterial color="#4169e1" transparent opacity={0.3 - i * 0.08} />
        </mesh>
      ))}
    </group>
  );
}

export const Hero3DBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 opacity-50">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleField />
        <HologramGrid />
        <FloatingRings />
      </Canvas>
    </div>
  );
};
