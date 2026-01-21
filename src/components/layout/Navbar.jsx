import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Button from '../ui/Button';
import Logo from '../../assets/images/QMurphy-Exhibitions-Logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate navbar on load
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );

    // Animate logo
    gsap.fromTo(
      logoRef.current,
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.8 }
    );

    // Animate nav links
    gsap.fromTo(
      linksRef.current,
      { y: -20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.5, 
        stagger: 0.1, 
        ease: 'power2.out',
        delay: 1 
      }
    );
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-nav-light py-3 shadow-lg'
          : 'glass-nav-light py-5'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            ref={logoRef}
            href="#home"
            className="flex items-center group"
            onClick={(e) => handleNavClick(e, '#home')}
          >
            <img 
              src={Logo} 
              alt="QMurphy Exhibitions" 
              className="h-12 md:h-14 w-auto transform group-hover:scale-105 transition-transform duration-300"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                ref={(el) => (linksRef.current[index] = el)}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative text-gray-700 hover:text-gray-900 font-medium transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-gold to-accent-copper group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              variant="primary"
              size="sm"
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="opacity-0 pointer-events-none"
            >
              Get Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-5">
              <span
                className={`absolute left-0 w-full h-0.5 bg-gray-800 transform transition-all duration-300 ${
                  isMobileMenuOpen ? 'top-2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-2 w-full h-0.5 bg-gray-800 transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 w-full h-0.5 bg-gray-800 transform transition-all duration-300 ${
                  isMobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 glass-nav-light shadow-lg transform transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-gray-700 hover:text-gray-900 font-medium text-lg py-2 transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
            <Button
              variant="primary"
              size="md"
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="mt-4 opacity-0 pointer-events-none"
            >
              Get Quote
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
