import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { exhibitionProjects, getExhibitionImages } from '../data/exhibitions';
import ImageGallery from '../components/ui/ImageGallery';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import BackgroundOrbs from '../components/ui/BackgroundOrbs';

gsap.registerPlugin(ScrollTrigger);

const ExhibitionPage = () => {
  const { slug } = useParams();
  const pageRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const exhibition = exhibitionProjects.find((e) => e.slug === slug);

  useEffect(() => {
    const loadImages = async () => {
      if (exhibition) {
        setLoading(true);
        const exhibitionImages = await getExhibitionImages(exhibition.folder);
        setImages(exhibitionImages);
        setLoading(false);
      }
    };

    loadImages();
  }, [exhibition]);

  useEffect(() => {
    if (!loading && images.length > 0) {
      const ctx = gsap.context(() => {
        // Animate header
        gsap.fromTo(
          '.exhibition-header',
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
        );

        // Animate images with stagger
        gsap.fromTo(
          '.exhibition-image',
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.4,
          }
        );
      }, pageRef);

      return () => ctx.revert();
    }
  }, [loading, images]);

  const openGallery = (index) => {
    setCurrentImageIndex(index);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  if (!exhibition) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-white mb-4">
            Exhibition Not Found
          </h1>
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-white hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-[#0a0a0a]">
      <BackgroundOrbs />
      <Navbar />

      {/* Hero Header */}
      <div className="pt-32 pb-16 relative">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="exhibition-header">
            {/* Back Button */}
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group"
            >
              <svg
                className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Projects
            </Link>

            {/* Title */}
            <div className="flex items-center gap-4 mb-4">
              <span className="px-4 py-1.5 rounded-full glass text-sm font-medium text-accent-gold uppercase tracking-wider">
                Exhibition
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6">
              {exhibition.title}
            </h1>
            <p className="text-xl text-white/60 max-w-2xl">
              Explore the complete exhibition gallery for {exhibition.title}. Click on any image to view it in full screen.
            </p>
          </div>
        </div>
      </div>

      {/* Images Grid */}
      <div className="pb-24 relative">
        <div className="container mx-auto px-6 lg:px-12">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-accent-gold/30 border-t-accent-gold rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="exhibition-image group cursor-pointer"
                  onClick={() => openGallery(index)}
                >
                  <div className="relative overflow-hidden rounded-2xl glass p-1">
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={image.src}
                        alt={image.name}
                        className="w-full aspect-[4/3] object-cover transform transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image Gallery Modal */}
      {galleryOpen && (
        <ImageGallery
          images={images}
          currentIndex={currentImageIndex}
          onClose={closeGallery}
          onNext={nextImage}
          onPrev={prevImage}
          onIndexChange={goToImage}
        />
      )}

      <Footer />
    </div>
  );
};

export default ExhibitionPage;
