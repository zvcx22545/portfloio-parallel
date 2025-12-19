'use client';

import { useState, useEffect } from 'react';

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navLinks.map(link => link.href.substring(1));
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
            Hire Me
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
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
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
            Hire Me
          </a>
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
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
