import React from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const stats = [
  { val: 100, unit: '%', label: 'Hygiene Standards', desc: 'FSSAI-compliant facilities with rigorous quality control at every stage.' },
  { val: 500, unit: '+', label: 'Happy Clients', desc: 'Hotels, restaurants, and families trust us for consistent, premium quality.' },
  { val: 50, unit: 'T', label: 'Waste Recycled Monthly', desc: 'Tonnes of food waste diverted from landfills every month.' },
  { val: 365, unit: 'Days', label: 'Fresh Supply', desc: 'Year-round uninterrupted supply of premium pork. No off-days.' }
];

const features = [
  'Eco-Friendly Operations', 'Trusted Supply Chain', 'Sustainable Farming', 
  'Reliable Daily Service', 'Cold-Chain Delivery', 'Veterinary Supervised'
];

function AnimatedCounter({ to }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / to));
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === to) clearInterval(timer);
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [inView, to]);

  return <span ref={ref}>{count}</span>;
}

export default function WhyChooseUs() {
  return (
    <section id="why-us" style={{ padding: '160px 48px', maxWidth: '1400px', margin: '0 auto' }}>
      <div className="section-header">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label"
        >
          Our Promise
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title text-gradient"
        >
          Why Choose Us
        </motion.h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginBottom: '80px' }}>
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            className="stat-card"
            style={{
              textAlign: 'center',
              padding: '56px 32px',
              borderRadius: '24px',
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--glass-border)',
              transition: 'all 0.6s var(--ease-out)',
              boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.05), 0 10px 30px rgba(0,0,0,0.5)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', marginBottom: '20px' }}>
              <h3 className="text-gradient-primary" style={{ fontSize: '72px', fontWeight: 700, lineHeight: 1, letterSpacing: '-2px', margin: 0 }}>
                <AnimatedCounter to={stat.val} />
              </h3>
              <span style={{ fontSize: '32px', fontWeight: 600, color: 'var(--text-secondary)', marginLeft: '4px' }}>
                {stat.unit}
              </span>
            </div>
            <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px', color: 'var(--text-primary)' }}>{stat.label}</h4>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{stat.desc}</p>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="feature-chip"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '15px',
              fontWeight: 400,
              color: 'var(--text-secondary)',
              padding: '14px 28px',
              borderRadius: '100px',
              background: 'rgba(0,0,0,0.03)',
              border: '1px solid rgba(0,0,0,0.08)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.4s var(--ease-out)'
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--electric-blue), var(--grass-green))' }} />
            {feature}
          </motion.div>
        ))}
      </div>

      <style jsx="true">{`
        .stat-card:hover {
          border-color: var(--grass-green) !important;
          transform: translateY(-8px);
          box-shadow: inset 0 1px 1px rgba(0,0,0,0.1), 0 30px 60px rgba(0,0,0,0.6), 0 0 40px var(--green-glow) !important;
        }
        .feature-chip:hover {
          border-color: rgba(0,0,0,0.2) !important;
          color: var(--white) !important;
          background: rgba(0,0,0,0.06) !important;
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
