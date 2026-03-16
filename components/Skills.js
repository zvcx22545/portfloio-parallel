'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { skills } from '@/data/siteData';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function Skills() {
  const { t } = useLanguage();

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
          {t('skills.title')}{' '}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            {t('skills.titleHighlight')}
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-slate-500 mb-10 sm:mb-12 text-sm sm:text-base"
        >
          {t('skills.subtitle')}
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto"
        >
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`rounded-xl ${skill.bgColor} ${skill.borderColor} border p-5 sm:p-6 hover:border-opacity-50 transition-all duration-300 hover:scale-[1.02]`}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${skill.gradient} flex items-center justify-center text-lg shadow-lg`}>
                  {skill.icon}
                </div>
                <h3 className="text-white text-base font-bold">{skill.category}</h3>
              </div>

              {/* Skills List */}
              <ul className="space-y-2">
                {skill.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2.5 text-slate-200 text-sm"
                  >
                    <span className={`w-1.5 h-1.5 ${skill.dotColor} rounded-full flex-shrink-0`} />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Count */}
              <div className="mt-4 px-3 py-1 bg-white/5 rounded-full inline-flex items-center gap-1.5 text-xs text-slate-400">
                <span className="text-violet-400 font-semibold">{skill.items.length}</span>
                {t('skills.technologies')}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
