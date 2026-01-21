import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../ui/SectionTitle';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Visit Us',
      content: 'Warehouse 8,9-6 19A St, Al Quoz, Industrial 4, Dubai',
      link: 'https://maps.google.com/?q=Al+Quoz+Industrial+4+Dubai',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Call Us',
      content: '+971 4 289 9238 / +971 50 479 4600',
      link: 'tel:+97142899238',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email Us',
      content: 'info@qmurphyexhibitions.com',
      link: 'mailto:info@qmurphyexhibitions.com',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.fromTo(
        '.contact-title',
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

      // Animate contact cards
      gsap.fromTo(
        '.contact-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.contact-cards',
            start: 'top 85%',
          },
        }
      );

      // Animate form
      gsap.fromTo(
        formRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
          },
        }
      );

      // Animate form inputs sequentially
      gsap.fromTo(
        '.form-field',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
    });
    setIsSubmitting(false);
    
    // Show success animation
    gsap.fromTo(
      '.success-message',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-gold/5 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Title */}
        <div className="contact-title">
          <SectionTitle
            subtitle="Get In Touch"
            title="Have Questions?"
            description="We will assist you with all your events, exhibitions, & interior fit outs. Our team is comprised of experts in carpentry, steel, electricity, graphics, fabrics, and logistics."
          />
        </div>

        {/* Contact Cards */}
        <div className="contact-cards grid md:grid-cols-3 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <a
              key={index}
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
            >
              <GlassCard className="p-8 text-center group" hover={true}>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-gold/20 to-accent-copper/20 flex items-center justify-center text-accent-gold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  {info.icon}
                </div>
                <h4 className="text-white font-display font-semibold text-lg mb-3">
                  {info.title}
                </h4>
                <p className="text-white/60 leading-relaxed">
                  {info.content}
                </p>
              </GlassCard>
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-4xl mx-auto">
          <GlassCard ref={formRef} className="p-8 lg:p-12">
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <div className="form-field">
                  <label htmlFor="name" className="block text-white/80 font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="glass-input w-full"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div className="form-field">
                  <label htmlFor="email" className="block text-white/80 font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="glass-input w-full"
                    placeholder="john@company.com"
                  />
                </div>

                {/* Phone */}
                <div className="form-field">
                  <label htmlFor="phone" className="block text-white/80 font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="glass-input w-full"
                    placeholder="+971 50 XXX XXXX"
                  />
                </div>

                {/* Company */}
                <div className="form-field">
                  <label htmlFor="company" className="block text-white/80 font-medium mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="glass-input w-full"
                    placeholder="Your Company"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="form-field mb-8">
                <label htmlFor="message" className="block text-white/80 font-medium mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="glass-input w-full resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className={isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loader w-5 h-5 mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </Button>

                <p className="text-white/50 text-sm">
                  We typically respond within 24 hours
                </p>
              </div>
            </form>

            {/* Success Message (hidden by default) */}
            <div className="success-message hidden absolute inset-0 bg-black/90 rounded-3xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-white/60">We'll get back to you soon.</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default Contact;
