'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/context/LanguageContext';

const FloatingShapes = dynamic(() => import('./FloatingShapes'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.1), transparent)',
      borderRadius: '1rem'
    }} />
  )
});

export default function About() {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);
  const [sectionTop, setSectionTop] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (sectionRef.current) {
        setSectionTop(sectionRef.current.offsetTop);
      }
    };

    if (sectionRef.current) {
      setSectionTop(sectionRef.current.offsetTop);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const relativeScroll = Math.max(0, scrollY - sectionTop + 500);
  const shapesParallax = relativeScroll * 0.08;
  const contentParallax = relativeScroll * 0.04;

  return (
    <div
      ref={sectionRef}
      style={{
        padding: '6rem 0',
        background: 'transparent',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background glow effects */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '-20%',
        width: '60%',
        height: '80%',
        background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.08) 0%, transparent 60%)',
        transform: `translateY(${shapesParallax * 0.3}px)`,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '-20%',
        width: '60%',
        height: '80%',
        background: 'radial-gradient(circle at center, rgba(34, 211, 238, 0.06) 0%, transparent 60%)',
        transform: `translateY(${-shapesParallax * 0.2}px)`,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem'
      }}>
        <h2 className="animate-on-scroll" style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: '3rem',
          color: 'white',
          transform: `translateY(${-contentParallax}px)`
        }}>
          {t('about.title')} <span style={{
            background: 'linear-gradient(135deg, #a855f7, #c084fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>{t('about.titleHighlight')}</span>
        </h2>

        <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '2rem',
            alignItems: 'center'
          }}>
            {/* 3D Floating Shapes */}
            <div style={{
              height: isMobile ? '16rem' : '20rem',
              transform: `translateY(${-shapesParallax}px)`,
              willChange: 'transform',
              order: isMobile ? 2 : 1
            }}>
              <FloatingShapes />
            </div>

            {/* About Content Card */}
            <div
              className="glass-card animate-on-scroll"
              style={{
                padding: '2rem',
                borderRadius: '1.5rem',
                transform: `translateY(${-contentParallax * 0.5}px)`,
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(34, 211, 238, 0.05))',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                order: isMobile ? 1 : 2
              }}
            >
              {/* Profile Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  flexShrink: 0
                }}>
                  👨‍💻
                </div>
                <div>
                  <h3 style={{ color: 'white', fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    {t('about.role')}
                  </h3>
                  <p style={{ color: '#a855f7', fontSize: '0.875rem', fontWeight: 500 }}>
                    {t('about.experienceText')}
                  </p>
                </div>
              </div>

              {/* About Text */}
              <p style={{
                color: '#e2e8f0',
                fontSize: '1rem',
                lineHeight: 1.7,
                marginBottom: '1rem'
              }}>
                {t('about.description1')}
              </p>

              <p style={{
                color: '#94a3b8',
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                marginBottom: '1.5rem'
              }}>
                {t('about.description2')}
              </p>

              {/* Tech Tags */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                {['Vue.js', 'React.js', 'Express.js', 'Oracle', 'MySQL'].map((tech, i) => (
                  <span key={i} style={{
                    padding: '0.375rem 0.75rem',
                    background: 'rgba(139, 92, 246, 0.15)',
                    border: '1px solid rgba(139, 92, 246, 0.25)',
                    borderRadius: '9999px',
                    color: '#c4b5fd',
                    fontSize: '0.8125rem',
                    fontWeight: 500
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
