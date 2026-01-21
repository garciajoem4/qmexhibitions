import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../ui/SectionTitle';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef(null);

  const stats = [
    { number: '15+', label: 'Years Experience' },
    { number: '500+', label: 'Projects Completed' },
    { number: '100+', label: 'Happy Clients' },
    { number: '50+', label: 'Team Members' },
  ];

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Innovative Designs',
      description: 'Creative solutions tailored to your brand identity and marketing goals.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: 'Quality Craftsmanship',
      description: 'In-house production ensuring the highest quality at the best prices.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Expert Team',
      description: 'Highly-skilled engineers, designers, and project managers at your service.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.fromTo(
        '.about-title',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Parallax image effect
      gsap.fromTo(
        imageRef.current,
        { y: 100, scale: 0.95, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
          },
        }
      );

      // Animate features
      gsap.fromTo(
        '.about-feature',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.about-features',
            start: 'top 80%',
          },
        }
      );

      // Animate stats
      gsap.fromTo(
        '.stat-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
          },
        }
      );

      // Counter animation for stats
      const statNumbers = document.querySelectorAll('.stat-number');
      statNumbers.forEach((stat) => {
        const finalValue = stat.getAttribute('data-value');
        const numericValue = parseInt(finalValue);
        
        gsap.fromTo(
          stat,
          { textContent: 0 },
          {
            textContent: numericValue,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: stat,
              start: 'top 85%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Title */}
        <div className="about-title">
          <SectionTitle
            subtitle="Who We Are"
            title="Events & Exhibitions Experts"
            description="QMurphy Exhibitions offer high-impact, innovative, and well-rounded designs and execution according to your needs and marketing goals with utmost professionalism and artistry."
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image Side */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src="https://qmexhibitions.com/wp-content/uploads/2025/12/who-we-are-min-768x512-1.webp"
                alt="Exhibitions stand design & fabrication"
                className="w-full h-[500px] object-cover"
              />
              {/* Glass overlay card */}
              <div className="absolute bottom-6 left-6 right-6">
                <GlassCard className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-gold to-accent-copper flex items-center justify-center flex-shrink-0">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-display font-semibold text-lg">In-House Production</h4>
                      <p className="text-white/60 text-sm">Highest quality at the best price</p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-64 h-64 border border-accent-gold/20 rounded-3xl -z-10" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 border border-white/10 rounded-3xl -z-10" />
          </div>

          {/* Content Side */}
          <div>
            <div className="about-features space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="about-feature flex items-start gap-5 p-4 rounded-2xl hover:bg-white/5 transition-colors duration-300"
                >
                  <div className="w-14 h-14 rounded-xl glass flex items-center justify-center flex-shrink-0 text-accent-gold">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-display font-semibold text-lg mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-white/60 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button variant="primary" href="#services">
                Explore Our Services
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <GlassCard
              key={index}
              className="stat-item p-8 text-center"
              hover={true}
            >
              <div
                className="stat-number text-4xl lg:text-5xl font-display font-bold text-gradient mb-2"
                data-value={parseInt(stat.number)}
              >
                {parseInt(stat.number)}
              </div>
              <span className="text-4xl lg:text-5xl font-display font-bold text-gradient">+</span>
              <p className="text-white/60 font-medium mt-2">{stat.label}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
