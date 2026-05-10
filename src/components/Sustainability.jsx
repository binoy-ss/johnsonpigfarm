import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf, Truck, Recycle, Sun, ShieldCheck, Box } from 'lucide-react';
import introVideo from '../assets/1090x600.mp4';
import './Sustainability.css';

const steps = [
  { icon: Leaf, title: 'Food Waste Collection', desc: 'We partner with hotels, restaurants, and apartments to collect organic food waste — preventing it from ending up in landfills.' },
  { icon: Truck, title: 'Safe Transportation', desc: 'Collected waste is transported in sealed, hygienic vehicles to our processing facility — ensuring zero contamination.' },
  { icon: Recycle, title: 'Sustainable Processing', desc: 'Waste is scientifically processed into nutritious, safe feed — meeting the highest standards of animal nutrition.' },
  { icon: Sun, title: 'Farm Ecosystem', desc: 'Our pigs thrive in spacious, clean environments with natural ventilation, sunlight, and access to open pastures.' },
  { icon: ShieldCheck, title: 'Healthy Pig Farming', desc: 'Regular veterinary care, vaccinations, and balanced nutrition ensure our pigs are healthy and well-nourished.' },
  { icon: Box, title: 'Premium Delivery', desc: 'Fresh, premium-quality pork is delivered directly to hotels, restaurants, and homes — maintaining cold-chain integrity.' }
];

export default function Sustainability() {
  const targetRef = useRef(null);

  const { scrollYProgress: enterProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "start start"]
  });

  const imageY = useTransform(enterProgress, [0, 1], [150, 0]);
  const imageScale = useTransform(enterProgress, [0, 1], [0.85, 1]);

  return (
    <section ref={targetRef} id="our-story" className="sustainability-section">
      
      {/* Entry Video - Full width, 600px height, smoothly overlays Hero with parallax */}
      <motion.div style={{ width: '100%', height: '600px', position: 'relative', y: imageY, scale: imageScale, zIndex: 15 }}>
        {/* Cinematic dark overlay gradient at the top/bottom for blending */}
        <div className="video-overlay-gradient" />
        
        <video
          src={introVideo}
          autoPlay
          muted
          loop
          playsInline
          className="intro-video"
        />
      </motion.div>

      {/* Asymmetrical Floating Cards Section */}
      <div className="sustainability-cards-container">
        {steps.map((step, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={idx}
              className={`sus-card-wrapper ${isEven ? 'left' : 'right'}`}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="sus-card">
                <span className="sus-number">0{idx + 1}</span>
                
                <div className="sus-icon-wrapper">
                  <step.icon size={36} strokeWidth={1.5} />
                </div>
                
                <div className="sus-content">
                  <h3 className="sus-title">{step.title}</h3>
                  <p className="sus-desc">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
