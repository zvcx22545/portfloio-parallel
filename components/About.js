'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { personalInfo, techTags, careerGoals } from '@/data/siteData';

export default function About() {
  const { t, language } = useLanguage();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.5 }
  };

  return (
    <div className="py-20 sm:py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <motion.h2
          {...fadeInUp}
          className="text-3xl sm:text-4xl font-extrabold text-center mb-10 sm:mb-14 text-white"
        >
          {t('about.title')}{' '}
          <span className="bg-gradient-to-r from-violet-400 to-violet-300 bg-clip-text text-transparent">
            {t('about.titleHighlight')}
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-5 gap-6 sm:gap-8">
          {/* Profile Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2"
          >
            <div className="rounded-2xl bg-gradient-to-br from-violet-500/10 to-cyan-500/5 border border-violet-500/20 p-6 sm:p-7 backdrop-blur-sm h-full">
              {/* Profile Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-2xl shadow-lg shadow-violet-500/20">
                  👨‍💻
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold">
                    {personalInfo.name[language]}
                  </h3>
                  <p className="text-violet-400 text-sm font-medium">{t('about.role')}</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <span className="text-base">📧</span>
                  <span>{personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <span className="text-base">📱</span>
                  <span>{personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <span className="text-base">📍</span>
                  <span>{personalInfo.address[language]}</span>
                </div>
              </div>

              {/* Language Skills */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-white text-sm font-semibold mb-3">
                  {t('about.languageSkills')}
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">🇹🇭 {t('about.thai')}</span>
                    <span className="text-violet-300 font-medium">{t('about.thaiLevel')}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">🇬🇧 {t('about.english')}</span>
                    <span className="text-cyan-300 font-medium">{t('about.englishLevel')}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-3"
          >
            <div className="rounded-2xl bg-gradient-to-br from-violet-500/5 to-cyan-500/5 border border-white/10 p-6 sm:p-7 backdrop-blur-sm h-full">
              <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-violet-400 to-cyan-400 rounded-full" />
                {t('about.aboutMe')}
              </h3>

              <p className="text-slate-200 text-[15px] leading-7 mb-4">
                {t('about.description')}
              </p>

              {/* Goals */}
              <h4 className="text-white text-base font-semibold mb-3 mt-5 flex items-center gap-2">
                🎯 {t('about.careerGoals')}
              </h4>
              <ul className="space-y-2 mb-5">
                {careerGoals.map((goal, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-slate-300 text-sm leading-6">
                    <span className="text-violet-400 mt-1 flex-shrink-0">•</span>
                    <span>{goal[language]}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {techTags.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-medium text-violet-300 bg-violet-500/15 border border-violet-500/20 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
