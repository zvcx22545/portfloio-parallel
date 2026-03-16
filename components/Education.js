'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { educationData, colorMap } from '@/data/siteData';

export default function Education() {
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
          {t('education.titlePrefix')}{' '}
          <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
            {t('education.titleHighlight')}
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-5 sm:gap-6 max-w-3xl mx-auto">
          {educationData.map((edu, idx) => {
            const colors = colorMap[edu.color];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`rounded-xl ${colors.bg} ${colors.border} border p-6 backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300`}
              >
                {/* Period Badge */}
                <div className={`inline-block px-3 py-1 mb-4 text-xs font-bold rounded-full ${colors.periodBadge}`}>
                  {edu.period}
                </div>

                {/* Icon & Degree */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                    {edu.icon}
                  </div>
                  <h3 className="text-white text-lg font-bold">{edu.degree[language]}</h3>
                </div>

                {/* School Info */}
                <p className="text-slate-200 text-sm font-medium mb-1">{edu.school[language]}</p>
                {edu.faculty && (
                  <p className="text-slate-400 text-xs">{edu.faculty[language]}</p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
