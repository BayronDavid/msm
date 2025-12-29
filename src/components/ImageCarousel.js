"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function ImageCarousel({ images = [], interval = 3500, alt = '', className = '' }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pointerStartX = useRef(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const id = setInterval(() => {
      if (!isPaused) setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images, interval, isPaused]);

  if (!images || images.length === 0) return null;

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  function handlePointerDown(e) {
    // capture pointer so we reliably get up events
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {
      // ignore
    }
    pointerStartX.current = e.clientX;
    setIsPaused(true);
  }

  function handlePointerUp(e) {
    const startX = pointerStartX.current;
    pointerStartX.current = null;
    setIsPaused(false);
    if (typeof startX !== 'number') return;
    const delta = e.clientX - startX;
    const threshold = 50; // px
    if (delta > threshold) {
      prev();
    } else if (delta < -threshold) {
      next();
    }
  }

  function handlePointerCancel() {
    pointerStartX.current = null;
    setIsPaused(false);
  }

  // Play/pause videos depending on active slide
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      try {
        if (i === index) {
          // play active video
          v.currentTime = 0;
          v.muted = true;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      } catch (err) {
        // ignore
      }
    });
  }, [index]);

  return (
    <div
      className={`relative w-full h-full mb-4 overflow-hidden rounded-lg touch-pan-y select-none ${className}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onPointerLeave={handlePointerCancel}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-roledescription="carousel"
    >
      {images.map((item, i) => {
        // Only render the active slide and its immediate neighbours to avoid
        // creating DOM nodes (and network requests) for every single asset.
        const len = images.length;
        const prevIndex = (index - 1 + len) % len;
        const nextIndex = (index + 1) % len;
        const isActive = i === index;
        const isNeighbour = i === prevIndex || i === nextIndex;
        const shouldRender = isActive || isNeighbour;

        if (!shouldRender) return null;

        const src = typeof item === 'string' ? item : item.src;
        const type = typeof item === 'string' ? (/(\.mp4|\.webm|\.ogg)(\?|$)/i.test(src) ? 'video' : 'image') : item.type || 'image';

        if (type === 'video') {
          return (
            <video
              key={i}
              ref={(el) => (videoRefs.current[i] = el)}
              src={src}
              muted
              playsInline
              loop
              draggable={false}
              preload={isActive ? 'auto' : 'metadata'}
              className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              style={{ objectFit: 'cover' }}
            />
          );
        }

        return (
          <img
            key={i}
            src={src}
            alt={alt || `slide-${i + 1}`}
            loading="lazy"
            draggable={false}
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{ objectFit: 'cover' }}
          />
        );
      })}

      {/* Prev / Next buttons */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        onPointerDown={(e) => e.stopPropagation()}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg pointer-events-auto"
      >
        {/* Left arrow */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M12.707 14.707a1 1 0 01-1.414 0L7.586 11l3.707-3.707a1 1 0 011.414 1.414L10.414 11l2.293 2.293a1 1 0 010 1.414z" />
        </svg>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        onPointerDown={(e) => e.stopPropagation()}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg pointer-events-auto"
      >
        {/* Right arrow */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M7.293 5.293a1 1 0 011.414 0L12.414 9.0 8.707 12.707a1 1 0 01-1.414-1.414L10.586 9 7.293 5.707a1 1 0 010-1.414z" />
        </svg>
      </button>

      {/* dots */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              i === index ? 'bg-white' : 'bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
