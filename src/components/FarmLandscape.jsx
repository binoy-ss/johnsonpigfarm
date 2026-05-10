import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import farmLandscape from '../assets/Johnson pig farm.png';
import './FarmLandscape.css';

export default function FarmLandscape() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth subtle parallax movement on scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section className="farm-landscape-section" ref={containerRef}>
      <motion.div 
        className="farm-landscape-container"
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.img 
          src={farmLandscape} 
          alt="Sustainable Farming Landscape" 
          className="farm-image"
          style={{ y: imageY }}
        />
        
        <div className="farm-overlay-gradient" />

        <div className="farm-content">
          <motion.span 
            className="farm-label"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            SUSTAINABLE FARMING
          </motion.span>
          
          <motion.h2 
            className="farm-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Ethically Raised. Naturally Nourished.
          </motion.h2>
          
          <motion.p 
            className="farm-desc"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            From responsible food recycling to healthy open-field farming, every step is built around sustainability and premium quality.
          </motion.p>
          
          <motion.button 
            className="farm-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Explore Our Farm
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
