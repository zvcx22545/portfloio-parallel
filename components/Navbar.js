'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const navLinksData = [
  { href: '#hero', labelKey: 'home' },
  { href: '#about', labelKey: 'about' },
  { href: '#skills', labelKey: 'skills' },
  { href: '#experience', labelKey: 'experience' },
  { href: '#projects', labelKey: 'projects' },
  { href: '#contact', labelKey: 'contact' }
];

// Space Language Toggle Button Component
function SpaceLanguageToggle({ language, onToggle }) {
  const isEnglish = language === 'en';

  return (
    <button
      onClick={onToggle}
      aria-label={`Switch to ${isEnglish ? 'Thai' : 'English'}`}
      style={{
        position: 'relative',
        width: '80px',
        height: '36px',
        borderRadius: '20px',
        border: 'none',
        cursor: 'pointer',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0a0a1a 100%)',
        boxShadow: `
          0 0 20px rgba(139, 92, 246, 0.3),
          inset 0 0 20px rgba(0, 0, 0, 0.5),
          0 4px 15px rgba(0, 0, 0, 0.3)
        `,
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `
          0 0 30px rgba(139, 92, 246, 0.5),
          inset 0 0 20px rgba(0, 0, 0, 0.5),
          0 4px 20px rgba(0, 0, 0, 0.4)
        `;
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `
          0 0 20px rgba(139, 92, 246, 0.3),
          inset 0 0 20px rgba(0, 0, 0, 0.5),
          0 4px 15px rgba(0, 0, 0, 0.3)
        `;
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {/* Stars Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        borderRadius: '20px',
      }}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: i % 3 === 0 ? '2px' : '1px',
              height: i % 3 === 0 ? '2px' : '1px',
              background: '#fff',
              borderRadius: '50%',
              left: `${10 + (i * 7) % 80}%`,
              top: `${15 + (i * 11) % 70}%`,
              opacity: 0.3 + (i % 5) * 0.15,
              animation: `twinkle ${1.5 + (i % 3) * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Orbit Ring */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60px',
        height: '20px',
        border: '1px solid rgba(139, 92, 246, 0.2)',
        borderRadius: '50%',
        opacity: 0.5,
      }} />

      {/* Language Labels */}
      <span style={{
        position: 'absolute',
        left: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '11px',
        fontWeight: 700,
        color: !isEnglish ? '#fff' : 'rgba(255, 255, 255, 0.4)',
        textShadow: !isEnglish ? '0 0 10px rgba(34, 211, 238, 0.8)' : 'none',
        transition: 'all 0.4s ease',
        zIndex: 2,
      }}>
        TH
      </span>
      <span style={{
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '11px',
        fontWeight: 700,
        color: isEnglish ? '#fff' : 'rgba(255, 255, 255, 0.4)',
        textShadow: isEnglish ? '0 0 10px rgba(168, 85, 247, 0.8)' : 'none',
        transition: 'all 0.4s ease',
        zIndex: 2,
      }}>
        EN
      </span>

      {/* Planet/Moon Toggle */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: isEnglish ? 'calc(100% - 28px)' : '8px',
        transform: 'translateY(-50%)',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: isEnglish
          ? 'linear-gradient(135deg, #a855f7 0%, #7c3aed 50%, #5b21b6 100%)'
          : 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 50%, #0891b2 100%)',
        boxShadow: isEnglish
          ? `
            0 0 15px rgba(168, 85, 247, 0.8),
            0 0 30px rgba(168, 85, 247, 0.4),
            inset -3px -3px 6px rgba(0, 0, 0, 0.3),
            inset 2px 2px 4px rgba(255, 255, 255, 0.2)
          `
          : `
            0 0 15px rgba(34, 211, 238, 0.8),
            0 0 30px rgba(34, 211, 238, 0.4),
            inset -3px -3px 6px rgba(0, 0, 0, 0.3),
            inset 2px 2px 4px rgba(255, 255, 255, 0.2)
          `,
        transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        zIndex: 3,
      }}>
        {/* Planet Crater/Detail */}
        <div style={{
          position: 'absolute',
          top: '4px',
          right: '4px',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.3)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '5px',
          left: '3px',
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.2)',
        }} />
      </div>

      {/* Comet Trail Effect */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: isEnglish ? 'calc(100% - 45px)' : '25px',
        transform: 'translateY(-50%)',
        width: '20px',
        height: '4px',
        background: isEnglish
          ? 'linear-gradient(to left, rgba(168, 85, 247, 0.6), transparent)'
          : 'linear-gradient(to right, rgba(34, 211, 238, 0.6), transparent)',
        borderRadius: '2px',
        opacity: 0.6,
        transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        zIndex: 1,
      }} />

      {/* CSS Keyframes */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `}</style>
    </button>
  );
}

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get translated nav links
  const navLinks = navLinksData.map(link => ({
    ...link,
    label: t(`navLinks.${link.labelKey}`)
  }));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navLinksData.map(link => link.href.substring(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: isScrolled ? '0.75rem 0' : '1rem 0',
        background: isScrolled
          ? 'rgba(10, 10, 26, 0.85)'
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(139, 92, 246, 0.1)' : 'none',
        transition: 'all 0.3s ease'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1.5rem'
        }}>
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              color: 'white',
              fontWeight: 700,
              fontSize: '1.25rem'
            }}
          >
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
              fontSize: '1rem'
            }}>
              {'</>'}
            </span>
            <span style={{
              background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Portfolio
            </span>
          </a>

          {/* Desktop Navigation */}
          <div style={{
            display: 'none',
            gap: '0.25rem',
            alignItems: 'center'
          }} className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: activeSection === link.href.substring(1) ? '#fff' : '#94a3b8',
                  background: activeSection === link.href.substring(1)
                    ? 'rgba(139, 92, 246, 0.2)'
                    : 'transparent',
                  border: activeSection === link.href.substring(1)
                    ? '1px solid rgba(139, 92, 246, 0.3)'
                    : '1px solid transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Space Language Toggle - Desktop */}
          <div className="desktop-lang-toggle" style={{ display: 'none' }}>
            <SpaceLanguageToggle language={language} onToggle={toggleLanguage} />
          </div>

          {/* CTA Button */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="desktop-cta"
            style={{
              display: 'none',
              padding: '0.6rem 1.25rem',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
              color: 'white',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 600,
              boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
              transition: 'all 0.2s ease'
            }}
          >
            {t('navbar.hireMe')}
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              padding: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            <span style={{
              width: '20px',
              height: '2px',
              background: '#fff',
              borderRadius: '2px',
              transform: isMobileMenuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
              transition: 'all 0.3s ease'
            }} />
            <span style={{
              width: '20px',
              height: '2px',
              background: '#fff',
              borderRadius: '2px',
              opacity: isMobileMenuOpen ? 0 : 1,
              transition: 'all 0.3s ease'
            }} />
            <span style={{
              width: '20px',
              height: '2px',
              background: '#fff',
              borderRadius: '2px',
              transform: isMobileMenuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
              transition: 'all 0.3s ease'
            }} />
          </button>
        </div>
      </nav >

      {/* Mobile Menu Overlay */}
      {
        isMobileMenuOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(10, 10, 26, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            animation: 'fadeIn 0.3s ease'
          }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  padding: '1rem 2rem',
                  textDecoration: 'none',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: activeSection === link.href.substring(1) ? '#a855f7' : '#fff',
                  transition: 'all 0.2s ease'
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              style={{
                marginTop: '1rem',
                padding: '1rem 2.5rem',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                color: 'white',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 600
              }}
            >
              {t('navbar.hireMe')}
            </a>

            {/* Space Language Toggle - Mobile */}
            <div style={{ marginTop: '2rem' }}>
              <SpaceLanguageToggle language={language} onToggle={toggleLanguage} />
            </div>
          </div>
        )}

      <style jsx>{`
          @media (min-width: 768px) {
            .desktop-nav {
              display: flex !important;
            }
            .desktop-cta {
              display: inline-flex !important;
            }
            .mobile-menu-btn {
              display: none !important;
            }
            .desktop-lang-toggle {
              display: flex !important;
            }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
    </>
  );
}
