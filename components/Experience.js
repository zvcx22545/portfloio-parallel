'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { experiences, colorMap } from '@/data/siteData';

export default function Experience() {
  const { t, language } = useLanguage();

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
          {t('experience.title')}{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
            {t('experience.titleHighlight')}
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
                  <div className={`rounded-xl ${colors.bg} ${colors.border} border p-5 sm:p-6 hover:scale-[1.01] transition-transform duration-300`}>
                    <h3 className="text-white text-base sm:text-lg font-bold mb-2">
                      {exp.title[language]}
                    </h3>
                    <p className="text-slate-300 text-sm leading-6 mb-3">
                      {exp.description[language]}
                    </p>

                    <div className="flex flex-wrap items-center gap-2">
                      {exp.tech.map((techItem, i) => (
                        <span
                          key={i}
                          className={`px-2.5 py-0.5 text-xs font-medium ${colors.badge} border rounded-full`}
                        >
                          {techItem}
                        </span>
                      ))}
                      {exp.link && (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-0.5 text-xs font-medium text-white bg-white/10 border border-white/15 rounded-full hover:bg-white/20 transition-colors inline-flex items-center gap-1"
                        >
                          🔗 {t('experience.viewWork')}
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
