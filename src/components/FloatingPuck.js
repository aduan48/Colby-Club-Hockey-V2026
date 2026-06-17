import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls } from '@react-three/drei';
import puckUrl from './finalPuck2.glb';
import '../styles/FloatingPuck.css'

/**
 * This is my puck object code. 
 * @returns A spinning puck that can be roatated with pointer events 
 */
function Puck() {
  const { scene } = useGLTF(puckUrl); //loads in the cutsom 3d puck
  const puckRef = useRef(); //3d puck objext

  /**
   * This constantly rotates the puck while there are no pointer events.
   * * Updates the puck's Y-axis rotation on every animation frame. The rotation 
   * speed is multiplied by the clock delta to ensure consistent, frame-rate 
   * independent animation across different monitor refresh rates (e.g., 60Hz vs 144Hz).
   * * @param {Object} state - The React Three Fiber state context containing clock, camera, and pointer data.
   * @param {number} delta - The execution time elapsed since the last frame in fractions of a second.
   */
  useFrame((state, delta) => {
    if (puckRef.current) {
      puckRef.current.rotation.y += delta * 1.5; 
    }
  });

  return <primitive ref={puckRef} object={scene} scale={1.5} />;
}

/**
 * This is the main landing page code.
 * @returns It takes the puck code above and then overlays it with a title text and a watch live button
 */
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

        {/* Rotating Puck Scene Background */}
        <Canvas dpr={[1, 2]} camera={{ position: [3.5, 12, 10], fov: 45 }} >
            <color attach="background" args={['#021a4a']} />
            <ambientLight intensity={10} color="white" />
            <spotLight position={[7, 7, 7]} angle={0.15} penumbra={1} intensity={1000}/>
            <pointLight position={[0, 2, 5]} intensity={500} color="#ffffff" />
            <directionalLight position={[0, 5, 10]} intensity={2} />
            
            {/* Allows for the puck object to have pointer event, dragging can move the camera angle */}
            <Suspense fallback={null}>
                <PresentationControls speed={1.5} global zoom={0.5} polar={[-0.1, Math.PI / 4]}>
                
                <Stage environment="city" intensity={0.5}>
                    <Puck />
                </Stage>

                </PresentationControls>
            </Suspense>
        </Canvas>
        </div>
  );
}

export default FloatingPuck;