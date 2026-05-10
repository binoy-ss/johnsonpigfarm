import React from 'react';
import { motion } from 'framer-motion';

const industries = [
  'Luxury Hotels', 'Restaurants', 'Resorts', 'Convention Centers', 
  'Apartments', 'Cafeterias', 'Bars & Pubs', 'Camps', 'Caterers', 'Retail Buyers'
];

export default function IndustriesServed() {
  return (
    <section id="industries" style={{ padding: '160px 0', overflow: 'hidden' }}>
      <div className="section-header">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label"
        >
          Who We Serve
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title text-gradient"
        >
          Industries We Partner With
        </motion.h2>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-track">
          {[...industries, ...industries, ...industries].map((item, idx) => (
            <div key={idx} className="marquee-item">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="marquee-wrapper reverse" style={{ marginTop: '32px' }}>
        <div className="marquee-track">
          {[
            'Food Waste Collection', 'Premium Pork', 'Sustainable Farming', 
            'Organic Recycling', 'Bulk Supply', 'Daily Delivery',
            'Food Waste Collection', 'Premium Pork', 'Sustainable Farming', 
            'Organic Recycling', 'Bulk Supply', 'Daily Delivery'
          ].map((item, idx) => (
            <div key={idx} className="marquee-item outline">
              {item}
            </div>
          ))}
        </div>
      </div>

      <style jsx="true">{`
        .marquee-wrapper {
          overflow: hidden;
          padding: 16px 0;
          position: relative;
        }
        .marquee-wrapper::before, .marquee-wrapper::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 200px;
          z-index: 2;
          pointer-events: none;
        }
        .marquee-wrapper::before {
          left: 0;
          background: linear-gradient(to right, var(--bg-base), transparent);
        }
        .marquee-wrapper::after {
          right: 0;
          background: linear-gradient(to left, var(--bg-base), transparent);
        }
        .marquee-track {
          display: flex;
          gap: 40px;
          animation: marquee 40s linear infinite;
          width: max-content;
        }
        .marquee-wrapper.reverse .marquee-track {
          animation: marqueeReverse 35s linear infinite;
        }
        .marquee-wrapper:hover .marquee-track {
          animation-play-state: paused;
        }
        .marquee-item {
          font-size: clamp(32px, 4vw, 56px);
          font-weight: 700;
          letter-spacing: -1.5px;
          white-space: nowrap;
          padding: 12px 32px;
          color: var(--white);
          transition: color 0.4s;
          cursor: default;
        }
        .marquee-item:hover {
          color: var(--electric-blue);
        }
        .marquee-item.outline {
          -webkit-text-stroke: 1px rgba(0,0,0,0.2);
          color: transparent;
          transition: all 0.4s;
        }
        .marquee-item.outline:hover {
          -webkit-text-stroke-color: var(--electric-blue);
          color: var(--electric-blue);
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-33.33% - 13px)); }
        }
        @keyframes marqueeReverse {
          0% { transform: translateX(calc(-50% - 20px)); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
