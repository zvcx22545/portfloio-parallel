'use client';

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[#050510]" />
      
      {/* Subtle animated orbs */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 animate-float-slow"
        style={{
          top: '10%',
          left: '10%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div 
        className="absolute w-[400px] h-[400px] rounded-full opacity-15 animate-float-slow-reverse"
        style={{
          top: '50%',
          right: '5%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animationDelay: '3s',
        }}
      />
      <div 
        className="absolute w-[350px] h-[350px] rounded-full opacity-10 animate-float-slow"
        style={{
          bottom: '10%',
          left: '30%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animationDelay: '6s',
        }}
      />
    </div>
  );
}
