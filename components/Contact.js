"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { contactInfo } from "@/data/siteData";
import EmailModal from "@/components/EmailModal";

export default function Contact() {
  const { t } = useLanguage();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

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
          {t('contact.title')}{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
            {t('contact.titleHighlight')}
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-gradient-to-br from-cyan-500/8 to-violet-500/5 border border-cyan-500/20 p-6 sm:p-7"
          >
            <h3 className="text-white text-lg font-bold mb-5 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-violet-400 rounded-full" />
              {t('contact.info')}
            </h3>

            <div className="space-y-4 mb-6">
              {contactInfo.map((info, i) => (
                <a
                  key={i}
                  href={info.href}
                  target={info.external ? '_blank' : undefined}
                  rel={info.external ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
                >
                  <span className="text-lg">{info.icon}</span>
                  <div>
                    <div className="text-xs text-slate-500">
                      {info.label || t(info.labelKey)}
                    </div>
                    <div className="text-sm font-medium group-hover:text-violet-300 transition-colors">
                      {info.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <p className="text-slate-400 text-sm leading-6">
              {t('contact.readyToWork')}
            </p>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl bg-gradient-to-br from-violet-500/8 to-cyan-500/5 border border-violet-500/20 p-6 sm:p-7 flex flex-col justify-center items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-2xl mb-5 shadow-lg shadow-violet-500/20">
              ✉️
            </div>

            <h3 className="text-white text-lg font-bold mb-3">
              {t('contact.sendMessage')}
            </h3>

            <p className="text-slate-400 text-sm mb-6">
              {t('contact.sendDescription')}
            </p>

            <button
              onClick={() => setIsEmailModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-violet-500 to-violet-600 text-white font-semibold text-sm shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 transition-all duration-200"
            >
              📧 {t('contact.sendInvitation')}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Email Modal */}
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </div>
  );
}
