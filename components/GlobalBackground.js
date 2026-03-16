'use client';

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden will-change-transform">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[#050510]" />
      
      {/* Static orbs — ใช้ CSS background blur ที่ bake ใน gradient แทน filter: blur() เพื่อ performance */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          top: '10%',
          left: '10%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0.04) 40%, transparent 70%)',
          transform: 'translateZ(0)',
        }}
      />
      <div 
        className="absolute w-[500px] h-[500px] rounded-full opacity-15"
        style={{
          top: '50%',
          right: '5%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.10) 0%, rgba(34,211,238,0.03) 40%, transparent 70%)',
          transform: 'translateZ(0)',
        }}
      />
      <div 
        className="absolute w-[450px] h-[450px] rounded-full opacity-10"
        style={{
          bottom: '10%',
          left: '30%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, rgba(236,72,153,0.02) 40%, transparent 70%)',
          transform: 'translateZ(0)',
        }}
      />
    </div>
  );
}
