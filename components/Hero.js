'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t, language } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left order-2 md:order-1"
          >
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-violet-300 bg-violet-500/15 border border-violet-500/25 rounded-full backdrop-blur-sm"
            >
              {t('hero.availableForHire')}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight"
            >
              Programmer /{' '}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Developer
              </span>
            </motion.h1>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="inline-block px-5 py-2.5 mb-5 bg-violet-500/10 border border-violet-500/25 rounded-xl backdrop-blur-sm"
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-violet-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
                {language === 'th' ? 'ชิษณุพงศ์ ลิ้มสกุล' : 'Chisanupong Limsakul'}
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-base sm:text-lg text-slate-400 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0"
            >
              {t('hero.description')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-3 justify-center md:justify-start"
            >
              <a
                href="#projects"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-violet-500/30 hover:scale-105 transition-all duration-200"
              >
                {t('hero.viewProjects')}
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-full bg-white/5 border border-white/15 text-white font-semibold text-sm hover:bg-white/10 hover:scale-105 transition-all duration-200"
              >
                {t('hero.contactMe')}
              </a>
            </motion.div>
          </motion.div>

          {/* Visual Element - Code Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="order-1 md:order-2 flex justify-center"
          >
            <div className="w-full max-w-sm sm:max-w-md">
              {/* Code Window */}
              <div className="rounded-2xl bg-[#0d1117] border border-white/10 shadow-2xl shadow-violet-500/10 overflow-hidden">
                {/* Window Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="ml-2 text-xs text-slate-500 font-mono">developer.js</span>
                </div>
                
                {/* Code Content */}
                <div className="p-5 font-mono text-sm leading-7">
                  <div>
                    <span className="text-violet-400">const</span>{' '}
                    <span className="text-cyan-300">developer</span>{' '}
                    <span className="text-white">=</span>{' '}
                    <span className="text-yellow-300">{'{'}</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-cyan-300">name</span>
                    <span className="text-white">: </span>
                    <span className="text-green-400">&quot;Chisanupong&quot;</span>
                    <span className="text-white">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-cyan-300">role</span>
                    <span className="text-white">: </span>
                    <span className="text-green-400">&quot;Programmer&quot;</span>
                    <span className="text-white">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-cyan-300">skills</span>
                    <span className="text-white">: [</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-green-400">&quot;React&quot;</span>
                    <span className="text-white">, </span>
                    <span className="text-green-400">&quot;Vue.js&quot;</span>
                    <span className="text-white">, </span>
                    <span className="text-green-400">&quot;Next.js&quot;</span>
                    <span className="text-white">,</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-green-400">&quot;Express&quot;</span>
                    <span className="text-white">, </span>
                    <span className="text-green-400">&quot;MySQL&quot;</span>
                    <span className="text-white">, </span>
                    <span className="text-green-400">&quot;Oracle&quot;</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-white">],</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-cyan-300">passion</span>
                    <span className="text-white">: </span>
                    <span className="text-green-400">&quot;Building Web Apps&quot;</span>
                  </div>
                  <div>
                    <span className="text-yellow-300">{'}'}</span>
                    <span className="text-white">;</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 max-w-2xl mx-auto"
        >
          <div className="p-5 rounded-xl bg-violet-500/10 border border-violet-500/20 backdrop-blur-sm">
            <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-violet-400 to-violet-300 bg-clip-text text-transparent mb-1">
              {t('hero.experience')}
            </div>
            <div className="text-violet-300/80 text-sm">{t('hero.realWorldExp')}</div>
          </div>
          <div className="p-5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm">
            <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent mb-1">
              {t('hero.frontendBackend')}
            </div>
            <div className="text-cyan-300/80 text-sm">{t('hero.databaseIntegration')}</div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-slate-500 text-xs">{t('hero.scrollToExplore')}</span>
          <div className="w-5 h-8 rounded-full border-2 border-violet-500/40 relative">
            <div className="w-1 h-2 bg-violet-400 rounded-full absolute top-1.5 left-1/2 -translate-x-1/2 animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
