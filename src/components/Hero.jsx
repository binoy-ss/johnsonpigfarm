import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 90;
const FRAME_PATH = (i) => `/frames/frame-${String(i).padStart(3, '0')}.jpg`;

export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [frames, setFrames] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Preload frames
  useEffect(() => {
    let loadedCount = 0;
    const loadedFrames = [];
    
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setLoaded(true);
        }
      };
      loadedFrames.push(img);
    }
    setFrames(loadedFrames);
  }, []);

  // Draw frame function
  const drawFrame = (progress) => {
    if (!loaded || frames.length === 0 || !canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    const canvas = canvasRef.current;
    
    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const frameIndex = Math.min(
      Math.floor(progress * FRAME_COUNT),
      FRAME_COUNT - 1
    );
    
    const img = frames[frameIndex];
    if (!img) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Cover fit
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const w = img.width * scale;
    const h = img.height * scale;
    const x = (canvas.width - w) / 2;
    const y = (canvas.height - h) / 2;
    
    ctx.drawImage(img, x, y, w, h);
  };

  // Initial draw and resize handler
  useEffect(() => {
    if (loaded) {
      drawFrame(0);
      const handleResize = () => drawFrame(scrollYProgress.get());
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [loaded]);

  // Scrub frames on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    drawFrame(latest);
  });

  // Framer Motion Transforms
  const glassOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const glassY = useTransform(scrollYProgress, [0.1, 0.25], [60, 0]);
  const glassScale = useTransform(scrollYProgress, [0.1, 0.25], [0.94, 1]);
  const overlayOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 0.8]);

  return (
    <section 
      ref={containerRef} 
      style={{ height: '400vh', position: 'relative' }}
    >
      {/* Sticky Canvas Container */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <canvas 
          ref={canvasRef} 
          style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
        />
        
        {/* Darkening Overlay */}
        <motion.div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.8) 100%)',
            opacity: overlayOpacity,
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        {/* Content Container */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          pointerEvents: 'none'
        }}>
          
          {/* Ambient Light */}
          <motion.div style={{
            position: 'absolute',
            width: '60vw',
            height: '60vw',
            maxWidth: '800px',
            maxHeight: '800px',
            background: 'radial-gradient(circle, rgba(10,132,255,0.15) 0%, rgba(48,209,88,0.1) 40%, transparent 70%)',
            borderRadius: '50%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: -1,
            filter: 'blur(80px)',
            opacity: glassOpacity
          }} />

          {/* Glass Container */}
          <motion.div 
            style={{
              position: 'relative',
              width: 'min(720px, 90vw)',
              borderRadius: '24px',
              overflow: 'hidden',
              opacity: glassOpacity,
              y: glassY,
              scale: glassScale,
              pointerEvents: 'auto'
            }}
            className="glass-panel"
          >
            {/* Background Video */}
            <video 
              src="/Videos/cloud.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.12,
                mixBlendMode: 'screen'
              }}
            />
            
            {/* Glass Overlay Glow */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(10,132,255,0.05), rgba(48,209,88,0.05))',
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)'
            }} />

            {/* Inner Content */}
            <div style={{
              position: 'relative',
              padding: '56px 48px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px'
            }}>
              <img 
                src="/Jhonson Pig farm_logo.png" 
                alt="Logo" 
                style={{
                  width: '88px',
                  height: '88px',
                  objectFit: 'contain',
                  borderRadius: '50%',
                  marginBottom: '8px',
                  filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.5))'
                }} 
              />
              <h1 className="text-gradient" style={{
                fontSize: 'clamp(32px, 5vw, 56px)',
                fontWeight: 700,
                letterSpacing: '-1.5px',
                lineHeight: 1.05
              }}>
                Johnson Pig Farm
              </h1>
              <p style={{
                fontSize: 'clamp(15px, 2vw, 19px)',
                color: 'var(--text-secondary)',
                fontWeight: 400,
                letterSpacing: '0.5px'
              }}>
                Premium Pork · Sustainable Waste Solutions
              </p>
              
              <div style={{ display: 'flex', gap: '16px', marginTop: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href="#services" style={{
                  background: 'var(--text-primary)',
                  color: 'var(--bg-base)',
                  padding: '16px 36px',
                  borderRadius: '100px',
                  fontWeight: 500,
                  fontSize: '15px',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
                  transition: 'transform 0.3s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Explore Services
                </a>
                <a href="#contact" style={{
                  background: 'rgba(0,0,0,0.03)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(0,0,0,0.15)',
                  color: 'var(--text-primary)',
                  padding: '16px 36px',
                  borderRadius: '100px',
                  fontWeight: 500,
                  fontSize: '15px',
                  transition: 'transform 0.3s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
