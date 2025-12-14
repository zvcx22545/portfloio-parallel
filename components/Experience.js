'use client';

import { useState, useEffect, useRef } from 'react';

const experiences = [
  { text: 'พัฒนาระบบภายในองค์กร', delay: '0.1s' },
  { text: 'ออกแบบ REST API', delay: '0.2s' },
  { text: 'เขียน Backend ด้วย Express + Knex', delay: '0.3s' },
  { text: 'ทำงานกับ Oracle และ MySQL', delay: '0.4s' },
  { text: 'ใช้ GitHub ในการทำงานร่วมกับทีม', delay: '0.5s' }
];

export default function Experience() {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);
  const [sectionTop, setSectionTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    const updateSectionTop = () => {
      if (sectionRef.current) {
        setSectionTop(sectionRef.current.offsetTop);
      }
    };

    updateSectionTop();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateSectionTop);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateSectionTop);
    };
  }, []);

  const relativeScroll = Math.max(0, scrollY - sectionTop + 400);
  const parallax = relativeScroll * 0.03;

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
      {/* Background elements */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.05) 0%, transparent 50%)',
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
          transform: `translateY(${-parallax}px)`
        }}>
          What I Have <span style={{ 
            background: 'linear-gradient(135deg, #22d3ee, #67e8f9)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Built</span>
        </h2>
        
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <div 
            className="glass-card animate-on-scroll" 
            style={{
              padding: 'clamp(1.5rem, 5vw, 2.5rem)',
              borderRadius: '1.5rem',
              position: 'relative',
              background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.08), rgba(139, 92, 246, 0.05))',
              border: '1px solid rgba(34, 211, 238, 0.2)',
              transform: `translateY(${-parallax * 0.5}px)`
            }}
          >
            {/* Gradient border left */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '4px',
              height: '100%',
              background: 'linear-gradient(to bottom, #a855f7, #22d3ee)',
              borderRadius: '1.5rem 0 0 1.5rem'
            }} />
            
            <h3 style={{
              fontSize: 'clamp(1.5rem, 4vw, 1.875rem)',
              fontWeight: 700,
              color: 'white',
              marginBottom: '0.5rem',
              paddingLeft: '1rem'
            }}>Full Stack Developer</h3>
            <p style={{
              color: '#a855f7',
              fontSize: '1.125rem',
              marginBottom: '1.5rem',
              paddingLeft: '1rem',
              fontWeight: 500
            }}>1 Year Experience</p>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, paddingLeft: '1rem' }}>
              {experiences.map((exp, idx) => (
                <li key={idx} className="animate-slide-in" style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  color: '#e2e8f0',
                  fontSize: '1rem',
                  marginBottom: '1rem',
                  animationDelay: exp.delay
                }}>
                  <span style={{
                    color: '#22d3ee',
                    marginRight: '0.75rem',
                    fontSize: '1.25rem',
                    lineHeight: 1.4
                  }}>•</span>
                  <span style={{ lineHeight: 1.6 }}>{exp.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
