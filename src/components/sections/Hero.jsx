import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const socialRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const [isContentVisible, setIsContentVisible] = useState(true);
  const idleTimerRef = useRef(null);
  const IDLE_TIMEOUT = 3000; // Hide content after 3 seconds of inactivity

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      href: 'https://www.linkedin.com/company/qmexhibitions/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    { 
      name: 'Facebook', 
      href: 'https://www.facebook.com/qmexhibitions/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
        </svg>
      )
    },
    { 
      name: 'Instagram', 
      href: 'https://www.instagram.com/qmexhibitions/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
  ];

  // Function to hide content
  const hideContent = useCallback(() => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        y: -80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.inOut',
      });
    }
    
    if (scrollIndicatorRef.current) {
      gsap.to(scrollIndicatorRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.inOut',
      });
    }

    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0.3,
        duration: 1.5,
        ease: 'power2.inOut',
      });
    }

    setIsContentVisible(false);
  }, []);

  // Function to show content
  const showContent = useCallback(() => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      });
    }
    
    if (scrollIndicatorRef.current) {
      gsap.to(scrollIndicatorRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      });
    }

    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      });
    }

    setIsContentVisible(true);
  }, []);

  // Reset idle timer
  const resetIdleTimer = useCallback(() => {
    // Clear existing timer
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    // Show content if hidden
    if (!isContentVisible) {
      showContent();
    }

    // Set new idle timer
    idleTimerRef.current = setTimeout(() => {
      hideContent();
    }, IDLE_TIMEOUT);
  }, [isContentVisible, showContent, hideContent]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation timeline
      const tl = gsap.timeline({ delay: 0.5 });

      tl.fromTo(
        titleRef.current,
        { y: 100, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
        { y: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.out' }
      )
      .fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        ctaRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(
        socialRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(
        scrollIndicatorRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
      );

      // Start idle timer after initial animation
      idleTimerRef.current = setTimeout(() => {
        hideContent();
      }, IDLE_TIMEOUT + 2000); // Extra delay for initial load

      // Parallax effect on scroll
      gsap.to(contentRef.current, {
        y: 150,
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Video parallax
      gsap.to(videoRef.current, {
        y: 100,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Scroll indicator bounce
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }, heroRef);

    return () => {
      ctx.revert();
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, [hideContent]);

  // Handle mouse move and scroll events
  useEffect(() => {
    const heroElement = heroRef.current;

    // Mouse move handler
    const handleMouseMove = () => {
      resetIdleTimer();
    };

    // Scroll handler
    const handleScroll = () => {
      resetIdleTimer();
    };

    // Touch handler
    const handleTouch = () => {
      resetIdleTimer();
    };

    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      heroElement.addEventListener('touchstart', handleTouch);
      heroElement.addEventListener('touchmove', handleTouch);
    }
    
    window.addEventListener('scroll', handleScroll);

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
        heroElement.removeEventListener('touchstart', handleTouch);
        heroElement.removeEventListener('touchmove', handleTouch);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [resetIdleTimer]);

  const handleScrollDown = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div ref={videoRef} className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="video-bg"
        >
          <source src="https://qmexhibitions.com/wp-content/uploads/2025/12/ascott-2025@atm-QMurphy-1.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay Gradients */}
        <div ref={overlayRef} className="absolute inset-0 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent" />
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 left-10 w-32 h-32 border border-white/5 rounded-full animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-10 w-48 h-48 border border-accent-gold/10 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-accent-gold/50 rounded-full animate-float" />
        <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-white/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
        {/* Subtitle */}
        <div ref={subtitleRef} className="mb-6">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass text-sm font-medium text-white/90">
            <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
            Events & Exhibitions Experts
          </span>
        </div>

        {/* Main Title */}
        <h1 ref={titleRef} className="font-display font-bold text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-8 leading-[1.1]">
          Bringing Your
          <br />
          <span className="text-gradient">Vision to Life</span>
        </h1>

        {/* Description */}
        <p ref={descRef} className="max-w-2xl mx-auto text-lg md:text-xl text-white/70 mb-10 leading-relaxed">
          QMurphy Exhibitions offers high-impact, innovative, and well-rounded designs and execution according to your needs and marketing goals with utmost professionalism and artistry.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" size="lg" href="#projects">
            View Our Work
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
          <Button variant="secondary" size="lg" href="#contact">
            Get In Touch
          </Button>
        </div>

        {/* Social Links */}
        <div ref={socialRef} className="flex justify-center gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-accent-gold hover:border-accent-gold/50 transition-all duration-300"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>

      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
        onClick={handleScrollDown}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/50 text-sm uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
            <div className="w-1.5 h-3 rounded-full bg-accent-gold animate-bounce" />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-[5]" />
    </section>
  );
};

export default Hero;
