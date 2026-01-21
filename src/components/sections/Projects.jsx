import { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../ui/SectionTitle';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';
import { designProjects, getDesignFeaturedImage } from '../../data/designs';
import { exhibitionProjects, getExhibitionFeaturedImage } from '../../data/exhibitions';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [designImages, setDesignImages] = useState({});
  const [exhibitionImages, setExhibitionImages] = useState({});
  const [showAllProjects, setShowAllProjects] = useState(false);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'exhibitions', label: 'Exhibitions' },
    { id: 'designs', label: 'Designs' },
  ];

  // Load design featured images
  useEffect(() => {
    const loadDesignImages = () => {
      const images = {};
      designProjects.forEach((design) => {
        images[design.id] = getDesignFeaturedImage(design.folder);
      });
      setDesignImages(images);
    };

    loadDesignImages();
  }, []);

  // Load exhibition featured images
  useEffect(() => {
    const loadExhibitionImages = () => {
      const images = {};
      exhibitionProjects.forEach((exhibition) => {
        images[exhibition.id] = getExhibitionFeaturedImage(exhibition.folder);
      });
      setExhibitionImages(images);
    };

    loadExhibitionImages();
  }, []);

  // Combine all projects
  const allProjects = useMemo(() => {
    const exhibitions = exhibitionProjects.map((exhibition) => ({
      id: exhibition.id,
      title: exhibition.title,
      category: 'exhibitions',
      image: exhibitionImages[exhibition.id],
      slug: exhibition.slug,
      isExternal: false,
    }));

    const designs = designProjects.map((design) => ({
      id: design.id,
      title: design.title,
      category: 'designs',
      image: designImages[design.id],
      slug: design.slug,
      isExternal: false,
    }));

    return [...exhibitions, ...designs];
  }, [designImages, exhibitionImages]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') {
      if (showAllProjects) {
        // Show all projects when expanded
        return allProjects;
      }
      // Show only 4 exhibitions and 4 designs
      const exhibitions = allProjects.filter(p => p.category === 'exhibitions').slice(0, 4);
      const designs = allProjects.filter(p => p.category === 'designs').slice(0, 4);
      return [...exhibitions, ...designs];
    }
    return allProjects.filter(p => p.category === activeCategory);
  }, [activeCategory, allProjects, showAllProjects]);

  // Reset showAllProjects when category changes
  useEffect(() => {
    setShowAllProjects(false);
  }, [activeCategory]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.fromTo(
        '.projects-title',
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

      // Animate filter buttons
      gsap.fromTo(
        '.filter-btn',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.filter-container',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Animate projects on filter change or show all toggle
    gsap.fromTo(
      '.project-card',
      { y: 40, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
      }
    );
  }, [activeCategory, showAllProjects, filteredProjects.length]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-accent-gold/5 to-transparent rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Title */}
        <div className="projects-title">
          <SectionTitle
            subtitle="Our Work"
            title="Featured Projects"
            description="Explore our portfolio of successful exhibitions and designs that have helped brands make lasting impressions."
          />
        </div>

        {/* Filter Buttons */}
        <div className="filter-container flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-accent-gold to-accent-copper text-white shadow-lg shadow-accent-gold/25'
                  : 'glass text-white/70 hover:text-white hover:border-white/30'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => {
            // Render different link types based on project type
            const linkTo = project.category === 'exhibitions' 
              ? `/exhibitions/${project.slug}` 
              : `/designs/${project.slug}`;

            return (
              <Link
                key={project.id}
                to={linkTo}
                className="project-card group"
              >
                <GlassCard className="p-0 overflow-hidden" hover={true}>
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                        <span className="text-white/30 text-lg">Loading...</span>
                      </div>
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full glass text-xs font-medium text-white uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-gradient transition-colors duration-300">
                        {project.title}
                      </h3>
                      
                      {/* View Project Link */}
                      <div className="flex items-center gap-2 text-accent-gold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <span className="text-sm font-medium">
                          {project.category === 'exhibitions' ? 'View Exhibition' : 'View Designs'}
                        </span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            );
          })}
        </div>

        {/* View All Button - Only visible when All Projects tab is active and not expanded */}
        {activeCategory === 'all' && !showAllProjects && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAllProjects(true)}
            >
              View All Projects
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
          </div>
        )}

        {/* Show Less Button - Only visible when expanded */}
        {activeCategory === 'all' && showAllProjects && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAllProjects(false)}
            >
              Show Less
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
