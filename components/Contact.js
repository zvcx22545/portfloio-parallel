"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import { useLanguage } from "@/context/LanguageContext";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

export default function Contact() {
  const { language } = useLanguage();

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [formFields, setFormFields] = useState([
    { id: 1, label: "ชื่อ-นามสกุล", fieldKey: "name", value: "", placeholder: "กรุณากรอกชื่อ-นามสกุล", required: true },
    { id: 2, label: "อีเมลติดต่อกลับ", fieldKey: "email", value: "", placeholder: "email@example.com", required: true },
    { id: 3, label: "หัวข้อ", fieldKey: "title", value: "", placeholder: "เช่น Job Offer / Partnership", required: true },
    { id: 4, label: "ข้อความ", fieldKey: "message", value: "", placeholder: "รายละเอียดเพิ่มเติม...", required: true, isTextArea: true },
  ]);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY) {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }
  }, []);

  const handleFieldChange = (id, value) => {
    setFormFields(fields =>
      fields.map(field => field.id === id ? { ...field, value } : field)
    );
  };

  const clearAllFields = () => {
    setFormFields(fields => fields.map(field => ({ ...field, value: "" })));
  };

  const handleSendEmail = async () => {
    try {
      const requiredFields = formFields.filter(field => field.required);
      const emptyRequiredFields = requiredFields.filter(field => !field.value.trim());

      if (emptyRequiredFields.length > 0) {
        await Swal.fire({
          icon: "warning",
          title: "กรุณากรอกข้อมูลให้ครบ",
          html: `<p>กรุณากรอกข้อมูลในช่อง:</p><ul style="text-align:left;margin-top:10px;">${emptyRequiredFields.map(f => `<li>• ${f.label}</li>`).join("")}</ul>`,
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#a855f7",
          background: "#1a1a2e",
          color: "#fff",
        });
        return;
      }

      setIsSending(true);
      const getFieldValue = (key) => formFields.find(f => f.fieldKey === key)?.value || "";
      const currentTime = new Date().toLocaleString('th-TH', { dateStyle: 'full', timeStyle: 'short' });

      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        try {
          const templateParams = {
            name: getFieldValue("name"),
            email: getFieldValue("email"),
            title: getFieldValue("title"),
            message: getFieldValue("message"),
            time: currentTime,
          };

          await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

          await Swal.fire({
            icon: "success",
            title: "ส่งอีเมลสำเร็จ!",
            text: "ขอบคุณที่ติดต่อมา จะตอบกลับโดยเร็วครับ",
            confirmButtonText: "ปิด",
            confirmButtonColor: "#22c55e",
            background: "#1a1a2e",
            color: "#fff",
          });

          setIsEmailModalOpen(false);
          clearAllFields();
        } catch (emailError) {
          throw new Error("EmailJS failed");
        }
      } else {
        const emailBody = formFields.filter(f => f.value.trim()).map(f => `${f.label}: ${f.value}`).join("\n\n");
        const subject = encodeURIComponent("ข้อเสนองาน / Job Opportunity");
        const body = encodeURIComponent(emailBody);
        window.location.href = `mailto:chisanupong.limsakul@gmail.com?subject=${subject}&body=${body}`;
        setIsEmailModalOpen(false);
      }
    } catch (error) {
      const emailBody = formFields.filter(f => f.value.trim()).map(f => `${f.label}: ${f.value}`).join("\n\n");
      const subject = encodeURIComponent("ข้อเสนองาน / Job Opportunity");
      const body = encodeURIComponent(emailBody);
      window.location.href = `mailto:chisanupong.limsakul@gmail.com?subject=${subject}&body=${body}`;
      setIsEmailModalOpen(false);
    } finally {
      setIsSending(false);
    }
  };

  const contactInfo = [
    { icon: '📧', label: 'Email', value: 'chisanupong.limsakul@gmail.com', href: 'mailto:chisanupong.limsakul@gmail.com' },
    { icon: '📱', label: language === 'th' ? 'โทรศัพท์' : 'Phone', value: '098-990-4873', href: 'tel:0989904873' },
    { icon: '🔗', label: 'GitHub', value: 'github.com/zvcx22545', href: 'https://github.com/zvcx22545' },
  ];

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
          {language === 'th' ? 'ติดต่อ' : 'Get In'}{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
            {language === 'th' ? 'ฉัน' : 'Touch'}
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-gradient-to-br from-cyan-500/8 to-violet-500/5 border border-cyan-500/20 p-6 sm:p-7 backdrop-blur-sm"
          >
            <h3 className="text-white text-lg font-bold mb-5 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-violet-400 rounded-full" />
              {language === 'th' ? 'ข้อมูลติดต่อ' : 'Contact Info'}
            </h3>

            <div className="space-y-4 mb-6">
              {contactInfo.map((info, i) => (
                <a
                  key={i}
                  href={info.href}
                  target={info.label === 'GitHub' ? '_blank' : undefined}
                  rel={info.label === 'GitHub' ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
                >
                  <span className="text-lg">{info.icon}</span>
                  <div>
                    <div className="text-xs text-slate-500">{info.label}</div>
                    <div className="text-sm font-medium group-hover:text-violet-300 transition-colors">{info.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <p className="text-slate-400 text-sm leading-6">
              {language === 'th'
                ? 'พร้อมที่จะร่วมงานหรือมีโปรเจกต์ที่น่าสนใจ? ติดต่อผมได้เลยครับ!'
                : 'Ready to collaborate or have an interesting project? Feel free to contact me!'}
            </p>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl bg-gradient-to-br from-violet-500/8 to-cyan-500/5 border border-violet-500/20 p-6 sm:p-7 backdrop-blur-sm flex flex-col justify-center items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-2xl mb-5 shadow-lg shadow-violet-500/20">
              ✉️
            </div>

            <h3 className="text-white text-lg font-bold mb-3">
              {language === 'th' ? 'ส่งข้อความถึงฉัน' : 'Send Me a Message'}
            </h3>

            <p className="text-slate-400 text-sm mb-6">
              {language === 'th'
                ? 'กดปุ่มด้านล่างเพื่อส่งอีเมลเชิญร่วมงาน'
                : 'Click the button below to send a job invitation email'}
            </p>

            <button
              onClick={() => setIsEmailModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-violet-500 to-violet-600 text-white font-semibold text-sm shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 transition-all duration-200"
            >
              📧 {language === 'th' ? 'ส่งอีเมลเชิญร่วมงาน' : 'Send Job Invitation'}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Email Modal */}
      {isEmailModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.85)", backdropFilter: "blur(8px)" }}
          onClick={() => setIsEmailModalOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(15, 15, 35, 0.98), rgba(30, 20, 50, 0.95))",
              border: "1px solid rgba(139, 92, 246, 0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                📧 {language === 'th' ? 'ส่งอีเมลเชิญร่วมงาน' : 'Send Job Invitation'}
              </h3>
              <button
                onClick={() => setIsEmailModalOpen(false)}
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
                    {field.label}
                    {field.required && <span className="text-red-400 ml-1">*</span>}
                  </label>
                  {field.isTextArea ? (
                    <textarea
                      value={field.value}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
                    />
                  ) : (
                    <input
                      type={field.fieldKey === "email" ? "email" : "text"}
                      value={field.value}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-5 border-t border-white/10">
              <button
                onClick={() => setIsEmailModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-medium text-sm hover:bg-white/10 transition-colors"
              >
                {language === 'th' ? 'ยกเลิก' : 'Cancel'}
              </button>
              <button
                onClick={handleSendEmail}
                disabled={isSending}
                className="flex-1 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-violet-600 text-white font-semibold text-sm shadow-lg shadow-violet-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {isSending ? (
                  <><span className="animate-spin">⌛</span> {language === 'th' ? 'กำลังส่ง...' : 'Sending...'}</>
                ) : (
                  <><span>📤</span> {language === 'th' ? 'ส่งอีเมล' : 'Send Email'}</>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
