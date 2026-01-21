import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../ui/Button';
import HeroVideo from '../../assets/video/qmurphy-hero-video.mp4';

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
  const scrollIndicatorRef = useRef(null);
  const [isContentVisible, setIsContentVisible] = useState(true);
  const idleTimerRef = useRef(null);
  const IDLE_TIMEOUT = 3000; // Hide content after 3 seconds of inactivity

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
          <source src={HeroVideo} type="video/mp4" />
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
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
