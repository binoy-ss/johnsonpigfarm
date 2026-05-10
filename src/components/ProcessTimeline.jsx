import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const timelineData = [
  { step: 'Step 01', title: 'Partner & Schedule', desc: 'We assess your waste volume, set up collection schedules, and provide sealed containers for hygienic storage.' },
  { step: 'Step 02', title: 'Collect & Transport', desc: 'Our fleet picks up waste on schedule. GPS-tracked vehicles ensure transparency and reliability.' },
  { step: 'Step 03', title: 'Process & Nourish', desc: 'Waste is processed into balanced feed at our facility. Our pigs are raised with care on nutritious, safe feed.' },
  { step: 'Step 04', title: 'Deliver Premium Pork', desc: 'Fresh, high-quality pork is processed under strict hygiene standards and delivered to your doorstep.' }
];

function TimelineItem({ item, index, progress }) {
  const thresholdStart = index * 0.25;
  const thresholdEnd = (index + 1) * 0.25;

  // Calculate local progress for this item
  const localProgress = useTransform(progress, [thresholdStart, thresholdEnd], [0, 1]);
  
  // Transform values based on local progress
  const isActive = useTransform(localProgress, value => value > 0.5);
  const dotScale = useTransform(localProgress, [0, 0.5, 1], [1, 1.5, 1]);
  const dotColor = useTransform(localProgress, [0, 0.5], ['var(--bg-base)', 'var(--white)']);
  const dotBorder = useTransform(localProgress, [0, 0.5], ['rgba(0,0,0,0.2)', 'var(--electric-blue)']);
  const dotShadow = useTransform(localProgress, [0, 0.5], ['none', '0 0 20px rgba(10,132,255,0.4), 0 0 0 6px rgba(10,132,255,0.1)']);

  const textColor = useTransform(localProgress, [0.3, 0.6], ['rgba(0,0,0,0.4)', 'var(--white)']);
  const pOpacity = useTransform(localProgress, [0.3, 0.6], [0.6, 1]);

  return (
    <div style={{ position: 'relative', padding: '0 0 80px 48px' }}>
      <motion.div 
        style={{
          position: 'absolute',
          left: '-55px',
          top: '8px',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          borderStyle: 'solid',
          borderWidth: '2px',
          borderColor: dotBorder,
          backgroundColor: dotColor,
          scale: dotScale,
          boxShadow: dotShadow,
          zIndex: 1,
          boxSizing: 'content-box'
        }}
      />
      <motion.span style={{
        fontSize: '12px',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: isActive ? 'var(--electric-blue)' : 'var(--text-secondary)',
        fontWeight: 600,
        marginBottom: '12px',
        display: 'block'
      }}>
        {item.step}
      </motion.span>
      <motion.h3 style={{
        fontSize: '28px',
        fontWeight: 600,
        marginBottom: '12px',
        letterSpacing: '-0.5px',
        color: textColor
      }}>
        {item.title}
      </motion.h3>
      <motion.p style={{
        fontSize: '17px',
        color: 'var(--text-secondary)',
        lineHeight: 1.6,
        opacity: pOpacity,
        maxWidth: '600px'
      }}>
        {item.desc}
      </motion.p>
    </div>
  );
}

export default function ProcessTimeline() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" style={{ padding: '160px 48px', maxWidth: '1000px', margin: '0 auto' }}>
      <div className="section-header">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label"
        >
          How It Works
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title text-gradient"
        >
          Our Process
        </motion.h2>
      </div>

      <div ref={containerRef} style={{ position: 'relative', paddingLeft: '64px' }}>
        {/* Background Line */}
        <div style={{ position: 'absolute', left: '15px', top: 0, bottom: 0, width: '2px', background: 'rgba(0,0,0,0.08)' }} />
        
        {/* Progress Line */}
        <motion.div style={{
          position: 'absolute',
          left: '15px',
          top: 0,
          width: '2px',
          height: lineHeight,
          background: 'linear-gradient(to bottom, var(--electric-blue), var(--grass-green))'
        }} />

        {timelineData.map((item, idx) => (
          <TimelineItem key={idx} item={item} index={idx} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
