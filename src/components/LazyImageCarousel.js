"use client";

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ImageCarousel to ensure it's not rendered server-side
const ImageCarousel = dynamic(() => import('./ImageCarousel'), { ssr: false });

export default function LazyImageCarousel({ images = [], alt = '', interval = 3500, className = '' , rootMargin = '100px'}) {
  const ref = useRef(null);
  const [shouldMount, setShouldMount] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;
    
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const inView = entry.isIntersecting;
          setIsInViewport(inView);
          
          // Only mount when entering viewport for the first time or re-entering
          if (inView) {
            setShouldMount(true);
          }
          // Unmount when leaving viewport to stop carousel and prevent downloads
          else {
            setShouldMount(false);
          }
        });
      },
      { 
        root: null, 
        rootMargin, 
        threshold: 0.1 // require at least 10% visibility
      }
    );

    obs.observe(node);
    return () => {
      obs.disconnect();
    };
  }, [rootMargin]);

  // When not mounted, render a placeholder box to avoid layout shift.
  return (
    <div ref={ref} className={`w-full h-full ${className}`}>
      {shouldMount ? (
        <ImageCarousel 
          images={images} 
          alt={alt} 
          interval={interval} 
          className="w-full h-full" 
        />
      ) : (
        <div 
          aria-hidden 
          className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center"
        >
          <svg 
            className="w-16 h-16 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
        </div>
      )}
    </div>
  );
}
