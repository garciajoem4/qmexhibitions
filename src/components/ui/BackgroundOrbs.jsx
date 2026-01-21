import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const BackgroundOrbs = () => {
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);

  useEffect(() => {
    // Animate orbs with GSAP for smoother animation
    const tl = gsap.timeline({ repeat: -1 });
    
    gsap.to(orb1Ref.current, {
      x: 50,
      y: -30,
      scale: 1.1,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to(orb2Ref.current, {
      x: -40,
      y: 40,
      scale: 0.9,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to(orb3Ref.current, {
      x: 30,
      y: 50,
      scale: 1.05,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gold Orb - Top Right */}
      <div
        ref={orb1Ref}
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.6) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      
      {/* Blue Orb - Bottom Left */}
      <div
        ref={orb2Ref}
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.6) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      
      {/* Copper Orb - Center */}
      <div
        ref={orb3Ref}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(184, 115, 51, 0.5) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  );
};

export default BackgroundOrbs;
