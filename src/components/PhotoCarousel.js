import React, { useRef, Suspense, useState} from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import carousel1 from '../assets/cooper.jpg'
import carousel2 from '../assets/ewan.jpg'
import carousel3 from '../assets/holmgren.jpg'
import carousel4 from '../assets/kwok.jpg'
import carousel5 from '../assets/roachCelly.jpg'
import carousel6 from '../assets/stone.jpg'
import carousel7 from '../assets/tino.jpg'
import carousel8 from '../assets/tmoAura.jpg'
import '../styles/Carousel.css'

function PhotoPlane({ url, index, total, radius }) {
    const texture = useLoader(THREE.TextureLoader, url)
    const angle = (index / total) * Math.PI * 2
    texture.colorSpace = THREE.SRGBColorSpace
    
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius

    return (
        <mesh position={[x, 0, z]} rotation={[0, -angle + Math.PI / 2, 0]}>
            <planeGeometry args={[6, 4]} /> {/* Adjust width/height here */}
            <meshStandardMaterial 
                map={texture} 
                side={THREE.DoubleSide} 
                roughness={0.8}
                metalness={0}
                emissive={"white"} // The color of the glow
                emissiveIntensity={0.2} // How strong the glow is (0.1 to 0.5 is usually plenty)
                emissiveMap={texture} // This ensures the glow matches the photo
            />
        </mesh>
    )
}

function CarouselScene({ photos }) {
    const groupRef = useRef()
    const radius =8

    useFrame((state, delta) => {
        groupRef.current.rotation.y += delta * 0.15 // Adjust speed here
    })

    return (
        <group ref={groupRef}>
            {photos.map((url, i) => (
                <PhotoPlane key={i} url={url} index={i} total={photos.length} radius={radius} />
            ))}
        </group>
    )
}

function PhotoCarousel() {

    const [photos]=useState([carousel1, carousel2, carousel3, carousel4, carousel5, carousel6, carousel7, carousel8]);

    return (
        <div className="carousel-3d-container" style={{ width: '100%', height: '80vh', marginTop: '-20px' }}>
            <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
                <ambientLight intensity={1.5} /> {/* High ambient light to ensure nothing is pitch black */}
                
                {/* 1. The "Camera Flash" - Cranking intensity to 5000 */}

                
                {/* 2. Added a SpotLight for a specific "center-stage" beam */}
                <spotLight position={[0, 0, 25]} angle={0.3} penumbra={1} intensity={500} castShadow /> 

                <directionalLight 
                    position={[5, 5, 10]} 
                    intensity={3.5} 
                 />

                <Suspense fallback={null}>
                    <CarouselScene photos={photos} />
                </Suspense>
            </Canvas>
        </div>
    )
}

export default PhotoCarousel
