import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = `Hi Johnson Pig Farm!%0A%0AName: ${formData.get('name')}%0AEmail: ${formData.get('email')}%0AService: ${formData.get('service')}%0AMessage: ${formData.get('message')}`;
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <section id="contact" style={{ padding: '160px 48px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', marginBottom: '64px' }} className="contact-grid">
        
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label" style={{ marginBottom: '16px', textAlign: 'left' }}>Get Started</span>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, letterSpacing: '-1px', marginBottom: '20px' }} className="text-gradient">
            Let's Work Together
          </h2>
          <p style={{ fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '40px' }}>
            Whether you need premium pork supply or professional waste management — we're here to help.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { icon: Mail, text: 'info@johnsonpigfarm.com' },
              { icon: Phone, text: '+91 98765 43210' },
              { icon: MapPin, text: 'Thrissur, Kerala, India' }
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '16px', color: 'var(--text-secondary)' }}>
                <item.icon size={24} color="var(--electric-blue)" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          className="contact-form"
        >
          <input name="name" type="text" placeholder="Your Name" required className="form-input" />
          <input name="email" type="email" placeholder="Email Address" required className="form-input" />
          <select name="service" required className="form-input" defaultValue="">
            <option value="" disabled>Select Service</option>
            <option value="Food Waste Collection">Food Waste Collection</option>
            <option value="Premium Pork Supply">Premium Pork Supply</option>
            <option value="Bulk Meat Order">Bulk Meat Order</option>
            <option value="Both Services">Both Services</option>
          </select>
          <textarea name="message" placeholder="Tell us about your requirements" rows={4} className="form-input" style={{ resize: 'vertical', minHeight: '120px' }} />
          <button type="submit" style={{
            background: 'var(--text-primary)',
            color: 'var(--bg-base)',
            padding: '16px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'transform 0.3s, box-shadow 0.3s'
          }}
          onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)'; }}
          onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            Send Inquiry
          </button>
        </motion.form>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}
      >
        <iframe 
          title="Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d250710.0!2d76.1!3d10.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ee15a44a4355%3A0x8e11e2f2e4e6e0a0!2sThrissur%2C%20Kerala!5e0!3m2!1sen!2sin!4v1" 
          width="100%" 
          height="400" 
          style={{ border: 0, display: 'block' }} 
          allowFullScreen 
          loading="lazy" 
        />
      </motion.div>

      <style jsx="true">{`
        .form-input {
          width: 100%;
          padding: 16px 20px;
          border-radius: 12px;
          background: rgba(0,0,0,0.03);
          border: 1px solid rgba(0,0,0,0.08);
          color: var(--white);
          font-size: 16px;
          transition: all 0.3s;
        }
        .form-input:focus {
          border-color: var(--electric-blue);
          box-shadow: 0 0 0 3px rgba(10,132,255,0.2);
          background: rgba(0,0,0,0.06);
        }
        .form-input::placeholder {
          color: rgba(0,0,0,0.3);
        }
        select.form-input option {
          background: var(--bg-base);
          color: var(--white);
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
