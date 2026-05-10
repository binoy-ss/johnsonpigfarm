import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Hotel, Tent, Utensils, Clock, Package } from 'lucide-react';

const services = [
  { icon: Building2, title: 'Apartment Waste Collection', desc: 'Scheduled organic waste pickup for residential apartments and housing complexes with zero hassle.' },
  { icon: Hotel, title: 'Hotel Waste Management', desc: 'Comprehensive food waste management for luxury hotels — daily collection, sealed transport, and compliance reports.' },
  { icon: Tent, title: 'Convention Center Collection', desc: 'On-demand and scheduled waste collection for convention centers, event halls, and large gatherings.' },
  { icon: Utensils, title: 'Premium Pork Supply', desc: 'Farm-fresh, premium-quality pork cuts delivered to hotels, restaurants, and retail customers daily.' },
  { icon: Clock, title: 'Fresh Daily Delivery', desc: 'Same-day delivery ensuring maximum freshness. Cold-chain maintained from farm to your kitchen.' },
  { icon: Package, title: 'Bulk Meat Supply', desc: 'Competitive bulk pricing for camps, resorts, caterers, and large-scale buyers with reliable weekly supply.' }
];

function ServiceCard({ service, index }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.4 } }}
      style={{
        position: 'relative',
        padding: '48px 40px',
        borderRadius: '24px',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid var(--glass-border)',
        overflow: 'hidden',
        cursor: 'default',
        boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.05), 0 10px 30px rgba(0,0,0,0.5)',
      }}
      className="group"
    >
      {/* Mouse Glow */}
      <div 
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--blue-glow), transparent 60%)',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.6s',
          transform: `translate(calc(${mousePosition.x}px - 50%), calc(${mousePosition.y}px - 50%))`,
          zIndex: 0,
        }}
        className="card-glow"
      />

      <motion.div 
        style={{
          width: '56px',
          height: '56px',
          marginBottom: '32px',
          color: 'var(--text-primary)',
          position: 'relative',
          zIndex: 1,
        }}
        className="card-icon"
      >
        <service.icon size={56} strokeWidth={1.5} />
      </motion.div>

      <h3 style={{
        fontSize: '22px',
        fontWeight: 600,
        marginBottom: '16px',
        letterSpacing: '-0.3px',
        position: 'relative',
        zIndex: 1,
      }}>
        {service.title}
      </h3>
      <p style={{
        fontSize: '16px',
        color: 'var(--text-secondary)',
        lineHeight: 1.6,
        position: 'relative',
        zIndex: 1,
      }}>
        {service.desc}
      </p>

      {/* Global CSS for hover state overrides since inline hover is tricky for children */}
      <style jsx="true">{`
        .group:hover {
          border-color: rgba(0,0,0,0.2) !important;
          box-shadow: inset 0 1px 1px rgba(0,0,0,0.1), 0 30px 60px rgba(0,0,0,0.6) !important;
        }
        .group:hover .card-glow {
          opacity: 1 !important;
        }
        .group:hover .card-icon {
          transform: scale(1.1);
          color: var(--electric-blue) !important;
        }
      `}</style>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" style={{ padding: '160px 48px 80px 48px', maxWidth: '1400px', margin: '0 auto' }}>
      <div className="section-header">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-label"
        >
          What We Offer
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="section-title text-gradient"
        >
          Our Services
        </motion.h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
        {services.map((service, idx) => (
          <ServiceCard key={idx} service={service} index={idx} />
        ))}
      </div>
    </section>
  );
}
