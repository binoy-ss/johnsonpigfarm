import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > 500 && y > lastScroll);
      setLastScroll(y);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '0 48px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        background: scrolled ? 'rgba(255,255,255,0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent',
        transition: 'background 0.5s, backdrop-filter 0.5s, border-color 0.5s'
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        <a href="#" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/Jhonson Pig farm_logo.png" alt="Logo" style={{ height: '44px', width: '44px', objectFit: 'contain', borderRadius: '50%' }} />
        </a>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '40px' }} className="nav-links-desktop">
          {['Home', 'Our Story', 'Services', 'Why Us', 'Process', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              style={{
                fontSize: '13px',
                fontWeight: 400,
                color: 'var(--text-secondary)',
                letterSpacing: '0.3px',
                transition: 'color 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--white)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              {item}
            </a>
          ))}
        </div>

        <a 
          href="#contact"
          style={{
            fontSize: '13px',
            fontWeight: 600,
            padding: '10px 24px',
            borderRadius: '100px',
            background: 'var(--text-primary)',
            color: 'var(--bg-base)',
            letterSpacing: '0.5px',
            transition: 'all 0.3s'
          }}
          className="nav-cta-desktop"
        >
          Get Quote
        </a>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: 'none', color: 'var(--text-primary)' }}
          className="nav-mobile-toggle"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <style jsx="true">{`
        @media (max-width: 768px) {
          .nav-links-desktop, .nav-cta-desktop { display: none !important; }
          .nav-mobile-toggle { display: block !important; cursor: pointer; }
        }
      `}</style>
    </motion.nav>
  );
}
