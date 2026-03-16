'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const educationData = [
  {
    period: '2020 - 2024',
    degree: { th: 'ปริญญาตรี', en: "Bachelor's Degree" },
    school: {
      th: 'มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตกำแพงแสน',
      en: 'Kasetsart University, Kamphaeng Saen Campus'
    },
    faculty: {
      th: 'คณะศิลปศาสตร์และวิทยาศาสตร์',
      en: 'Faculty of Liberal Arts and Science'
    },
    icon: '🎓',
    color: 'violet'
  },
  {
    period: '2014 - 2020',
    degree: { th: 'มัธยมศึกษา', en: 'High School' },
    school: {
      th: 'โรงเรียนพระปฐมวิทยาลัย (ปฐมวิทยา 2)',
      en: 'Phra Pathom Witthayalai School'
    },
    faculty: null,
    icon: '📚',
    color: 'cyan'
  }
];

export default function Education() {
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
          {language === 'th' ? 'การ' : ''}{' '}
          <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
            {language === 'th' ? 'ศึกษา' : 'Education'}
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-5 sm:gap-6 max-w-3xl mx-auto">
          {educationData.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`rounded-xl ${edu.color === 'violet' ? 'bg-violet-500/5 border-violet-500/20' : 'bg-cyan-500/5 border-cyan-500/20'} border p-6 backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300`}
            >
              {/* Period Badge */}
              <div className={`inline-block px-3 py-1 mb-4 text-xs font-bold rounded-full ${edu.color === 'violet' ? 'bg-violet-500/20 text-violet-300' : 'bg-cyan-500/20 text-cyan-300'}`}>
                {edu.period}
              </div>

              {/* Icon & Degree */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${edu.color === 'violet' ? 'from-violet-500 to-violet-600' : 'from-cyan-500 to-cyan-600'} flex items-center justify-center text-2xl shadow-lg`}>
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
          ))}
        </div>
      </div>
    </div>
  );
}
