'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/context/LanguageContext';

const ThreeHeroScene = dynamic(() => import('./ThreeHeroScene'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.2), transparent)',
      borderRadius: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        width: '60px',
        height: '60px',
        border: '3px solid rgba(139, 92, 246, 0.3)',
        borderTopColor: '#a855f7',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
    </div>
  )
});

const Mobile3DVisual = dynamic(() => import('./Mobile3DVisual'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.2), transparent)',
      borderRadius: '1rem'
    }} />
  )
});

// Typing Title Component with Loop Animation
const TypingTitle = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const fullText = 'Full Stack Developer';

  useEffect(() => {
    let timeout;

    if (!isDeleting && displayedText === fullText) {
      // Pause before deleting
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText === '') {
      // Pause before typing again
      timeout = setTimeout(() => setIsDeleting(false), 500);
    } else if (isDeleting) {
      // Delete characters
      timeout = setTimeout(() => {
        setDisplayedText(prev => prev.slice(0, -1));
      }, 50);
    } else {
      // Type characters
      timeout = setTimeout(() => {
        setDisplayedText(prev => fullText.slice(0, prev.length + 1));
      }, 100);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting]);

  return (
    <h1 className="animate-fade-in" style={{
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: 800,
      marginBottom: '0.5rem',
      color: '#fff',
      lineHeight: 1.1,
      textShadow: '0 0 40px rgba(139, 92, 246, 0.3)',
      minHeight: '1.2em'
    }}>
      {displayedText.split('').map((char, i) => {
        const isGradientPart = i >= 11; // "Developer" starts at index 11
        return (
          <span
            key={i}
            style={{
              background: isGradientPart
                ? 'linear-gradient(135deg, #a855f7, #22d3ee)'
                : 'none',
              WebkitBackgroundClip: isGradientPart ? 'text' : 'unset',
              WebkitTextFillColor: isGradientPart ? 'transparent' : '#fff'
            }}
          >
            {char}
          </span>
        );
      })}
      <span style={{
        display: 'inline-block',
        width: '3px',
        height: '0.9em',
        background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
        marginLeft: '4px',
        animation: 'cursor-blink 0.8s infinite',
        verticalAlign: 'middle'
      }} />
    </h1>
  );
};

// Glassmorphism Name Component with Typing Animation
const GlassmorphismName = ({ name }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < name.length) {
        setDisplayedText(name.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 100); // 100ms per character

    return () => clearInterval(typingInterval);
  }, [name]);

  return (
    <div
      className="name-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        display: 'inline-block',
        padding: '1rem 2rem',
        marginBottom: '1.5rem',
        background: 'rgba(139, 92, 246, 0.1)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        borderRadius: '1rem',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Animated gradient border */}
      <div style={{
        position: 'absolute',
        inset: -2,
        background: 'linear-gradient(90deg, #a855f7, #22d3ee, #ec4899, #a855f7)',
        backgroundSize: '300% 300%',
        animation: 'border-flow 4s linear infinite',
        borderRadius: '1.1rem',
        zIndex: -1,
        opacity: isHovered ? 1 : 0.5,
        transition: 'opacity 0.3s ease'
      }} />

      {/* Inner background */}
      <div style={{
        position: 'absolute',
        inset: 2,
        background: 'rgba(10, 10, 26, 0.9)',
        borderRadius: 'calc(1rem - 2px)',
        zIndex: -1
      }} />

      {/* Shimmer effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
        animation: 'shimmer 3s infinite',
        zIndex: 1
      }} />

      {/* Name text with typing animation */}
      <h1 style={{
        fontSize: 'clamp(1.8rem, 2vw, 3rem)',
        fontWeight: 900,
        margin: 0,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '0.1em',
        position: 'relative',
        zIndex: 2
      }}>
        {displayedText.split('').map((letter, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              background: `linear-gradient(135deg, 
                hsl(${270 + i * 8}, 85%, 65%) 0%, 
                hsl(${190 + i * 5}, 85%, 60%) 50%, 
                hsl(${320 + i * 3}, 80%, 65%) 100%)`,
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: isTypingComplete ? `letter-wave 2s ease infinite, gradient-shift 3s ease infinite` : 'none',
              animationDelay: isTypingComplete ? `${i * 0.05}s, ${i * 0.1}s` : '0s',
              textShadow: 'none',
              filter: 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.5))',
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'all 0.1s ease'
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
        {/* Typing cursor */}
        {!isTypingComplete && (
          <span style={{
            display: 'inline-block',
            width: '3px',
            height: '1.5em',
            background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
            marginLeft: '2px',
            animation: 'cursor-blink 0.8s infinite'
          }} />
        )}
      </h1>

      {/* Glow dots */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: '8px',
        height: '8px',
        background: '#22d3ee',
        borderRadius: '50%',
        animation: 'pulse 2s infinite',
        boxShadow: '0 0 20px #22d3ee'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '8%',
        width: '6px',
        height: '6px',
        background: '#ec4899',
        borderRadius: '50%',
        animation: 'pulse 2s infinite 0.5s',
        boxShadow: '0 0 15px #ec4899'
      }} />
    </div>
  );
};

