'use client';

import { useEffect, useRef, useState } from 'react';

export default function useParallax() {
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    setViewportHeight(window.innerHeight);
    
    const handleScroll = () => {
      if (rafRef.current) return;
      
      rafRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        rafRef.current = null;
      });
    };

    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const getParallaxStyle = (speed = 0.5, offset = 0) => {
    const translateY = (scrollY - offset) * speed;
    return {
      transform: `translateY(${translateY}px)`,
      willChange: 'transform'
    };
  };

  const getParallaxOpacity = (startOffset = 0, endOffset = 500) => {
    const progress = Math.max(0, Math.min(1, (scrollY - startOffset) / (endOffset - startOffset)));
    return 1 - progress;
  };

  const getParallaxScale = (speed = 0.0005, minScale = 0.8) => {
    const scale = Math.max(minScale, 1 - scrollY * speed);
    return {
      transform: `scale(${scale})`,
      willChange: 'transform'
    };
  };

  const isInView = (offset, height) => {
    return scrollY >= offset - viewportHeight && scrollY <= offset + height;
  };

  return {
    scrollY,
    viewportHeight,
    getParallaxStyle,
    getParallaxOpacity,
    getParallaxScale,
    isInView
  };
}
