// import React, { useRef } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls, Sphere, MeshDistortMaterial, Environment, Float } from '@react-three/drei';
// import { Mesh } from 'three';
// import { useTheme } from './ThemeProvider';

// const AnimatedSphere: React.FC = () => {
//   const meshRef = useRef<Mesh>(null);
//   const { theme } = useTheme();

//   useFrame((state) => {
//     if (meshRef.current) {
//       meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
//       meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
//     }
//   });

//   return (
//     <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
//       <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.5}>
//         <MeshDistortMaterial
//           color={theme === 'dark' ? '#4f46e5' : '#6366f1'}
//           attach="material"
//           distort={0.4}
//           speed={2}
//           roughness={0.2}
//           metalness={0.8}
//         />
//       </Sphere>
//     </Float>
//   );
// };

// const ParticleField: React.FC = () => {
//   const points = useRef<Mesh>(null);
//   const { theme } = useTheme();

//   useFrame((state) => {
//     if (points.current) {
//       points.current.rotation.x = state.clock.elapsedTime * 0.05;
//       points.current.rotation.y = state.clock.elapsedTime * 0.075;
//     }
//   });

//   const particlesPosition = new Float32Array(2000 * 3);
//   for (let i = 0; i < 2000; i++) {
//     particlesPosition[i * 3] = (Math.random() - 0.5) * 20;
//     particlesPosition[i * 3 + 1] = (Math.random() - 0.5) * 20;
//     particlesPosition[i * 3 + 2] = (Math.random() - 0.5) * 20;
//   }

//   return (
//     <points ref={points}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={2000}
//           array={particlesPosition}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <pointsMaterial
//         color={theme === 'dark' ? '#8b5cf6' : '#3b82f6'}
//         size={0.02}
//         sizeAttenuation={true}
//       />
//     </points>
//   );
// };

// const Scene3D: React.FC = () => {
//   const { theme } = useTheme();

//   return (
//     <div className="absolute inset-0 -z-10">
//       <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
//         <ambientLight intensity={0.4} />
//         <pointLight position={[10, 10, 10]} intensity={1} />
//         <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
//         <AnimatedSphere />
//         <ParticleField />
        
//         <Environment preset={theme === 'dark' ? 'night' : 'dawn'} />
//         <OrbitControls 
//           enableZoom={false} 
//           enablePan={false} 
//           autoRotate 
//           autoRotateSpeed={0.5}
//         />
//       </Canvas>
//     </div>
//   );
// };

// export default Scene3D;


import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    
    for (let i = 0; i < 5000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
      ref.current.rotation.y = state.clock.elapsedTime * 0.075;
    }
  });

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8b5cf6"
        size={0.8}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
};

const FloatingGeometry: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#3b82f6"
        transparent
        opacity={0.3}
        wireframe
      />
    </mesh>
  );
};

const Scene3D: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <ParticleField />
        
        <FloatingGeometry position={[-15, 5, -10]} />
        <FloatingGeometry position={[15, -5, -15]} />
        <FloatingGeometry position={[0, 10, -20]} />
        
        <Sphere args={[50, 32, 32]} position={[0, 0, -50]}>
          <meshBasicMaterial
            color="#1e1b4b"
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </Sphere>
      </Canvas>
    </div>
  );
};

export default Scene3D;