export default function Hero() {
  const { t, language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Parallax calculations
  const textParallax = scrollY * 0.2;
  const laptopParallax = scrollY * 0.1;
  const opacity = Math.max(0, 1 - scrollY / 600);
  const scale = Math.max(0.8, 1 - scrollY * 0.0003);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'transparent'
      }}
    >
      <div className="container" style={{
        zIndex: 10,
        padding: '5rem 1rem',
        opacity: opacity,
        transform: `scale(${scale})`,
        willChange: 'transform, opacity'
      }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>

          {/* Desktop Layout */}
          <div style={{
            display: isMobile ? 'none' : 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'center',
            marginBottom: '4rem'
          }}>
            {/* Text content with parallax */}
            <div style={{
              textAlign: 'left',
              transform: `translateY(${-textParallax}px)`,
              willChange: 'transform'
            }}>
              <div style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                background: 'rgba(139, 92, 246, 0.2)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '9999px',
                marginBottom: '1.5rem',
                fontSize: '0.875rem',
                color: '#c4b5fd',
                backdropFilter: 'blur(10px)'
              }} className="animate-fade-in">
                {t('hero.availableForHire')}
              </div>

              {/* Title with Typing Animation */}
              <TypingTitle />

              {/* Glassmorphism Name */}
              <GlassmorphismName name="Chisanupong Limsakul" />

              <p className="animate-fade-in-delay" style={{
                fontSize: '1.25rem',
                color: '#94a3b8',
                marginBottom: '2rem',
                lineHeight: 1.6,
                maxWidth: '500px'
              }}>
                {language === 'th' ? (
                  <>
                    สร้าง <span style={{ color: '#a855f7', fontWeight: 600 }}>{t('hero.scalable')}</span> และ{' '}
                    <span style={{ color: '#22d3ee', fontWeight: 600 }}>{t('hero.maintainable')}</span> Web Application
                    ด้วยเทคโนโลยีสมัยใหม่
                  </>
                ) : (
                  <>
                    Building <span style={{ color: '#a855f7', fontWeight: 600 }}>{t('hero.scalable')}</span> and{' '}
                    <span style={{ color: '#22d3ee', fontWeight: 600 }}>{t('hero.maintainable')}</span> web applications
                    with modern technologies
                  </>
                )}
              </p>

              <div className="animate-slide-up" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#projects" className="btn-primary" style={{ textDecoration: 'none' }}>
                  {t('hero.viewProjects')}
                </a>
                <a href="#contact" className="btn-secondary" style={{ textDecoration: 'none' }}>
                  {t('hero.contactMe')}
                </a>
              </div>
            </div>

            {/* 3D Laptop with parallax */}
            <div className="animate-fade-in-delay" style={{
              height: '550px',
              transform: `translateY(${-laptopParallax}px) rotateX(${scrollY * 0.02}deg)`,
              willChange: 'transform',
              perspective: '1000px'
            }}>
              <ThreeHeroScene />
            </div>
          </div>

          {/* Mobile Layout */}
          <div style={{ display: isMobile ? 'block' : 'none' }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '2rem',
              transform: `translateY(${-textParallax * 0.5}px)`
            }}>
              <div style={{
                display: 'inline-block',
                padding: '0.4rem 0.8rem',
                background: 'rgba(139, 92, 246, 0.2)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '9999px',
                marginBottom: '1rem',
                fontSize: '0.75rem',
                color: '#c4b5fd'
              }} className="animate-fade-in">
                {t('hero.availableForHire')}
              </div>

              <h1 className="animate-fade-in" style={{
                fontSize: 'clamp(1.8rem, 8vw, 2.5rem)',
                fontWeight: 800,
                marginBottom: '0.5rem',
                color: '#fff',
                lineHeight: 1.2
              }}>
                {t('hero.title')}
              </h1>

              {/* Mobile Name */}
              <div style={{
                padding: '0.75rem 1.5rem',
                margin: '1rem auto',
                background: 'rgba(139, 92, 246, 0.15)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '1rem',
                display: 'inline-block'
              }}>
                <h2 style={{
                  fontSize: 'clamp(1.2rem, 5vw, 1.5rem)',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #a855f7, #22d3ee, #ec4899)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'gradient-shift 3s ease infinite',
                  margin: 0
                }}>
                  Chisanupong Limsakul
                </h2>
              </div>

              <p className="animate-fade-in-delay" style={{
                fontSize: '1rem',
                color: '#94a3b8',
                padding: '0 1.5rem'
              }}>
                {t('hero.description')}
              </p>
            </div>

            <div className="animate-fade-in-delay" style={{
              height: '16rem',
              marginBottom: '2rem',
              maxWidth: '22rem',
              margin: '0 auto 2rem',
              transform: `translateY(${-laptopParallax * 0.3}px)`
            }}>
              <Mobile3DVisual />
            </div>
          </div>

          {/* Stats Cards with parallax */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '1.5rem',
            maxWidth: '56rem',
            margin: '0 auto',
            padding: '0 1rem',
            transform: `translateY(${-scrollY * 0.05}px)`,
            willChange: 'transform'
          }}>
            <div className="glass-card animate-slide-up" style={{
              padding: isMobile ? '1.5rem' : '2rem',
              borderRadius: isMobile ? '0.75rem' : '1rem',
              background: 'rgba(139, 92, 246, 0.1)',
              borderColor: 'rgba(139, 92, 246, 0.3)'
            }}>
              <div style={{
                fontSize: isMobile ? '2.5rem' : '3.5rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #a855f7, #c084fc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.5rem'
              }}>{t('hero.experience')}</div>
              <div style={{ color: '#c4b5fd', fontSize: isMobile ? '0.875rem' : '1rem' }}>
                {t('hero.realWorldExp')}
              </div>
            </div>
            <div className="glass-card animate-slide-up-delay" style={{
              padding: isMobile ? '1.5rem' : '2rem',
              borderRadius: isMobile ? '0.75rem' : '1rem',
              background: 'rgba(34, 211, 238, 0.1)',
              borderColor: 'rgba(34, 211, 238, 0.3)'
            }}>
              <div style={{
                fontSize: isMobile ? '1.5rem' : '2rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #22d3ee, #67e8f9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.5rem'
              }}>{t('hero.frontendBackend')}</div>
              <div style={{ color: '#a5f3fc', fontSize: isMobile ? '0.875rem' : '1rem' }}>
                {t('hero.databaseIntegration')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator with parallax */}
      <div style={{
        position: 'absolute',
        bottom: '2.5rem',
        left: '50%',
        transform: `translateX(-50%) translateY(${-scrollY * 0.5}px)`,
        opacity: Math.max(0, 1 - scrollY / 200)
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>{t('hero.scrollToExplore')}</span>
          <div className="animate-bounce" style={{
            width: '24px',
            height: '40px',
            border: '2px solid rgba(139, 92, 246, 0.5)',
            borderRadius: '12px',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '4px',
              height: '8px',
              background: '#a855f7',
              borderRadius: '2px',
              animation: 'scroll-indicator 2s infinite'
            }} />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes scroll-indicator {
          0%, 100% { opacity: 1; top: 8px; }
          50% { opacity: 0.5; top: 20px; }
        }
        @keyframes border-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        @keyframes letter-wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
