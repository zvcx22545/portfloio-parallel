'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const projects = [
  {
    title: { th: 'Mybeer Landing Page', en: 'Mybeer Landing Page' },
    description: {
      th: 'ทำ Landing Page สำหรับ Mybeer เพื่อนำเสนอสินค้าและบริการ โดยใช้ HTML CSS JS jQuery',
      en: 'Created a Landing Page for Mybeer to showcase products and services using HTML, CSS, JS, jQuery'
    },
    tech: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
    link: 'https://myworld-virtual-store.com/present/',
    github: null,
    color: 'violet'
  },
  {
    title: { th: 'โปรเจกต์จบ - Web Project', en: 'Graduation Web Project' },
    description: {
      th: 'โปรเจกต์เอกสารการศึกษา ใช้ HTML CSS JS PHP (PDO) ในการออกแบบหน้าเว็บ และเชื่อมต่อฐานข้อมูล',
      en: 'A document management system using HTML, CSS, JS, PHP (PDO) with database connection and web design'
    },
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'PDO', 'MySQL'],
    link: null,
    github: 'https://github.com/zvcx22545/Webproject',
    color: 'cyan'
  },
  {
    title: { th: 'ระบบแลกสินค้า Mybeer', en: 'Mybeer Exchange System' },
    description: {
      th: 'ระบบเว็บแลกสินค้าด้วยคะแนน ตะกร้า และระบบสั่งซื้อสินค้า พัฒนาด้วย HTML CSS JS jQuery',
      en: 'Product exchange system with points, shopping cart, and ordering built with HTML, CSS, JS, jQuery'
    },
    tech: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
    link: null,
    github: null,
    color: 'pink'
  }
];

const colorMap = {
  violet: {
    badge: 'bg-violet-500/15 border-violet-500/20 text-violet-300',
    border: 'border-violet-500/20 hover:border-violet-500/40',
    bg: 'bg-violet-500/5',
    accent: 'from-violet-500 to-violet-600',
  },
  cyan: {
    badge: 'bg-cyan-500/15 border-cyan-500/20 text-cyan-300',
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    bg: 'bg-cyan-500/5',
    accent: 'from-cyan-500 to-cyan-600',
  },
  pink: {
    badge: 'bg-pink-500/15 border-pink-500/20 text-pink-300',
    border: 'border-pink-500/20 hover:border-pink-500/40',
    bg: 'bg-pink-500/5',
    accent: 'from-pink-500 to-pink-600',
  }
};

export default function Projects() {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="py-20 sm:py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-extrabold text-center mb-3 text-white"
        >
          {language === 'th' ? 'ผลงาน' : 'My'}{' '}
          <span className="bg-gradient-to-r from-violet-400 to-violet-300 bg-clip-text text-transparent">
            {language === 'th' ? 'โปรเจกต์' : 'Projects'}
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-slate-500 mb-10 sm:mb-12 text-sm sm:text-base"
        >
          {language === 'th' ? 'โปรเจกต์ที่ได้ทำจริงจากประสบการณ์การทำงาน' : 'Real projects from work experience'}
        </motion.p>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
          {projects.map((project, idx) => {
            const colors = colorMap[project.color];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onClick={() => setSelectedProject(project)}
                className={`rounded-xl ${colors.bg} ${colors.border} border p-5 sm:p-6 backdrop-blur-sm cursor-pointer hover:scale-[1.02] transition-all duration-300 group`}
              >
                {/* Project Icon */}
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors.accent} flex items-center justify-center text-lg shadow-lg mb-4`}>
                  💻
                </div>

                <h3 className="text-white text-base font-bold mb-2 group-hover:text-violet-200 transition-colors">
                  {project.title[language]}
                </h3>

                <p className="text-slate-400 text-sm leading-6 mb-4 line-clamp-2">
                  {project.description[language]}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tech.slice(0, 3).map((t, i) => (
                    <span key={i} className={`px-2 py-0.5 text-[11px] font-medium ${colors.badge} border rounded-full`}>
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className={`px-2 py-0.5 text-[11px] font-medium ${colors.badge} border rounded-full`}>
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-2 mt-auto">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-violet-300 hover:text-violet-200 transition-colors"
                    >
                      🔗 Live
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      📂 GitHub
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-lg rounded-2xl bg-[#0f0f23]/98 border border-violet-500/25 p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-5">
                <h3 className="text-white text-xl font-bold pr-4">{selectedProject.title[language]}</h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-lg transition-colors flex-shrink-0"
                >
                  ×
                </button>
              </div>

              <p className="text-slate-300 text-sm leading-7 mb-5">
                {selectedProject.description[language]}
              </p>

              <div className="mb-5">
                <h4 className="text-violet-400 text-sm font-semibold mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium text-violet-300 bg-violet-500/15 border border-violet-500/20 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-3 pt-4 border-t border-white/10">
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 text-white text-sm font-medium hover:shadow-lg transition-all"
                  >
                    🔗 {language === 'th' ? 'ดูผลงาน' : 'View Live'}
                  </a>
                )}
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-white/10 border border-white/15 text-white text-sm font-medium hover:bg-white/20 transition-colors"
                  >
                    📂 GitHub
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
