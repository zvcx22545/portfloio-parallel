'use client';

import { useState, useEffect, useRef } from 'react';

const projects = [
  {
    title: 'Internal Management System',
    problem: 'องค์กรต้องการระบบจัดการภายในที่มีประสิทธิภาพ',
    solution: 'พัฒนา Full Stack Web Application ด้วย Vue.js, Express.js และ Oracle',
    tech: ['Vue.js', 'Express.js', 'Oracle', 'REST API'],
    result: 'ลดเวลาการทำงาน 40% และเพิ่มความแม่นยำของข้อมูล',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
  },
  {
    title: 'Data Dashboard',
    problem: 'ต้องการ Dashboard แสดงข้อมูลแบบ Real-time',
    solution: 'สร้าง Dashboard ด้วย React.js และ Express API เชื่อมกับ MySQL',
    tech: ['React.js', 'Express.js', 'MySQL', 'Chart.js'],
    result: 'ผู้บริหารสามารถติดตามข้อมูลได้ทันที',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
  },
  {
    title: 'REST API Service',
    problem: 'ระบบต้องการ API ที่ปลอดภัยและรวดเร็ว',
    solution: 'ออกแบบและพัฒนา RESTful API ด้วย Express.js และ Knex.js',
    tech: ['Express.js', 'Knex.js', 'MySQL', 'JWT'],
    result: 'API รองรับ 1000+ requests/วินาที',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80'
  },
  {
    title: 'E-Commerce Platform',
    problem: 'ต้องการระบบขายสินค้าออนไลน์ที่รวดเร็วและปลอดภัย',
    solution: 'สร้าง E-Commerce ด้วย Next.js และ Express.js รองรับ Payment Gateway',
    tech: ['Next.js', 'Express.js', 'MySQL', 'Stripe'],
    result: 'รองรับผู้ใช้ 10,000+ คนพร้อมกัน',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80'
  },
  {
    title: 'Real-time Chat Application',
    problem: 'ต้องการระบบแชทแบบ Real-time สำหรับทีม',
    solution: 'พัฒนา Chat App ด้วย React และ WebSocket',
    tech: ['React.js', 'Socket.io', 'Node.js', 'MongoDB'],
    result: 'ส่งข้อความได้ภายใน 100ms',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80'
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const nextSlide = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const getCardStyle = (index) => {
    const diff = index - currentIndex;
    const totalProjects = projects.length;

    let normalizedDiff = diff;
    if (Math.abs(diff) > totalProjects / 2) {
      normalizedDiff = diff > 0 ? diff - totalProjects : diff + totalProjects;
    }

    const isCenter = normalizedDiff === 0;

    const rotation = normalizedDiff * (isMobile ? 10 : 15);
    const translateX = normalizedDiff * (isMobile ? 200 : 320);
    const translateZ = isCenter ? 0 : (isMobile ? -150 : -300);
    const scale = isCenter ? 1 : (isMobile ? 0.7 : 0.8);
    const opacity = Math.abs(normalizedDiff) > 1 ? 0 : 1;

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotation}deg) scale(${scale})`,
      opacity: opacity,
      zIndex: isCenter ? 10 : 5 - Math.abs(normalizedDiff),
      pointerEvents: isCenter ? 'auto' : 'none'
    };
  };

  return (
    <div 
      ref={sectionRef}
      style={{
        padding: '6rem 0',
        background: 'transparent',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Background effects */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem'
      }}>
        <h2 className="animate-on-scroll" style={{
          fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: isMobile ? '1rem' : '1.5rem',
          color: 'white'
        }}>
          Full Stack <span style={{ 
            background: 'linear-gradient(135deg, #a855f7, #c084fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Case Studies</span>
        </h2>

        <p className="animate-on-scroll" style={{
          textAlign: 'center',
          color: '#9ca3af',
          marginBottom: isMobile ? '2rem' : '3rem',
          fontSize: isMobile ? '0.875rem' : '1rem'
        }}>
          เลื่อนซ้าย-ขวา หรือคลิกปุ่มเพื่อดูโปรเจกต์ทั้งหมด
        </p>

        {/* 3D Carousel */}
        <div style={{
          position: 'relative',
          height: isMobile ? '450px' : '550px',
          marginBottom: '2rem',
          perspective: '1000px'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {projects.map((project, idx) => (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  width: '100%',
                  padding: '0 1rem',
                  transition: 'all 0.7s ease-out',
                  transformStyle: 'preserve-3d',
                  maxWidth: isMobile ? '280px' : '380px',
                  ...getCardStyle(idx)
                }}
              >
                <div
                  className="glass-card"
                  style={{
                    borderRadius: isMobile ? '0.75rem' : '1rem',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    background: 'rgba(15, 15, 35, 0.9)',
                    border: '1px solid rgba(139, 92, 246, 0.2)'
                  }}
                  onClick={() => idx === currentIndex && setSelectedProject(project)}
                >
                  <div style={{
                    position: 'relative',
                    height: isMobile ? '11rem' : '14rem',
                    overflow: 'hidden'
                  }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, #0f0f23 0%, rgba(15, 15, 35, 0.5) 50%, transparent 100%)'
                    }} />
                    <div style={{
                      position: 'absolute',
                      bottom: isMobile ? '0.75rem' : '1rem',
                      left: isMobile ? '0.75rem' : '1rem',
                      right: isMobile ? '0.75rem' : '1rem'
                    }}>
                      <h3 style={{
                        fontSize: isMobile ? '1rem' : '1.25rem',
                        fontWeight: 700,
                        color: 'white',
                        marginBottom: '0.25rem'
                      }}>{project.title}</h3>
                    </div>
                  </div>

                  <div style={{ padding: isMobile ? '0.875rem' : '1.25rem' }}>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.375rem',
                      marginBottom: isMobile ? '0.625rem' : '0.75rem'
                    }}>
                      {project.tech.slice(0, 3).map((t, i) => (
                        <span key={i} style={{
                          padding: '0.25rem 0.5rem',
                          background: 'rgba(139, 92, 246, 0.2)',
                          border: '1px solid rgba(139, 92, 246, 0.3)',
                          borderRadius: '9999px',
                          color: '#c4b5fd',
                          fontSize: isMobile ? '0.6875rem' : '0.75rem'
                        }}>
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span style={{
                          padding: '0.25rem 0.5rem',
                          background: 'rgba(139, 92, 246, 0.2)',
                          border: '1px solid rgba(139, 92, 246, 0.3)',
                          borderRadius: '9999px',
                          color: '#c4b5fd',
                          fontSize: isMobile ? '0.6875rem' : '0.75rem'
                        }}>
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                    <p style={{
                      color: '#9ca3af',
                      fontSize: isMobile ? '0.75rem' : '0.8125rem'
                    }}>คลิกเพื่อดูรายละเอียด →</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            style={{
              position: 'absolute',
              left: isMobile ? '0.5rem' : '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 20,
              width: isMobile ? '2.5rem' : '3rem',
              height: isMobile ? '2.5rem' : '3rem',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isMobile ? '1rem' : '1.25rem'
            }}
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            style={{
              position: 'absolute',
              right: isMobile ? '0.5rem' : '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 20,
              width: isMobile ? '2.5rem' : '3rem',
              height: isMobile ? '2.5rem' : '3rem',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isMobile ? '1rem' : '1.25rem'
            }}
          >
            →
          </button>
        </div>

        {/* Dots */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: isMobile ? '0.5rem' : '0.625rem',
          marginBottom: isMobile ? '1.25rem' : '1.5rem'
        }}>
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setIsAutoPlay(false);
              }}
              style={{
                width: idx === currentIndex ? (isMobile ? '1.5rem' : '2rem') : (isMobile ? '0.5rem' : '0.625rem'),
                height: isMobile ? '0.5rem' : '0.625rem',
                borderRadius: '9999px',
                backgroundColor: idx === currentIndex ? '#a855f7' : 'rgba(255, 255, 255, 0.3)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

        {/* Auto-play toggle */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            style={{
              padding: isMobile ? '0.5rem 1rem' : '0.5rem 1.5rem',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#d1d5db',
              cursor: 'pointer',
              fontSize: isMobile ? '0.8125rem' : '0.875rem'
            }}
          >
            {isAutoPlay ? '⏸ หยุดเล่นอัตโนมัติ' : '▶ เล่นอัตโนมัติ'}
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '1rem' : '1.5rem'
          }}
          className="animate-fade-in"
        >
          <div
            className="glass-card animate-scale-in"
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '48rem',
              width: '100%',
              borderRadius: isMobile ? '1rem' : '1.5rem',
              background: 'rgba(15, 15, 35, 0.98)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              overflow: 'hidden',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div style={{
              position: 'relative',
              height: isMobile ? '12rem' : '18rem'
            }}>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, #0f0f23, rgba(15, 15, 35, 0.7), transparent)'
              }} />
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  top: isMobile ? '0.75rem' : '1rem',
                  right: isMobile ? '0.75rem' : '1rem',
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
              <h3 style={{
                position: 'absolute',
                bottom: isMobile ? '1rem' : '1.5rem',
                left: isMobile ? '1rem' : '1.5rem',
                fontSize: isMobile ? '1.375rem' : '2rem',
                fontWeight: 700,
                color: 'white',
                paddingRight: '1rem'
              }}>{selectedProject.title}</h3>
            </div>

            <div style={{
              padding: isMobile ? '1.5rem' : '2rem',
              color: '#e2e8f0'
            }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{
                  fontSize: isMobile ? '1rem' : '1.125rem',
                  fontWeight: 600,
                  color: '#a855f7',
                  marginBottom: '0.5rem'
                }}>Problem</h4>
                <p style={{ fontSize: isMobile ? '0.9375rem' : '1rem', lineHeight: 1.6 }}>{selectedProject.problem}</p>
              </div>
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{
                  fontSize: isMobile ? '1rem' : '1.125rem',
                  fontWeight: 600,
                  color: '#22d3ee',
                  marginBottom: '0.5rem'
                }}>Solution</h4>
                <p style={{ fontSize: isMobile ? '0.9375rem' : '1rem', lineHeight: 1.6 }}>{selectedProject.solution}</p>
              </div>
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{
                  fontSize: isMobile ? '1rem' : '1.125rem',
                  fontWeight: 600,
                  color: '#ec4899',
                  marginBottom: '0.5rem'
                }}>Tech Stack</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedProject.tech.map((t, i) => (
                    <span key={i} style={{
                      padding: '0.375rem 0.75rem',
                      background: 'rgba(139, 92, 246, 0.2)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      borderRadius: '9999px',
                      color: '#c4b5fd',
                      fontSize: '0.8125rem'
                    }}>{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 style={{
                  fontSize: isMobile ? '1rem' : '1.125rem',
                  fontWeight: 600,
                  color: '#22c55e',
                  marginBottom: '0.5rem'
                }}>Result</h4>
                <p style={{ fontSize: isMobile ? '0.9375rem' : '1rem', lineHeight: 1.6 }}>{selectedProject.result}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
