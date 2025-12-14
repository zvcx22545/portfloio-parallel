"use client";

import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

// EmailJS Configuration - User should replace with their own keys
const EMAILJS_SERVICE_ID = "service_portfolio"; // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = "template_contact"; // Replace with your EmailJS template ID  
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // Replace with your EmailJS public key

export default function Contact() {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);
  const [sectionTop, setSectionTop] = useState(0);
  
  // Email Modal State
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isAddFieldModalOpen, setIsAddFieldModalOpen] = useState(false);
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [formFields, setFormFields] = useState([
    { id: 1, label: "ชื่อ-นามสกุล", value: "", placeholder: "กรุณากรอกชื่อ-นามสกุล", required: true },
    { id: 2, label: "บริษัท/องค์กร", value: "", placeholder: "ชื่อบริษัทหรือองค์กร", required: true },
    { id: 3, label: "ตำแหน่งงานที่เปิดรับ", value: "", placeholder: "เช่น Full Stack Developer", required: true },
    { id: 4, label: "รายละเอียดงาน", value: "", placeholder: "รายละเอียดเพิ่มเติมเกี่ยวกับตำแหน่ง", required: false },
  ]);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    const updateSectionTop = () => {
      if (sectionRef.current) {
        setSectionTop(sectionRef.current.offsetTop);
      }
    };

    updateSectionTop();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateSectionTop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateSectionTop);
    };
  }, []);

  const relativeScroll = Math.max(0, scrollY - sectionTop + 400);
  const parallax = relativeScroll * 0.03;

  // Form handlers
  const handleFieldChange = (id, value) => {
    setFormFields(fields =>
      fields.map(field =>
        field.id === id ? { ...field, value } : field
      )
    );
  };

  const addNewField = () => {
    if (!newFieldLabel.trim()) return;
    const newId = Math.max(...formFields.map(f => f.id), 0) + 1;
    setFormFields([
      ...formFields,
      { id: newId, label: newFieldLabel.trim(), value: "", placeholder: `กรุณากรอก ${newFieldLabel.trim()}`, required: false }
    ]);
    setNewFieldLabel("");
    setIsAddFieldModalOpen(false);
  };

  const deleteField = (id) => {
    setFormFields(fields => fields.filter(field => field.id !== id));
  };

  const clearAllFields = () => {
    setFormFields(fields => fields.map(field => ({ ...field, value: "" })));
  };

  const handleSendEmail = async () => {
    try {
      // Validate required fields
      const filledFields = formFields.filter(field => field.value.trim());
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

      if (filledFields.length === 0) {
        await Swal.fire({
          icon: "warning",
          title: "ไม่มีข้อมูล",
          text: "กรุณากรอกข้อมูลอย่างน้อย 1 ช่องก่อนส่ง",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#a855f7",
          background: "#1a1a2e",
          color: "#fff",
        });
        return;
      }

      setIsSending(true);

      // Prepare email content
      const emailBody = formFields
        .filter(field => field.value.trim())
        .map(field => `${field.label}: ${field.value}`)
        .join("\n\n");

      // Try EmailJS first (if configured)
      if (EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
        try {
          await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
              to_email: "chisanupong.limsakul@gmail.com",
              from_name: formFields.find(f => f.label === "ชื่อ-นามสกุล")?.value || "ผู้สนใจร่วมงาน",
              company: formFields.find(f => f.label === "บริษัท/องค์กร")?.value || "-",
              position: formFields.find(f => f.label === "ตำแหน่งงานที่เปิดรับ")?.value || "-",
              message: emailBody,
            },
            EMAILJS_PUBLIC_KEY
          );

          await Swal.fire({
            icon: "success",
            title: "ส่งอีเมลสำเร็จ!",
            text: "ขอบคุณที่สนใจร่วมงาน จะติดต่อกลับโดยเร็วครับ",
            confirmButtonText: "ปิด",
            confirmButtonColor: "#22c55e",
            background: "#1a1a2e",
            color: "#fff",
          });

          setIsEmailModalOpen(false);
          clearAllFields();
        } catch (emailError) {
          console.error("EmailJS Error:", emailError);
          // Fallback to mailto
          throw new Error("EmailJS failed, falling back to mailto");
        }
      } else {
        // Fallback to mailto if EmailJS not configured
        const subject = encodeURIComponent("ข้อเสนองาน / Job Opportunity");
        const body = encodeURIComponent(emailBody);
        
        window.location.href = `mailto:chisanupong.limsakul@gmail.com?subject=${subject}&body=${body}`;
        
        await Swal.fire({
          icon: "info",
          title: "เปิดแอพอีเมลแล้ว",
          text: "กรุณาส่งอีเมลจากแอพอีเมลของคุณ",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#a855f7",
          background: "#1a1a2e",
          color: "#fff",
        });

        setIsEmailModalOpen(false);
      }
    } catch (error) {
      console.error("Send email error:", error);
      
      // Fallback to mailto
      const emailBody = formFields
        .filter(field => field.value.trim())
        .map(field => `${field.label}: ${field.value}`)
        .join("\n\n");
      
      const subject = encodeURIComponent("ข้อเสนองาน / Job Opportunity");
      const body = encodeURIComponent(emailBody);
      
      window.location.href = `mailto:chisanupong.limsakul@gmail.com?subject=${subject}&body=${body}`;
      
      await Swal.fire({
        icon: "info",
        title: "เปิดแอพอีเมลแล้ว",
        text: "กรุณาส่งอีเมลจากแอพอีเมลของคุณ",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#a855f7",
        background: "#1a1a2e",
        color: "#fff",
      });

      setIsEmailModalOpen(false);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden py-24"
      style={{
        background: "transparent",
      }}
    >
      {/* Background effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 100%, rgba(34, 211, 238, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)
          `,
        }}
      />

      <div className="container relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <h2
          className="animate-on-scroll text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-8 sm:mb-12 text-white"
          style={{ transform: `translateY(${-parallax}px)` }}
        >
          Get In{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
            Touch
          </span>
        </h2>

        <div className="max-w-md mx-auto">
          <div
            className="glass-card animate-on-scroll rounded-2xl sm:rounded-3xl text-center p-6 sm:p-8 md:p-10"
            style={{
              background: "linear-gradient(135deg, rgba(34, 211, 238, 0.08), rgba(139, 92, 246, 0.05))",
              border: "1px solid rgba(34, 211, 238, 0.2)",
              transform: `translateY(${-parallax * 0.5}px)`,
            }}
          >
            {/* Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-2xl sm:text-3xl mx-auto mb-4 sm:mb-6 shadow-lg shadow-purple-500/30">
              ✉️
            </div>

            <p className="text-gray-200 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
              พร้อมที่จะร่วมงานหรือมีโปรเจกต์ที่น่าสนใจ? ติดต่อผมได้เลยครับ!
            </p>

            <div className="flex flex-col gap-3 sm:gap-4 items-center">
              {/* Email Button - Opens Modal */}
              <button
                onClick={() => setIsEmailModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold text-sm sm:text-base shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60 hover:scale-105 transition-all duration-200"
              >
                📧 ส่งอีเมลเชิญร่วมงาน
              </button>
              
              {/* GitHub Link */}
              <a
                href="https://github.com/zvcx22545"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white/5 border border-white/15 text-white font-semibold text-sm sm:text-base hover:bg-white/10 hover:scale-105 transition-all duration-200"
              >
                🔗 GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {isEmailModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.85)", backdropFilter: "blur(8px)" }}
          onClick={() => setIsEmailModalOpen(false)}
        >
          <div
            className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl animate-scale-in"
            style={{
              background: "linear-gradient(135deg, rgba(15, 15, 35, 0.98), rgba(30, 20, 50, 0.95))",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              backdropFilter: "blur(20px)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span className="text-2xl">📧</span>
                <span className="hidden sm:inline">ส่งอีเมลเชิญร่วมงาน</span>
                <span className="sm:hidden">ส่งอีเมล</span>
              </h3>
              <button
                onClick={() => setIsEmailModalOpen(false)}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-lg sm:text-xl transition-colors"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              {formFields.map((field, index) => (
                <div key={field.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                  <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-300">
                      {field.label}
                      {field.required && <span className="text-red-400 ml-1">*</span>}
                    </label>
                    <button
                      onClick={() => deleteField(field.id)}
                      className="text-xs text-red-400 hover:text-red-300 px-2 py-0.5 rounded hover:bg-red-500/10 transition-colors"
                    >
                      ลบ
                    </button>
                  </div>
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>
              ))}

              {/* Action Buttons Row */}
              <div className="flex flex-wrap gap-2 pt-2">
                {/* Add Field Button */}
                <button
                  onClick={() => setIsAddFieldModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-medium hover:bg-purple-500/30 transition-colors"
                >
                  <span className="text-base sm:text-lg">+</span>
                  <span className="hidden sm:inline">เพิ่มฟิลด์</span>
                  <span className="sm:hidden">เพิ่ม</span>
                </button>

                {/* Clear All Button */}
                <button
                  onClick={clearAllFields}
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg bg-gray-500/20 border border-gray-500/30 text-gray-300 text-xs sm:text-sm font-medium hover:bg-gray-500/30 transition-colors"
                >
                  🗑️
                  <span className="hidden sm:inline">ล้างข้อมูลทั้งหมด</span>
                  <span className="sm:hidden">ล้างทั้งหมด</span>
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 p-4 sm:p-6 border-t border-white/10">
              <button
                onClick={() => setIsEmailModalOpen(false)}
                className="w-full sm:w-auto order-2 sm:order-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-medium text-sm sm:text-base hover:bg-white/10 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleSendEmail}
                disabled={isSending}
                className="w-full sm:flex-1 order-1 sm:order-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold text-sm sm:text-base shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {isSending ? (
                  <>
                    <span className="animate-spin">⌛</span>
                    <span>กำลังส่ง...</span>
                  </>
                ) : (
                  <>
                    <span>📤</span>
                    <span>ส่งอีเมล</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Field Modal */}
      {isAddFieldModalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(4px)" }}
          onClick={() => setIsAddFieldModalOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 animate-scale-in"
            style={{
              background: "linear-gradient(135deg, rgba(20, 20, 45, 0.98), rgba(40, 30, 60, 0.95))",
              border: "1px solid rgba(139, 92, 246, 0.4)",
              backdropFilter: "blur(20px)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
              <span className="text-xl">➕</span>
              เพิ่มฟิลด์ใหม่
            </h4>
            
            <input
              type="text"
              value={newFieldLabel}
              onChange={(e) => setNewFieldLabel(e.target.value)}
              placeholder="ชื่อฟิลด์ เช่น เงินเดือน, สวัสดิการ"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all mb-3 sm:mb-4"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && addNewField()}
            />
            
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={() => setIsAddFieldModalOpen(false)}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 text-gray-300 font-medium text-sm hover:bg-white/10 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={addNewField}
                disabled={!newFieldLabel.trim()}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                เพิ่ม
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
