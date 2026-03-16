'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const navLinksData = [
  { href: '#hero', labelKey: 'home' },
  { href: '#about', labelKey: 'about' },
  { href: '#skills', labelKey: 'skills' },
  { href: '#experience', labelKey: 'experience' },
  { href: '#projects', labelKey: 'projects' },
  { href: '#education', labelKey: 'education' },
  { href: '#contact', labelKey: 'contact' }
];

function LanguageToggle({ language, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={`Switch to ${language === 'en' ? 'Thai' : 'English'}`}
      className="relative w-16 h-8 rounded-full border border-violet-500/30 bg-[#0f0f23] cursor-pointer overflow-hidden transition-all hover:border-violet-500/50 hover:scale-105"
    >
      <span className={`absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-bold z-10 transition-colors ${language === 'th' ? 'text-white' : 'text-white/40'}`}>
        TH
      </span>
      <span className={`absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold z-10 transition-colors ${language === 'en' ? 'text-white' : 'text-white/40'}`}>
        EN
      </span>
      <div
        className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full transition-all duration-300 z-20"
        style={{
          left: language === 'en' ? 'calc(100% - 24px)' : '4px',
          background: language === 'en'
            ? 'linear-gradient(135deg, #a855f7, #7c3aed)'
            : 'linear-gradient(135deg, #22d3ee, #06b6d4)',
          boxShadow: language === 'en'
            ? '0 0 12px rgba(168,85,247,0.5)'
            : '0 0 12px rgba(34,211,238,0.5)',
        }}
      />
    </button>
  );
}

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = navLinksData.map(link => ({
    ...link,
    label: t(`navLinks.${link.labelKey}`)
  }));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
    const element = document.getElementById(href.substring(1));
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${isScrolled
            ? 'py-2.5 bg-[#0a0a1a]/85 backdrop-blur-xl border-b border-violet-500/10'
            : 'py-3 bg-transparent'
          }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2 text-white font-bold text-lg no-underline"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-xs font-bold">
              {'</>'}
            </span>
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent font-bold">
              DREAM
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium no-underline transition-all duration-200 ${activeSection === link.href.substring(1)
                    ? 'text-white bg-violet-500/20 border border-violet-500/30'
                    : 'text-slate-400 hover:text-white border border-transparent'
                  }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle language={language} onToggle={toggleLanguage} />
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-violet-500 to-violet-600 text-white text-sm font-semibold no-underline shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:scale-105 transition-all duration-200"
            >
              {t('navbar.hireMe')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 bg-white/5 border border-white/10 rounded-lg cursor-pointer"
          >
            <span className={`w-5 h-0.5 bg-white rounded-full transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-0.5 bg-white rounded-full transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-white rounded-full transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[999] bg-[#0a0a1a]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-4 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`px-6 py-3 text-xl font-semibold no-underline transition-colors ${activeSection === link.href.substring(1) ? 'text-violet-400' : 'text-white'
                }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-violet-500 to-violet-600 text-white text-base font-semibold no-underline"
          >
            {t('navbar.hireMe')}
          </a>
          <div className="mt-4">
            <LanguageToggle language={language} onToggle={toggleLanguage} />
          </div>
        </div>
      )}
    </>
  );
}
