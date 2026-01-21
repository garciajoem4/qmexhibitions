/**
 * Application constants
 */

export const COMPANY_INFO = {
  name: 'QMurphy Exhibitions',
  shortName: 'QME',
  tagline: 'Events & Exhibitions Experts',
  description: 'QMurphy Exhibitions offer high-impact, innovative, and well-rounded designs and execution according to your needs and marketing goals with utmost professionalism and artistry.',
  address: 'Warehouse 8,9-6 19A St, Al Quoz, Industrial 4, Dubai',
  phone: '+971 4 289 9238',
  mobile: '+971 50 479 4600',
  email: 'info@qmurphyexhibitions.com',
  website: 'https://qmexhibitions.com',
};

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/company/qmexhibitions/',
  facebook: 'https://www.facebook.com/qmexhibitions/',
  instagram: 'https://www.instagram.com/qmexhibitions/',
};

export const NAVIGATION = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export const SERVICES = [
  {
    id: 'construction',
    title: 'Construction of Exhibitions Stand',
    description: 'Expert stand construction with meticulous attention to detail and quality.',
  },
  {
    id: 'design',
    title: 'Exhibit Stand Design',
    description: 'Innovative and captivating stand designs tailored to your vision.',
  },
  {
    id: 'modular',
    title: 'Modular Shell Design',
    description: 'Flexible and reusable modular solutions for any exhibition space.',
  },
  {
    id: 'upgraded',
    title: 'Upgraded System',
    description: 'State-of-the-art systems for enhanced exhibition experiences.',
  },
  {
    id: 'conference',
    title: 'Conference & Promotions',
    description: 'Complete conference and promotional event management.',
  },
  {
    id: 'interior',
    title: 'Interior Design & Production',
    description: 'Comprehensive interior design solutions for all environments.',
  },
  {
    id: 'graphics',
    title: 'Graphics',
    description: 'Indoor and outdoor graphic solutions and signage.',
  },
  {
    id: 'audiovisual',
    title: 'Audio Visual',
    description: 'Cutting-edge audio visual solutions and displays.',
  },
  {
    id: 'gifts',
    title: 'Gift Items',
    description: 'Custom promotional gift items and branded merchandise.',
  },
];

export const ANIMATION_DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 1,
};

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export default {
  COMPANY_INFO,
  SOCIAL_LINKS,
  NAVIGATION,
  SERVICES,
  ANIMATION_DURATION,
  BREAKPOINTS,
};
