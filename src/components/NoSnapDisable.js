"use client";

import { useEffect } from 'react';

export default function NoSnapDisable() {
  useEffect(() => {
    // Set attribute on <html> to disable scroll-snap for the current page
    document.documentElement.setAttribute('data-no-snap', 'true');
    return () => {
      document.documentElement.removeAttribute('data-no-snap');
    };
  }, []);

  return null;
}
