import React, { useRef, useState, useEffect, useLayoutEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls } from '@react-three/drei';
import gsap from 'gsap';
import puckUrl from './finalPuck2-optimized.glb';
import '../styles/FloatingPuck.css';

// Kicks off the glb fetch as soon as this module is evaluated (i.e. as soon as the
// app bundle loads), instead of waiting for <Puck /> to mount. This registers with
// three's global LoadingManager, which is what App.js's useProgress() call reads
// from to know when the puck is actually ready.
useGLTF.preload(puckUrl);

/**
 * This is my puck object code.
 * @returns A spinning puck that can be roatated with pointer events
 */
function Puck() {
  const { scene } = useGLTF(puckUrl);
  const puckRef = useRef();

  useFrame((state, delta) => {
    if (puckRef.current) {
      puckRef.current.rotation.y += delta * 0.5;
    }
  });

  return <primitive ref={puckRef} object={scene} scale={1.5} />;
}


/**
 * This is the main landing page code.
 * @returns It takes the puck code above and then overlays it with a title text and a watch live button
 */
const FloatingPuck = () => {
    // Masks the canvas for its first 2.5s so the WebGL init / first-frame hitch (context
    // creation, environment texture upload, shader compile) happens behind a solid cover
    // instead of being visible as a stutter. Title/button stay visible the whole time since
    // they're layered above this via z-index.
    const [showCover, setShowCover] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowCover(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    const titleRef = useRef();
    const subtitleRef = useRef();
    const buttonRef = useRef();

    useLayoutEffect(() => {
        // gsap.context scopes the tweens to this component and gives us one revert() call
        // to clean everything up, so React StrictMode's double-invoke in dev doesn't leave
        // stray tweens or double-fire the animation.
        const ctx = gsap.context(() => {
            gsap.timeline({ defaults: { ease: 'power3.out' } })
                .from(titleRef.current, { y: 40, opacity: 0, duration: 0.8 })
                .from(subtitleRef.current, { y: 20, opacity: 0, duration: 0.6 }, '-=0.45')
                .from(buttonRef.current, { y: 20, opacity: 0, duration: 0.6 }, '-=0.3');
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="puck-container" id = 'puck-title'>
            {/* Top/Center Text */}
            <div className="puck-overlay-center">
                <h1 className="puck-title" ref={titleRef}>Colby Club Hockey</h1>
                <p className="puck-subtitle" ref={subtitleRef}>EST. 2022</p>
            </div>

            {/* Bottom Button Area */}
            <div className="puck-overlay-bottom" ref={buttonRef}>
                <a href="https://m.youtube.com/channel/UCOh41arhJiIw_XcnH0Oz4Dg/streams" className="watchLiveLink">
                     <button className="watch-live-btn">WATCH LIVE</button>
                </a>
            </div>

        {/* Rotating Puck Scene Background */}
        <Canvas dpr={[1, 1.5]} camera={{ position: [3.5, 12, 10], fov: 45 }} >
            <color attach="background" args={['#021a4a']} />

            {/* Allows for the puck object to have pointer event, dragging can move the camera angle */}
            <Suspense fallback={null}>
                <PresentationControls speed={1.5} global zoom={0.5} polar={[-0.1, Math.PI / 4]}>

                {/* Stage already sets up its own lighting rig, so the manual ambient/spot/point/
                    directional lights that used to be here were pure overhead (and were overexposing
                    the scene on top of it). shadows={false} drops Stage's contact-shadow render pass,
                    which was re-rendering an offscreen shadow texture every single frame. */}
                <Stage environment="city" intensity={0.5} shadows={false}>
                    <Puck />
                </Stage>

                </PresentationControls>
            </Suspense>
        </Canvas>

        <div className={`puck-cover${showCover ? '' : ' puck-cover-hidden'}`} />
        </div>
  );
}

export default FloatingPuck;