"use client";

import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, useTexture } from '@react-three/drei';
import Image from 'next/image';
import Left from '../../public/left.svg';
import Right from '../../public/right.svg';
import Podium from '../../public/podium.png';
import './HeroSection.css';

const CarouselImage = ({ texture, angle, radius, index, scrollFactor, imageCount, url }) => {
  const ref = useRef();

  const adjustImageProperties = (image, transitionFactor) => {
    const opacityFactor = 1.3 * transitionFactor;
    image.material.opacity = opacityFactor;
    image.material.transparent = true;
  };

  const handleClick = () => {
    window.open(url, '_blank');
  };



  useFrame(() => {
    const x = radius * Math.cos((scrollFactor + index * (1 / imageCount)) * Math.PI * 2);
    const z = radius * Math.sin((scrollFactor + index * (1 / imageCount)) * Math.PI * 2);
    const y = -0.5 * Math.sin((scrollFactor + index * (1 / imageCount)) * Math.PI * 2);

    ref.current.position.set(x, y, z);

    const startAppear = (imageCount - 1 - index) / imageCount;
    const endAppear = (imageCount - index - 0.5) / imageCount;
    const transitionFactor = Math.max(0, Math.min(1, (scrollFactor - startAppear) / (endAppear - startAppear)));

    const cameraAngle = Math.atan2(y, z - 1);
    const angleFactor = 1 - Math.abs(cameraAngle / (Math.PI / 2));

    const finalTransitionFactor = transitionFactor * angleFactor;

    adjustImageProperties(ref.current, finalTransitionFactor);
    // ref.current.renderOrder = ref.current.position.z;

  });

  return (
    <mesh ref={ref} position={[radius * Math.cos(angle), 0.5 * Math.sin(angle), radius * Math.sin(angle)]} onClick={handleClick}>
      <planeGeometry args={[1.3, 1]} />
      <meshBasicMaterial map={texture} transparent={true} opacity={0} />
    </mesh>
  );
};

const Scene = ({ scrollFactor }) => {
  const logoRef = useRef();
  const { scene } = useGLTF('\logo.gltf');

  // last iamge will apppear first i.e, image8.jpg
  const textures = useTexture(['\image1.jpg', '\image2.jpg', '\image3.jpg', '\image4.jpg', '\image1.jpg', '\image2.jpg', '\image3.jpg', '\image4.jpg']); 
  const urls = [
    'https://youtu.be/H58vbez_m4E?si=P-BCmdaA9wTrRN55', // last image on the caraousel
    'https://youtu.be/H58vbez_m4E?si=P-BCmdaA9wTrRN55',
    'https://youtu.be/H58vbez_m4E?si=P-BCmdaA9wTrRN55',
    'https://youtu.be/H58vbez_m4E?si=P-BCmdaA9wTrRN55',
    'https://youtu.be/H58vbez_m4E?si=P-BCmdaA9wTrRN55',
    'https://youtu.be/H58vbez_m4E?si=P-BCmdaA9wTrRN55',
    'https://youtu.be/H58vbez_m4E?si=P-BCmdaA9wTrRN55',
    'https://www.youtube.com/watch?v=4DVDFxiZKCg' // 1st image on the caraousel
  ];
  const { camera } = useThree();

  const adjustLogoScale = () => {
    const scaleFactor = Math.min(window.innerWidth, window.innerHeight)/150;
    if (logoRef.current) {
      logoRef.current.scale.set(scaleFactor * 10, scaleFactor * 10, scaleFactor * 10);
    }
  };

  useEffect(() => {
    camera.position.z = 4.5;
    adjustLogoScale();
    window.addEventListener('resize', adjustLogoScale);

    return () => {
      window.removeEventListener('resize', adjustLogoScale);
    };
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
        <primitive object={scene} ref={logoRef} position={[0, 0, 0]} scale={[30, 30, 30]} />
      </Suspense>
      {textures.map((texture, index) => (
        <CarouselImage
          key={index}
          texture={texture}
          angle={(index / 8) * Math.PI * 2}
          radius={getResponsiveRadius()}
          index={index}
          scrollFactor={scrollFactor}
          imageCount={8}
          url={urls[index]}
        />
      ))}
      <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
    </>
  );
};

const getResponsiveRadius = () => {
  return Math.max(2, Math.min((window.innerWidth / 1700) * 2.9));
};

const HeroSection = () => {
  const [scrollFactor, setScrollFactor] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollFactor(window.scrollY / (maxScroll * 0.8));
    };

    window.addEventListener('scroll', handleScroll);

   
  }, []);

  return (
    <div style={{ height: '200vh', overflowY: 'scroll', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Canvas
        className='canvas'
        style={{ display: 'block', position: 'fixed', top: 0, left: 0}}
        onScroll={(e) => handleScroll(e)}
      >
        <Scene scrollFactor={scrollFactor} />
      </Canvas>
      {/* <Image
        src={Left}
        alt="Left Bottom"
        style={{ position: 'fixed', bottom: '0', left: '0', width: '15rem', height: '17rem' }}
        className="left"
        priority={true}
      />
      <Image
        src={Right}
        alt="Right Bottom"
        style={{ position: 'fixed', bottom: '0', right: '0', width: '15rem', height: 'auto' }}
        className="right"
        priority={true}
      /> */}
      <Image
        src={Podium}
        alt="Podium"
        className="position-fixed bottom-0 start-50 translate-middle-x"
        priority={true}
      />
      
      <div className="carousel-text text-white ms-4 text-wrap">
        <h4 >WELCOME TO SJ</h4>
        <p className='para'> Lorem ipsum dolor sit amet, consectetur adipiscing el  </p>
      </div>
      <small className='position-absolute top-50 start-50 ms-5 '> ↕ <span style={{color:'	#5990BA'}}>Scroll </span> <span className='text-white'> to</span> <span style={{color:'	#60B38F'}}>  view </span></small>
    </div>
  );
};

export default HeroSection;