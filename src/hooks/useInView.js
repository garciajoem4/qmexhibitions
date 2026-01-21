import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to detect when an element is in viewport
 */
export const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px',
      ...options,
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.rootMargin]);

  return [ref, isInView];
};

export default useInView;
