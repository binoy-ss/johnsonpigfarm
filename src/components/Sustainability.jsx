import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf, Truck, Recycle, Sun, ShieldCheck, Box } from 'lucide-react';

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
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Transform horizontal scroll
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  return (
    <section ref={targetRef} id="our-story" style={{ height: '400vh', position: 'relative', background: 'var(--bg-base)' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        
        {/* Intro Text */}
        <motion.div 
          style={{ position: 'absolute', top: '160px', width: '100%', textAlign: 'center', opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
        >
          <span className="section-label">Our Ecosystem</span>
          <h2 className="section-title text-gradient">From Waste to Premium Pork</h2>
          <p className="section-desc">A sustainable cycle that transforms food waste into premium, ethically-raised pork — better for the planet, better for you.</p>
        </motion.div>

        {/* Horizontal Track */}
        <motion.div style={{ x, display: 'flex', gap: 0 }}>
          {/* Spacer to push panels past the center intro */}
          <div style={{ width: '100vw', flexShrink: 0 }} />
          
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              style={{
                width: '100vw', 
                height: '100vh', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '100px', 
                padding: '0 10vw', 
                flexShrink: 0,
                position: 'relative'
              }}
            >
              {/* Timeline Connector Line */}
              {idx !== steps.length - 1 && (
                <div style={{
                  position: 'absolute',
                  right: '-5vw',
                  top: '50%',
                  width: '10vw',
                  height: '1px',
                  background: 'linear-gradient(90deg, var(--electric-blue), transparent)'
                }} />
              )}

              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ margin: "-20%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '50%',
                  border: '1px solid var(--glass-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.03), rgba(255,255,255,0.01))',
                  backdropFilter: 'blur(24px)',
                  color: 'var(--electric-blue)',
                  boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.1), 0 20px 40px rgba(0,0,0,0.5)',
                  flexShrink: 0
                }}
              >
                <step.icon size={64} strokeWidth={1.5} />
              </motion.div>

              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ margin: "-20%" }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                style={{ maxWidth: '440px' }}
              >
                <span style={{ fontSize: '80px', fontWeight: 700, color: 'rgba(0,0,0,0.03)', lineHeight: 1, display: 'block', letterSpacing: '-2px' }}>
                  0{idx + 1}
                </span>
                <h3 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '16px', letterSpacing: '-0.5px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </motion.div>

            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
