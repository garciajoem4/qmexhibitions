import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import BackgroundOrbs from './components/ui/BackgroundOrbs';
import CustomCursor from './components/ui/CustomCursor';

// Pages
import DesignPage from './pages/DesignPage';
import ExhibitionPage from './pages/ExhibitionPage';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* Design Page Route */}
        <Route path="/designs/:slug" element={<DesignPage />} />

        {/* Exhibition Page Route */}
        <Route path="/exhibitions/:slug" element={<ExhibitionPage />} />

        {/* Home Page */}
        <Route
          path="/"
          element={
            <div className="relative min-h-screen overflow-hidden">
              {/* Background Elements */}
              <BackgroundOrbs />
              
              {/* Custom Cursor */}
              <CustomCursor />
              
              {/* Navigation */}
              <Navbar />
              
              {/* Main Content */}
              <main>
                <Hero />
                <About />
                <Services />
                <Projects />
                <Contact />
              </main>
              
              {/* Footer */}
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
