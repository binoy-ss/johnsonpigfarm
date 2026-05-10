import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Hero from './components/Hero';
import Sustainability from './components/Sustainability';
import Services from './components/Services';
import FarmLandscape from './components/FarmLandscape';
import WhyChooseUs from './components/WhyChooseUs';
import IndustriesServed from './components/IndustriesServed';
import ProcessTimeline from './components/ProcessTimeline';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Navbar from './components/Navbar';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.5,
      smoothWheel: true,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Sustainability />
        <Services />
        <FarmLandscape />
        <WhyChooseUs />
        <IndustriesServed />
        <ProcessTimeline />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}

export default App;
