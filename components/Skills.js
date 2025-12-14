'use client';

import { useState, useEffect, useRef } from 'react';

const skills = [
  {
    category: 'Frontend',
    icon: '🎨',
    items: ['Vue.js', 'React.js', 'Next.js', 'HTML/CSS', 'JavaScript', 'Tailwind CSS', 'Material UI'],
    gradient: 'linear-gradient(135deg, #a855f7, #7c3aed)',
    bgGlow: 'rgba(139, 92, 246, 0.12)'
  },
  {
    category: 'Backend',
    icon: '⚙️',
    items: ['Express.js', 'Knex.js', 'REST API', 'Node.js'],
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    bgGlow: 'rgba(6, 182, 212, 0.12)'
  },
  {
    category: 'Database',
    icon: '🗄️',
    items: ['Oracle', 'MySQL', 'SQL Query Optimization'],
    gradient: 'linear-gradient(135deg, #ec4899, #be185d)',
    bgGlow: 'rgba(236, 72, 153, 0.12)'
  },
  {
    category: 'Tools',
    icon: '🔧',
    items: ['GitHub', 'Git', 'Version Control'],
    gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    bgGlow: 'rgba(59, 130, 246, 0.12)'
  }
];

export default function Skills() {
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
      {/* Background effects */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.06) 0%, transparent 40%),
          radial-gradient(circle at 80% 70%, rgba(6, 182, 212, 0.04) 0%, transparent 40%)
        `,
        transform: `translateY(${relativeScroll * 0.03}px)`,
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
          marginBottom: '1rem',
          color: 'white',
          transform: `translateY(${-relativeScroll * 0.02}px)`
        }}>
          What I Use in{' '}
          <span style={{ 
            background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Real Projects</span>
        </h2>
        
        <p className="animate-on-scroll" style={{
          textAlign: 'center',
          color: '#64748b',
          marginBottom: '3rem',
          fontSize: '1rem'
        }}>
          Technologies I work with daily
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {skills.map((skill, idx) => {
            const cardParallax = relativeScroll * 0.015 * (idx % 2 === 0 ? 1 : -1);
            
            return (
              <div 
                key={idx} 
                className="glass-card animate-on-scroll" 
                style={{
                  padding: '1.5rem',
                  borderRadius: '1.25rem',
                  animationDelay: `${idx * 0.1}s`,
                  transform: `translateY(${cardParallax}px)`,
                  background: skill.bgGlow,
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.875rem',
                  marginBottom: '1.25rem'
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: skill.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    boxShadow: `0 4px 15px ${skill.bgGlow}`
                  }}>
                    {skill.icon}
                  </div>
                  <h3 style={{
                    color: 'white',
                    fontSize: '1.125rem',
                    fontWeight: 700
                  }}>
                    {skill.category}
                  </h3>
                </div>
                
                {/* Skills list */}
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {skill.items.map((item, i) => (
                    <li key={i} style={{
                      color: '#e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '0.625rem',
                      padding: '0.375rem 0',
                      borderBottom: i < skill.items.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                      fontSize: '0.9375rem'
                    }}>
                      <span style={{
                        width: '6px',
                        height: '6px',
                        background: skill.gradient,
                        borderRadius: '50%',
                        marginRight: '0.625rem',
                        flexShrink: 0
                      }} />
                      {item}
                    </li>
                  ))}
                </ul>
                
                {/* Skill count badge */}
                <div style={{
                  marginTop: '1rem',
                  padding: '0.375rem 0.75rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '9999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontSize: '0.8125rem',
                  color: '#94a3b8'
                }}>
                  <span style={{ color: '#a855f7', fontWeight: 600 }}>{skill.items.length}</span>
                  technologies
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
