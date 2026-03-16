'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const experiences = [
  {
    title: { th: 'เว็บแลกสินค้า Mybeer', en: 'Mybeer E-Commerce Website' },
    description: {
      th: 'มีประสบการณ์ในการทำหน้าเว็บแลกสินค้า Mybeer โดยเป็นเว็บที่ต้องนำคะแนนมาแลกสินค้าที่หน้าเว็บ โดยใช้ HTML CSS JS jQuery',
      en: 'Developed a product exchange web page for Mybeer — a points-based product redemption system using HTML, CSS, JS, jQuery'
    },
    tech: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
    color: 'violet'
  },
  {
    title: { th: 'เว็บสะสมแต้ม / สั่งซื้อสินค้า Mybeer', en: 'Mybeer Points & Shopping System' },
    description: {
      th: 'มีประสบการณ์ในการทำเว็บสะสมแต้มจากการซื้อสินค้าของ Mybeer โดยใช้ HTML CSS JS jQuery',
      en: 'Built a loyalty points collection and product ordering system for Mybeer using HTML, CSS, JS, jQuery'
    },
    tech: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
    color: 'cyan'
  },
  {
    title: { th: 'Landing Page ของ Mybeer', en: 'Mybeer Landing Page' },
    description: {
      th: 'มีประสบการณ์ในการทำ Landing Page ของ Mybeer โดยใช้ HTML CSS JS jQuery',
      en: 'Created a Landing Page for Mybeer using HTML, CSS, JS, jQuery'
    },
    tech: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
    link: 'https://myworld-virtual-store.com/present/',
    color: 'pink'
  },
  {
    title: { th: 'โปรเจกต์จบการศึกษา', en: 'Web Project (Graduation)' },
    description: {
      th: 'ทำโปรเจคเอกสารการศึกษาโดยใช้ HTML CSS JS PHP (PDO) ในการออกแบบหน้าเว็บไซต์ และ เชื่อมต่อฐานข้อมูล',
      en: 'Built a document management web project using HTML, CSS, JS, PHP (PDO) with database integration'
    },
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'PDO'],
    link: 'https://github.com/zvcx22545/Webproject',
    color: 'violet'
  },
  {
    title: { th: 'ระบบบริจาคโลหิต (สภากาชาดไทย)', en: 'Blood Donation System (Thai Red Cross)' },
    description: {
      th: 'มีส่วนร่วมในการพัฒนา และ แก้ไขปัญหา (Bug fixing) ของระบบบริจาคโลหิตของสภากาชาดไทย',
      en: 'Contributed to development and bug fixing for the Thai Red Cross Blood Donation System'
    },
    tech: ['Bug Fixing', 'Development'],
    color: 'cyan'
  }
];

const colorMap = {
  violet: {
    dot: 'bg-violet-400',
    line: 'from-violet-400 to-violet-600',
    badge: 'bg-violet-500/15 border-violet-500/20 text-violet-300',
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/5',
  },
  cyan: {
    dot: 'bg-cyan-400',
    line: 'from-cyan-400 to-cyan-600',
    badge: 'bg-cyan-500/15 border-cyan-500/20 text-cyan-300',
    border: 'border-cyan-500/20',
    bg: 'bg-cyan-500/5',
  },
  pink: {
    dot: 'bg-pink-400',
    line: 'from-pink-400 to-pink-600',
    badge: 'bg-pink-500/15 border-pink-500/20 text-pink-300',
    border: 'border-pink-500/20',
    bg: 'bg-pink-500/5',
  }
};

export default function Experience() {
  const { language } = useLanguage();

  return (
    <div className="py-20 sm:py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-extrabold text-center mb-10 sm:mb-14 text-white"
        >
          {language === 'th' ? 'ประสบการณ์' : 'Work'}{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
            {language === 'th' ? 'การทำงาน' : 'Experience'}
          </span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-cyan-500/30 to-transparent" />

          <div className="space-y-6">
            {experiences.map((exp, idx) => {
              const colors = colorMap[exp.color];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="relative pl-10 sm:pl-14"
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-2 sm:left-4 top-6 w-4 h-4 rounded-full ${colors.dot} border-2 border-[#0a0a1a] shadow-lg z-10`} />

                  {/* Card */}
                  <div className={`rounded-xl ${colors.bg} ${colors.border} border p-5 sm:p-6 backdrop-blur-sm hover:scale-[1.01] transition-transform duration-300`}>
                    <h3 className="text-white text-base sm:text-lg font-bold mb-2">
                      {exp.title[language]}
                    </h3>
                    <p className="text-slate-300 text-sm leading-6 mb-3">
                      {exp.description[language]}
                    </p>

                    <div className="flex flex-wrap items-center gap-2">
                      {exp.tech.map((t, i) => (
                        <span
                          key={i}
                          className={`px-2.5 py-0.5 text-xs font-medium ${colors.badge} border rounded-full`}
                        >
                          {t}
                        </span>
                      ))}
                      {exp.link && (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-0.5 text-xs font-medium text-white bg-white/10 border border-white/15 rounded-full hover:bg-white/20 transition-colors inline-flex items-center gap-1"
                        >
                          🔗 {language === 'th' ? 'ดูผลงาน' : 'View'}
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
