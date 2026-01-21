import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animation utility functions for consistent animations across the app
 */

// Fade in from bottom animation
export const fadeInUp = (element, options = {}) => {
  const { delay = 0, duration = 0.8, y = 60 } = options;
  
  return gsap.fromTo(
    element,
    { y, opacity: 0 },
    { 
      y: 0, 
      opacity: 1, 
      duration, 
      delay,
      ease: 'power3.out',
    }
  );
};

// Fade in from left animation
export const fadeInLeft = (element, options = {}) => {
  const { delay = 0, duration = 0.8, x = -60 } = options;
  
  return gsap.fromTo(
    element,
    { x, opacity: 0 },
    { 
      x: 0, 
      opacity: 1, 
      duration, 
      delay,
      ease: 'power3.out',
    }
  );
};

// Fade in from right animation
export const fadeInRight = (element, options = {}) => {
  const { delay = 0, duration = 0.8, x = 60 } = options;
  
  return gsap.fromTo(
    element,
    { x, opacity: 0 },
    { 
      x: 0, 
      opacity: 1, 
      duration, 
      delay,
      ease: 'power3.out',
    }
  );
};

// Scale up animation
export const scaleUp = (element, options = {}) => {
  const { delay = 0, duration = 0.6, scale = 0.9 } = options;
  
  return gsap.fromTo(
    element,
    { scale, opacity: 0 },
    { 
      scale: 1, 
      opacity: 1, 
      duration, 
      delay,
      ease: 'back.out(1.7)',
    }
  );
};

// Stagger animation for multiple elements
export const staggerFadeIn = (elements, options = {}) => {
  const { delay = 0, duration = 0.6, stagger = 0.1, y = 40 } = options;
  
  return gsap.fromTo(
    elements,
    { y, opacity: 0 },
    { 
      y: 0, 
      opacity: 1, 
      duration, 
      delay,
      stagger,
      ease: 'power2.out',
    }
  );
};

// Parallax scroll animation
export const parallaxScroll = (element, options = {}) => {
  const { y = 100, trigger, start = 'top bottom', end = 'bottom top' } = options;
  
  return gsap.to(element, {
    y,
    ease: 'none',
    scrollTrigger: {
      trigger: trigger || element,
      start,
      end,
      scrub: 1,
    },
  });
};

// Text reveal animation (character by character)
export const textReveal = (element, options = {}) => {
  const { delay = 0, duration = 0.05, stagger = 0.02 } = options;
  
  // Split text into characters
  const text = element.textContent;
  element.innerHTML = text
    .split('')
    .map((char) => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`)
    .join('');

  const chars = element.querySelectorAll('.char');
  
  return gsap.fromTo(
    chars,
    { y: 50, opacity: 0 },
    { 
      y: 0, 
      opacity: 1, 
      duration, 
      delay,
      stagger,
      ease: 'power2.out',
    }
  );
};

// Magnetic hover effect
export const magneticHover = (element, strength = 0.3) => {
  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Create scroll-triggered animation
export const scrollTriggerAnimation = (element, animation, options = {}) => {
  const { start = 'top 80%', toggleActions = 'play none none reverse' } = options;
  
  return gsap.fromTo(
    element,
    animation.from,
    {
      ...animation.to,
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions,
      },
    }
  );
};

export default {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleUp,
  staggerFadeIn,
  parallaxScroll,
  textReveal,
  magneticHover,
  scrollTriggerAnimation,
};
