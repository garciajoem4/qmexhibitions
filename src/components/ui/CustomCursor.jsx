import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out',
      });
      
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 1.5,
        borderColor: 'rgba(212, 175, 55, 0.8)',
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        borderColor: 'rgba(212, 175, 55, 0.5)',
        duration: 0.3,
      });
    };

    window.addEventListener('mousemove', moveCursor);

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] w-10 h-10 -ml-5 -mt-5 rounded-full border-2 border-accent-gold/50 hidden md:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-[9999] w-2 h-2 -ml-1 -mt-1 rounded-full bg-accent-gold hidden md:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
};

export default CustomCursor;
