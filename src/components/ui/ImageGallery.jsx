import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

const ImageGallery = ({ images, currentIndex, onClose, onNext, onPrev, onIndexChange }) => {
  const overlayRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Animate in
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );

    gsap.fromTo(
      containerRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out', delay: 0.1 }
    );

    // Disable body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Animate image change
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [currentIndex]);

  const handleClose = useCallback(() => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: onClose,
    });
  }, [onClose]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose, onNext, onPrev]);

  const currentImage = images[currentIndex];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full glass text-white hover:bg-white/20 transition-colors duration-300"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Image Counter */}
      <div className="absolute top-6 left-6 z-10 px-4 py-2 rounded-full glass text-white text-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 md:left-8 z-10 w-12 h-12 flex items-center justify-center rounded-full glass text-white hover:bg-white/20 transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 md:right-8 z-10 w-12 h-12 flex items-center justify-center rounded-full glass text-white hover:bg-white/20 transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Main Image Container */}
      <div
        ref={containerRef}
        className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          ref={imageRef}
          src={currentImage?.src}
          alt={currentImage?.name || 'Gallery image'}
          className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
        />
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2 p-2 rounded-xl glass max-w-[90vw] overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                if (onIndexChange) {
                  onIndexChange(index);
                }
              }}
              className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all duration-300 ${
                index === currentIndex
                  ? 'ring-2 ring-accent-gold scale-110'
                  : 'opacity-50 hover:opacity-100'
              }`}
            >
              <img
                src={image.src}
                alt={image.name}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
