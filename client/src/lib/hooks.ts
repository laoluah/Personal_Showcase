import { useState, useEffect, RefObject } from 'react';

interface InViewOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Custom hook to detect when an element is in the viewport
 */
export function useInView(
  ref: RefObject<Element>,
  options: InViewOptions = {}
): boolean {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: options.threshold || 0,
        rootMargin: options.rootMargin || '0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [ref, options.threshold, options.rootMargin]);

  return isInView;
}
