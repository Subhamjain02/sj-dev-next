"use client";

import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, useTexture } from '@react-three/drei';
import Image from 'next/image'
import Left from '../../public/left.svg'
import Right from '../../public/right.svg'
import './HeroSection.css'

const CarouselImage = ({ texture, angle, radius, index, scrollFactor, imageCount }) => {
  const ref = useRef();
  
  const adjustImageProperties = (image, transitionFactor) => {
    // Apply opacity smoothly
    const opacityFactor = 1.3 * transitionFactor;
    image.material.opacity = opacityFactor;
    image.material.transparent = true; // Ensure transparency is enabled
  };

  useFrame(() => {
    const x = radius * Math.cos((scrollFactor + index * (1 / imageCount)) * Math.PI * 2);
    const z = radius * Math.sin((scrollFactor + index * (1 / imageCount)) * Math.PI * 2);
    const y = -0.6 * Math.sin((scrollFactor + index * (1 / imageCount)) * Math.PI * 2);

    ref.current.position.set(x, y, z);

    // Calculate visibility based on scroll factor
    const startAppear = (imageCount - 1 - index) / imageCount; // When the image starts to appear
    const endAppear = (imageCount - index - 0.5) / imageCount; // When the image is fully visible
    const transitionFactor = Math.max(0, Math.min(1, (scrollFactor - startAppear) / (endAppear - startAppear)));

    // Calculate visibility based on angle
    const cameraAngle = Math.atan2(y, z - 1);
    const angleFactor = 1 - Math.abs(cameraAngle / (Math.PI / 2));

    // Combine both factors
    const finalTransitionFactor = transitionFactor * angleFactor;

    adjustImageProperties(ref.current, finalTransitionFactor);
  });

  return (
    <mesh ref={ref} position={[radius * Math.cos(angle), 0.5 * Math.sin(angle), radius * Math.sin(angle)]}>
      <planeGeometry args={[1.3, 1]} />
      <meshBasicMaterial map={texture} transparent={true} opacity={0} />
    </mesh>
  );
};

const Scene = ({ scrollFactor }) => {
  const logoRef = useRef();
  const { scene } = useGLTF('\logo.gltf');
  const texture = useTexture('\image2.jpg');
  const { camera } = useThree();

  useEffect(() => {
    camera.position.z = 4.5;
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
        <CarouselImage
          key={index}
          texture={texture}
          angle={(index / 8) * Math.PI * 2}
          radius={getResponsiveRadius()}
          index={index}
          scrollFactor={scrollFactor}
          imageCount={8}
        />
      ))}
      <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
    </>
  );
};

const getResponsiveRadius = () => {
  return Math.max(2, Math.min((window.innerWidth / 1700) * 3));
};

const HeroSection = () => {
  const [scrollFactor, setScrollFactor] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollFactor(window.scrollY / maxScroll);
    };

    window.addEventListener('scroll', handleScroll);

    const preventDefaultTouch = (event) => {
      event.preventDefault();
    };

    document.addEventListener('touchstart', preventDefaultTouch, { passive: false });
    document.addEventListener('touchmove', preventDefaultTouch, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('touchstart', preventDefaultTouch);
      document.removeEventListener('touchmove', preventDefaultTouch);
    };
  }, []);

  return (
    <div style={{ height: '200vh' }}>
      <Canvas
        style={{ display: 'block', position: 'fixed', top: 0, left: 0 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#71A274');
        }}
      >
        <Scene scrollFactor={scrollFactor} />
      </Canvas>
      <Image 
        src={Left}
        alt="Left Bottom" 
        style={{ position: 'fixed', bottom: '0', left: '0', width: '15rem', height:'17rem'  }}
        className='left'

      />
      <Image 
        src={Right}
        alt="Right Bottom" 
        style={{ position: 'fixed', bottom: '0', right: '0', width: '15rem'  }}
        className='right'
      />
    </div>
  );
};

export default HeroSection;
