'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { projects, colorMap } from '@/data/siteData';

export default function Projects() {
  const { t, language } = useLanguage();
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
          {t('projects.title')}{' '}
          <span className="bg-gradient-to-r from-violet-400 to-violet-300 bg-clip-text text-transparent">
            {t('projects.titleHighlight')}
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-slate-500 mb-10 sm:mb-12 text-sm sm:text-base"
        >
          {t('projects.subtitle')}
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
                className={`rounded-xl ${colors.bg} ${colors.borderHover} border p-5 sm:p-6 backdrop-blur-sm cursor-pointer hover:scale-[1.02] transition-all duration-300 group`}
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
                  {project.tech.slice(0, 3).map((techItem, i) => (
                    <span key={i} className={`px-2 py-0.5 text-[11px] font-medium ${colors.badge} border rounded-full`}>
                      {techItem}
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
                  {selectedProject.tech.map((techItem, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium text-violet-300 bg-violet-500/15 border border-violet-500/20 rounded-full">
                      {techItem}
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
                    🔗 {t('projects.viewLive')}
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
