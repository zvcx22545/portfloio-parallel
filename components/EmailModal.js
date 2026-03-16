"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import { useLanguage } from "@/context/LanguageContext";
import { emailFormFields, personalInfo } from "@/data/siteData";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

export default function EmailModal({ isOpen, onClose }) {
  const { t } = useLanguage();

  const [formFields, setFormFields] = useState(
    emailFormFields.map((field) => ({ ...field, value: "" }))
  );
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY) {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }
  }, []);

  const handleFieldChange = (id, value) => {
    setFormFields((fields) =>
      fields.map((field) => (field.id === id ? { ...field, value } : field))
    );
  };

  const clearAllFields = () => {
    setFormFields((fields) => fields.map((field) => ({ ...field, value: "" })));
  };

  const handleSendEmail = async () => {
    try {
      const requiredFields = formFields.filter((field) => field.required);
      const emptyRequiredFields = requiredFields.filter(
        (field) => !field.value.trim()
      );

      if (emptyRequiredFields.length > 0) {
        await Swal.fire({
          icon: "warning",
          title: t('contact.alert.fillRequired'),
          html: `<p>${t('contact.alert.fillFields')}</p><ul style="text-align:left;margin-top:10px;">${emptyRequiredFields
            .map((f) => `<li>• ${t(f.labelKey)}</li>`)
            .join("")}</ul>`,
          confirmButtonText: t('contact.alert.ok'),
          confirmButtonColor: "#a855f7",
          background: "#1a1a2e",
          color: "#fff",
        });
        return;
      }

      setIsSending(true);
      const getFieldValue = (key) =>
        formFields.find((f) => f.fieldKey === key)?.value || "";
      const currentTime = new Date().toLocaleString("th-TH", {
        dateStyle: "full",
        timeStyle: "short",
      });

      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        try {
          const templateParams = {
            name: getFieldValue("name"),
            email: getFieldValue("email"),
            title: getFieldValue("title"),
            message: getFieldValue("message"),
            time: currentTime,
          };

          await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams
          );

          await Swal.fire({
            icon: "success",
            title: t('contact.alert.successTitle'),
            text: t('contact.alert.successText'),
            confirmButtonText: t('contact.alert.close'),
            confirmButtonColor: "#22c55e",
            background: "#1a1a2e",
            color: "#fff",
          });

          onClose();
          clearAllFields();
        } catch (emailError) {
          throw new Error("EmailJS failed");
        }
      } else {
        const emailBody = formFields
          .filter((f) => f.value.trim())
          .map((f) => `${t(f.labelKey)}: ${f.value}`)
          .join("\n\n");
        const subject = encodeURIComponent("ข้อเสนองาน / Job Opportunity");
        const body = encodeURIComponent(emailBody);
        window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
        onClose();
      }
    } catch (error) {
      const emailBody = formFields
        .filter((f) => f.value.trim())
        .map((f) => `${t(f.labelKey)}: ${f.value}`)
        .join("\n\n");
      const subject = encodeURIComponent("ข้อเสนองาน / Job Opportunity");
      const body = encodeURIComponent(emailBody);
      window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
      onClose();
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(8px)",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(15, 15, 35, 0.98), rgba(30, 20, 50, 0.95))",
          border: "1px solid rgba(139, 92, 246, 0.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            📧 {t('contact.sendInvitation')}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-lg transition-colors"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div className="p-5 space-y-4">
          {formFields.map((field) => (
            <div key={field.id}>
              <label className="text-sm font-medium text-slate-300 mb-1.5 block">
                {t(field.labelKey)}
                {field.required && (
                  <span className="text-red-400 ml-1">*</span>
                )}
              </label>
              {field.isTextArea ? (
                <textarea
                  value={field.value}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  placeholder={t(field.placeholder)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
                />
              ) : (
                <input
                  type={field.fieldKey === "email" ? "email" : "text"}
                  value={field.value}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  placeholder={t(field.placeholder)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
                />
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-5 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-medium text-sm hover:bg-white/10 transition-colors"
          >
            {t('contact.cancel')}
          </button>
          <button
            onClick={handleSendEmail}
            disabled={isSending}
            className="flex-1 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-violet-600 text-white font-semibold text-sm shadow-lg shadow-violet-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isSending ? (
              <>
                <span className="animate-spin">⌛</span> {t('contact.sending')}
              </>
            ) : (
              <>
                <span>📤</span> {t('contact.sendEmail')}
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
