import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    stars: '★★★★★',
    quote: '"Johnson Pig Farm transformed our waste management. Their reliability and professionalism is unmatched."',
    author: 'Grand Hyatt Kerala',
    role: 'Hotel Partner'
  },
  {
    stars: '★★★★★',
    quote: '"The freshest pork we\'ve ever sourced. Our guests can taste the difference. Consistent quality every single day."',
    author: 'Chef Rajan Menon',
    role: 'Executive Chef, Le Meridien'
  },
  {
    stars: '★★★★★',
    quote: '"Sustainable, ethical, and premium. They handle our apartment complex waste perfectly. Zero complaints from residents."',
    author: 'Skyline Apartments',
    role: 'Residential Complex'
  },
  {
    stars: '★★★★★',
    quote: '"Bulk ordering is seamless. They meet our weekly demand for 200+ kg without fail. The cold-chain is impeccable."',
    author: 'Kerala Caterers Association',
    role: 'Bulk Buyer'
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ padding: '160px 0', overflow: 'hidden' }}>
      <div className="section-header">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label"
        >
          What They Say
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title text-gradient"
        >
          Trusted by Industry Leaders
        </motion.h2>
      </div>

      <div style={{ padding: '0 48px' }}>
        <div className="testimonials-track" style={{ display: 'flex', gap: '32px', width: 'max-content' }}>
          {/* Double array for infinite seamless scrolling effect via CSS animation */}
          {[...testimonials, ...testimonials].map((t, idx) => (
            <div 
              key={idx}
              className="testimonial-card"
              style={{
                minWidth: '440px',
                maxWidth: '440px',
                padding: '48px',
                borderRadius: '24px',
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid var(--glass-border)',
                transition: 'all 0.6s var(--ease-out)',
                boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.05), 0 20px 40px rgba(0,0,0,0.3)',
                cursor: 'pointer'
              }}
            >
              <div style={{ color: 'var(--text-primary)', fontSize: '18px', marginBottom: '20px', letterSpacing: '4px' }}>
                {t.stars}
              </div>
              <p style={{ fontSize: '17px', lineHeight: 1.6, color: 'var(--text-primary)', marginBottom: '32px', fontWeight: 400 }}>
                {t.quote}
              </p>
              <div>
                <strong style={{ display: 'block', fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {t.author}
                </strong>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  {t.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx="true">{`
        .testimonials-track {
          animation: testimonialScroll 40s linear infinite;
        }
        .testimonials-track:hover {
          animation-play-state: paused;
        }
        .testimonial-card:hover {
          border-color: rgba(0,0,0,0.2) !important;
          transform: translateY(-8px);
          box-shadow: inset 0 1px 1px rgba(0,0,0,0.1), 0 30px 60px rgba(0,0,0,0.5) !important;
        }
        @keyframes testimonialScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
