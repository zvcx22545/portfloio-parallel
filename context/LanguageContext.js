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
            en: 'Passionate about programming and self-development. A team player ready to learn new tools and technologies to benefit the organization.',
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
        languageSkills: { th: 'ทักษะทางภาษา', en: 'Language Skills' },
        thai: { th: 'ภาษาไทย', en: 'Thai' },
        thaiLevel: { th: 'ภาษาแม่', en: 'Native' },
        english: { th: 'ภาษาอังกฤษ', en: 'English' },
        englishLevel: { th: 'ปานกลาง', en: 'Intermediate' },
        aboutMe: { th: 'เกี่ยวกับฉัน', en: 'About Me' },
        description: {
            th: 'ชอบพัฒนาตัวเองในด้านการเขียนโปรแกรม และ สามารถทำงานเป็นทีมได้เข้ากับผู้อื่นได้ง่าย พร้อมที่จะเรียนรู้เครื่องมือหรือภาษาใหม่ๆ เสนอเพื่อนำมาต่อยอดและพัฒนาตนเอง เพื่อเป็นประโยชน์ให้แก่องค์กร',
            en: 'Passionate about programming and self-development. A strong team player who adapts easily to new environments. Always eager to learn new tools and technologies to contribute effectively to the organization.',
        },
        careerGoals: { th: 'จุดมุ่งหมายในการทำงาน', en: 'Career Goals' },
    },
    skills: {
        title: { th: 'เครื่องมือที่ใช้ใน', en: 'What I Use in' },
        titleHighlight: { th: 'โปรเจกต์จริง', en: 'Real Projects' },
        subtitle: { th: 'เทคโนโลยีที่ใช้งานในชีวิตประจำวัน', en: 'Technologies I work with daily' },
        technologies: { th: 'เทคโนโลยี', en: 'technologies' },
    },
    experience: {
        title: { th: 'ประสบการณ์', en: 'Work' },
        titleHighlight: { th: 'การทำงาน', en: 'Experience' },
        viewWork: { th: 'ดูผลงาน', en: 'View' },
    },
    projects: {
        title: { th: 'ผลงาน', en: 'My' },
        titleHighlight: { th: 'โปรเจกต์', en: 'Projects' },
        subtitle: { th: 'โปรเจกต์ที่ได้ทำจริงจากประสบการณ์การทำงาน', en: 'Real projects from work experience' },
        viewLive: { th: 'ดูผลงาน', en: 'View Live' },
    },
    education: {
        titlePrefix: { th: 'การ', en: '' },
        titleHighlight: { th: 'ศึกษา', en: 'Education' },
    },
    contact: {
        title: { th: 'ติดต่อ', en: 'Get In' },
        titleHighlight: { th: 'ฉัน', en: 'Touch' },
        info: { th: 'ข้อมูลติดต่อ', en: 'Contact Info' },
        email: { th: 'อีเมล', en: 'Email' },
        phone: { th: 'โทรศัพท์', en: 'Phone' },
        readyToWork: {
            th: 'พร้อมที่จะร่วมงานหรือมีโปรเจกต์ที่น่าสนใจ? ติดต่อผมได้เลยครับ!',
            en: 'Ready to collaborate or have an interesting project? Feel free to contact me!',
        },
        sendMessage: { th: 'ส่งข้อความถึงฉัน', en: 'Send Me a Message' },
        sendDescription: {
            th: 'กดปุ่มด้านล่างเพื่อส่งอีเมลเชิญร่วมงาน',
            en: 'Click the button below to send a job invitation email',
        },
        sendInvitation: { th: 'ส่งอีเมลเชิญร่วมงาน', en: 'Send Job Invitation' },
        cancel: { th: 'ยกเลิก', en: 'Cancel' },
        sendEmail: { th: 'ส่งอีเมล', en: 'Send Email' },
        sending: { th: 'กำลังส่ง...', en: 'Sending...' },
        form: {
            name: { th: 'ชื่อ-นามสกุล', en: 'Full Name' },
            namePlaceholder: { th: 'กรุณากรอกชื่อ-นามสกุล', en: 'Enter your full name' },
            email: { th: 'อีเมลติดต่อกลับ', en: 'Reply Email' },
            emailPlaceholder: { th: 'email@example.com', en: 'email@example.com' },
            subject: { th: 'หัวข้อ', en: 'Subject' },
            subjectPlaceholder: { th: 'เช่น Job Offer / Partnership', en: 'e.g. Job Offer / Partnership' },
            message: { th: 'ข้อความ', en: 'Message' },
            messagePlaceholder: { th: 'รายละเอียดเพิ่มเติม...', en: 'Additional details...' },
        },
        alert: {
            fillRequired: { th: 'กรุณากรอกข้อมูลให้ครบ', en: 'Please fill in all required fields' },
            fillFields: { th: 'กรุณากรอกข้อมูลในช่อง:', en: 'Please fill in the following fields:' },
            ok: { th: 'ตกลง', en: 'OK' },
            successTitle: { th: 'ส่งอีเมลสำเร็จ!', en: 'Email sent successfully!' },
            successText: { th: 'ขอบคุณที่ติดต่อมา จะตอบกลับโดยเร็วครับ', en: 'Thank you for reaching out. I will reply soon.' },
            close: { th: 'ปิด', en: 'Close' },
        },
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
        setLanguage((prev) => (prev === 'th' ? 'en' : 'th'));
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
