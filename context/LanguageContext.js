'use client';

import { createContext, useContext, useState } from 'react';

export const translations = {
    navLinks: {
        home: { th: 'หน้าแรก', en: 'Home' },
        about: { th: 'เกี่ยวกับ', en: 'About' },
        skills: { th: 'ทักษะ', en: 'Skills' },
        experience: { th: 'ประสบการณ์', en: 'Experience' },
        projects: { th: 'โปรเจกต์', en: 'Projects' },
        education: { th: 'การศึกษา', en: 'Education' },
        contact: { th: 'ติดต่อ', en: 'Contact' },
    },
    navbar: {
        hireMe: { th: 'ติดต่อผม', en: 'Hire Me' },
    },
    hero: {
        availableForHire: { th: '✨ พร้อมรับงาน', en: '✨ Available for hire' },
        title: { th: 'Programmer / Developer', en: 'Programmer / Developer' },
        description: {
            th: 'ชอบพัฒนาตัวเองในด้านการเขียนโปรแกรม สามารถทำงานเป็นทีมได้ พร้อมเรียนรู้เครื่องมือและภาษาใหม่ๆ เพื่อเป็นประโยชน์ต่อองค์กร',
            en: 'Passionate about programming and self-development. A team player ready to learn new tools and technologies to benefit the organization.'
        },
        scalable: { th: 'มีประสิทธิภาพ', en: 'scalable' },
        maintainable: { th: 'บำรุงรักษาได้', en: 'maintainable' },
        viewProjects: { th: 'ดูโปรเจกต์ →', en: 'View Projects →' },
        contactMe: { th: 'ติดต่อผม', en: 'Contact Me' },
        experience: { th: '1+ ปี', en: '1+ Year' },
        realWorldExp: { th: 'ประสบการณ์จริง', en: 'Real-World Experience' },
        frontendBackend: { th: 'Frontend + Backend', en: 'Frontend + Backend' },
        databaseIntegration: { th: '+ เชื่อมต่อฐานข้อมูล', en: '+ Database Integration' },
        scrollToExplore: { th: 'เลื่อนเพื่อดูเพิ่มเติม', en: 'Scroll to explore' },
    },
    about: {
        title: { th: 'เกี่ยวกับ', en: 'About' },
        titleHighlight: { th: 'ผม', en: 'Me' },
        role: { th: 'Programmer / Developer', en: 'Programmer / Developer' },
        experienceText: { th: '1+ ปี ประสบการณ์', en: '1+ Year Experience' },
    },
    footer: {
        copyright: { th: '© 2024 Chisanupong Limsakul - Portfolio', en: '© 2024 Chisanupong Limsakul - Portfolio' },
        builtWith: { th: 'สร้างด้วย Next.js & Framer Motion', en: 'Built with Next.js & Framer Motion' },
    },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('th');

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'th' ? 'en' : 'th');
    };

    const t = (key) => {
        const keys = key.split('.');
        let result = translations;
        for (const k of keys) {
            result = result?.[k];
        }
        return result?.[language] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t, translations }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
