import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, Torus } from '@react-three/drei';

function AnimatedShape({ position, color, shape, speed = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
    }
  });

  const ShapeComponent = shape === 'sphere' ? Sphere : shape === 'box' ? Box : Torus;

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <ShapeComponent ref={meshRef} position={position} args={[1, 32, 32]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </ShapeComponent>
    </Float>
  );
}

function ParticleField() {
  const particlesRef = useRef();
  const count = 100;
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        ],
        scale: Math.random() * 0.5 + 0.1
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position} scale={particle.scale}>
          <sphereGeometry args={[0.5, 8, 8]} />
          <meshBasicMaterial color="#FFC801" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 z-0 opacity-60">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF9932" />
        
        <ParticleField />
        
        <AnimatedShape 
          position={[-3, 1, -2]} 
          color="#FFC801" 
          shape="sphere" 
          speed={0.5}
        />
        <AnimatedShape 
          position={[3, -1, -3]} 
          color="#114C5A" 
          shape="box" 
          speed={0.7}
        />
        <AnimatedShape 
          position={[0, 2, -4]} 
          color="#FF9932" 
          shape="torus" 
          speed={0.6}
        />
        <AnimatedShape 
          position={[-2, -2, -2]} 
          color="#D9E8E2" 
          shape="sphere" 
          speed={0.4}
        />
      </Canvas>
    </div>
  );
}