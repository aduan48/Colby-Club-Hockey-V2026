import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls } from '@react-three/drei';
import puckUrl from './finalPuck2.glb';
import '../styles/FloatingPuck.css'

// 1. This is the 3D Object component
function Puck() {
    const { scene } = useGLTF(puckUrl);
  const puckRef = useRef();

  useFrame((state, delta) => {
    if (puckRef.current) {
      puckRef.current.rotation.y += delta * 1.5; 
    }
  });

  return <primitive ref={puckRef} object={scene} scale={1.5} />;
}

// 2. This is the Main Component you export to Home.js
const FloatingPuck = () => {
    return (
        <div className="puck-container" id = 'puck-title'>
            {/* Top/Center Text */}
            <div className="puck-overlay-center">
                <h1 className="puck-title">Colby Club Hockey</h1>
                <p className="puck-subtitle">EST. 2022</p>
            </div>

            {/* Bottom Button Area */}
            <div className="puck-overlay-bottom">
                <a href="https://m.youtube.com/channel/UCOh41arhJiIw_XcnH0Oz4Dg/streams" className="watchLiveLink">
                     <button className="watch-live-btn">WATCH LIVE</button>
                </a>
            </div>

        <Canvas dpr={[1, 2]} camera={{ position: [3.5, 12, 10], fov: 45 }} >
            <color attach="background" args={['#021a4a']} />
            <ambientLight intensity={10} color="white" />
            <spotLight position={[7, 7, 7]} angle={0.15} penumbra={1} intensity={1000}/>
            <pointLight position={[0, 2, 5]} intensity={500} color="#ffffff" />
            <directionalLight position={[0, 5, 10]} intensity={2} />
            
            <PresentationControls speed={1.5} global zoom={0.5} polar={[-0.1, Math.PI / 4]}>
            <Stage environment="city" intensity={0.5}>
                <Puck />
            </Stage>
            </PresentationControls>
        </Canvas>
        </div>
  );
}

export default FloatingPuck;