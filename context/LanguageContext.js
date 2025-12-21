'use client';

import { createContext, useContext, useState } from 'react';

// Translations object containing all text content
export const translations = {
    // Navbar
    navLinks: {
        home: { th: 'หน้าแรก', en: 'Home' },
        about: { th: 'เกี่ยวกับ', en: 'About' },
        skills: { th: 'ทักษะ', en: 'Skills' },
        experience: { th: 'ประสบการณ์', en: 'Experience' },
        projects: { th: 'โปรเจกต์', en: 'Projects' },
        contact: { th: 'ติดต่อ', en: 'Contact' },
    },
    navbar: {
        hireMe: { th: 'ติดต่อผม', en: 'Hire Me' },
    },

    // Hero Section
    hero: {
        availableForHire: { th: '✨ พร้อมรับงาน', en: '✨ Available for hire' },
        title: { th: 'Full Stack Developer', en: 'Full Stack Developer' },
        description: {
            th: 'สร้าง Web Application ที่มีประสิทธิภาพและบำรุงรักษาได้ด้วยเทคโนโลยีสมัยใหม่',
            en: 'Building scalable and maintainable web applications with modern technologies'
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

    // About Section
    about: {
        title: { th: 'เกี่ยวกับ', en: 'About' },
        titleHighlight: { th: 'ผม', en: 'Me' },
        role: { th: 'Full Stack Developer', en: 'Full Stack Developer' },
        experienceText: { th: '1+ ปี ประสบการณ์', en: '1+ Year Experience' },
        description1: {
            th: 'สวัสดีครับ! ผมเป็น Full Stack Developer ที่หลงใหลในการสร้าง Web Application ที่มีประสิทธิภาพและใช้งานง่าย',
            en: "Hello! I'm a Full Stack Developer passionate about building efficient and user-friendly web applications."
        },
        description2: {
            th: 'มีประสบการณ์ในการพัฒนาระบบด้วย Vue.js, React.js, Express.js และฐานข้อมูล Oracle/MySQL',
            en: 'Experienced in developing systems with Vue.js, React.js, Express.js and Oracle/MySQL databases.'
        },
    },

    // Skills Section
    skills: {
        title: { th: 'ทักษะ', en: 'Skills' },
        titleHighlight: { th: 'ของผม', en: '& Tools' },
        frontend: { th: 'Frontend', en: 'Frontend' },
        backend: { th: 'Backend', en: 'Backend' },
        database: { th: 'ฐานข้อมูล', en: 'Database' },
        tools: { th: 'เครื่องมือ', en: 'Tools' },
    },

    // Experience Section
    experience: {
        title: { th: 'ประสบการณ์', en: 'Experience' },
        titleHighlight: { th: 'ทำงาน', en: '' },
    },

    // Projects Section
    projects: {
        title: { th: 'โปรเจกต์', en: 'Projects' },
        titleHighlight: { th: 'ล่าสุด', en: '' },
        viewProject: { th: 'ดูโปรเจกต์', en: 'View Project' },
        viewCode: { th: 'ดูโค้ด', en: 'View Code' },
    },

    // Contact Section
    contact: {
        title: { th: 'ติดต่อ', en: 'Get In' },
        titleHighlight: { th: 'ผม', en: 'Touch' },
        description: {
            th: 'พร้อมที่จะร่วมงานหรือมีโปรเจกต์ที่น่าสนใจ? ติดต่อผมได้เลยครับ!',
            en: 'Ready to collaborate or have an interesting project? Feel free to contact me!'
        },
        sendEmail: { th: '📧 ส่งอีเมลเชิญร่วมงาน', en: '📧 Send Job Invitation Email' },
        github: { th: '🔗 GitHub', en: '🔗 GitHub' },
        // Email Modal
        emailModalTitle: { th: 'ส่งอีเมลเชิญร่วมงาน', en: 'Send Job Invitation Email' },
        emailModalTitleShort: { th: 'ส่งอีเมล', en: 'Send Email' },
        nameLabel: { th: 'ชื่อ-นามสกุล', en: 'Full Name' },
        namePlaceholder: { th: 'กรุณากรอกชื่อ-นามสกุล', en: 'Please enter your full name' },
        emailLabel: { th: 'อีเมลติดต่อกลับ', en: 'Reply Email' },
        subjectLabel: { th: 'หัวข้อ', en: 'Subject' },
        subjectPlaceholder: { th: 'เช่น Job Offer / Partnership', en: 'e.g. Job Offer / Partnership' },
        messageLabel: { th: 'ข้อความ', en: 'Message' },
        messagePlaceholder: { th: 'รายละเอียดเพิ่มเติม...', en: 'Additional details...' },
        addField: { th: 'เพิ่มฟิลด์', en: 'Add Field' },
        addFieldShort: { th: 'เพิ่ม', en: 'Add' },
        clearAll: { th: 'ล้างข้อมูลทั้งหมด', en: 'Clear All' },
        clearAllShort: { th: 'ล้างทั้งหมด', en: 'Clear' },
        cancel: { th: 'ยกเลิก', en: 'Cancel' },
        send: { th: 'ส่งอีเมล', en: 'Send Email' },
        sending: { th: 'กำลังส่ง...', en: 'Sending...' },
        fieldCount: { th: 'เลื่อนเพื่อดูฟิลด์เพิ่มเติม ({count} ฟิลด์)', en: 'Scroll for more fields ({count} fields)' },
        addFieldTitle: { th: 'เพิ่มฟิลด์ใหม่', en: 'Add New Field' },
        fieldNamePlaceholder: { th: 'ชื่อฟิลด์ เช่น เงินเดือน, สวัสดิการ', en: 'Field name e.g. Salary, Benefits' },
        delete: { th: 'ลบ', en: 'Delete' },
        // Alert messages
        alertFillRequired: { th: 'กรุณากรอกข้อมูลให้ครบ', en: 'Please fill in all required fields' },
        alertFillRequiredText: { th: 'กรุณากรอกข้อมูลในช่อง:', en: 'Please fill in the following fields:' },
        alertNoData: { th: 'ไม่มีข้อมูล', en: 'No Data' },
        alertNoDataText: { th: 'กรุณากรอกข้อมูลอย่างน้อย 1 ช่องก่อนส่ง', en: 'Please fill at least 1 field before sending' },
        alertSuccess: { th: 'ส่งอีเมลสำเร็จ!', en: 'Email Sent Successfully!' },
        alertSuccessText: { th: 'ขอบคุณที่ติดต่อมา จะตอบกลับโดยเร็วครับ', en: 'Thank you for reaching out. I will reply soon!' },
        alertEmailOpened: { th: 'เปิดแอพอีเมลแล้ว', en: 'Email App Opened' },
        alertEmailOpenedText: { th: 'กรุณาส่งอีเมลจากแอพอีเมลของคุณ', en: 'Please send the email from your email app' },
        ok: { th: 'ตกลง', en: 'OK' },
        close: { th: 'ปิด', en: 'Close' },
    },

    // Footer
    footer: {
        copyright: { th: '© 2024 Full Stack Developer Portfolio', en: '© 2024 Full Stack Developer Portfolio' },
        builtWith: { th: 'สร้างด้วย Next.js & Three.js', en: 'Built with Next.js & Three.js' },
    },
};

// Create context
const LanguageContext = createContext();

// Provider component
export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('th');

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'th' ? 'en' : 'th');
    };

    // Helper function to get translation
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

// Custom hook
export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
