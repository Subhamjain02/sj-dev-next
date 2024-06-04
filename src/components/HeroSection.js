"use client";


import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, useTexture } from '@react-three/drei';

const CarouselImage = ({ texture, angle, radius, index, scrollFactor }) => {
  const ref = useRef();
  useFrame(() => {
    const x = radius * Math.cos((scrollFactor + index * (1 / 8)) * Math.PI * 2);
    const z = radius * Math.sin((scrollFactor + index * (1 / 8)) * Math.PI * 2);
    const y = -0.7 * Math.sin((scrollFactor + index * (1 / 8)) * Math.PI * 2);
    ref.current.position.set(x, y, z);
  });

  return (
    <mesh ref={ref} position={[radius * Math.cos(angle), 0.5 * Math.sin(angle), radius * Math.sin(angle)]}>
      <planeGeometry args={[1.3, 1]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

const Scene = ({ scrollFactor }) => {
  const logoRef = useRef();
  const { scene } = useGLTF('/logo.gltf');
  const texture = useTexture('/image2.jpg');
  const { camera } = useThree();

  useEffect(() => {
    camera.position.z = 5;
  }, [camera]);

  useFrame(() => {
    if (logoRef.current) {
      logoRef.current.rotation.y = -(scrollFactor * Math.PI * 3);
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight intensity={3.5} position={[5, 10, 7.5]} />
      <Suspense fallback={null}>
        <primitive object={scene} ref={logoRef} position={[0, 0, 0]} scale={[40, 40, 40]} />
      </Suspense>
      {Array.from({ length: 8 }).map((_, index) => (
        <CarouselImage key={index} texture={texture} angle={(index / 8) * Math.PI * 2} radius={2.5} index={index} scrollFactor={scrollFactor} />
      ))}
      <OrbitControls />
    </>
  );
};

const HeroSection = () => {
  const [scrollFactor, setScrollFactor] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollFactor(window.scrollY / maxScroll);
    };
    const handleWheel = (e) => {
      e.preventDefault(); // Prevent default zoom behavior
      handleScroll();
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleWheel, { passive: false }); // Add passive: false to ensure preventDefault works
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div style={{ height: '200vh'}}>
      <Canvas style={{ display: 'block', position: 'fixed', top: 0, left: 0}}>
        <Scene scrollFactor={scrollFactor} />
      </Canvas>
    </div>
  );
};

export default HeroSection;
