"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function ImageCarousel({ images = [], interval = 3500, alt = '', className = '' }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pointerStartX = useRef(null);

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

  return (
    <div
      className={`relative w-full h-full mb-4 overflow-hidden rounded-lg ${className}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-roledescription="carousel"
    >
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={alt || `slide-${i + 1}`}
          loading="lazy"
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ objectFit: 'cover' }}
        />
      ))}

      {/* Prev / Next buttons */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.293 16.293a1 1 0 010-1.414L15.586 11H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>

      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.293 16.293a1 1 0 010-1.414L15.586 11H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
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
