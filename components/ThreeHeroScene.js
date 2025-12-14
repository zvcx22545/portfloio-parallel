'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeHeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    
    const container = mountRef.current;
    if (!container) return;
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Space Gray Materials
    const spaceGrayMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x4a4a5a,
      metalness: 0.92,
      roughness: 0.1
    });

    const darkGrayMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x2a2a35,
      metalness: 0.85,
      roughness: 0.15
    });

    const keyMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x3a3a45,
      metalness: 0.2,
      roughness: 0.6
    });

    // Screen Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1200;
    const ctx = canvas.getContext('2d');

    const codeLines = [
      { tokens: [
        { text: 'import', color: '#c792ea' }, { text: ' { useState } ', color: '#ffd700' },
        { text: 'from', color: '#c792ea' }, { text: " 'react'", color: '#c3e88d' }
      ]},
      { tokens: [
        { text: 'import', color: '#c792ea' }, { text: ' express ', color: '#f78c6c' },
        { text: 'from', color: '#c792ea' }, { text: " 'express'", color: '#c3e88d' }
      ]},
      { tokens: [{ text: '', color: '#fff' }]},
      { tokens: [
        { text: 'const', color: '#c792ea' }, { text: ' app ', color: '#f07178' },
        { text: '= express()', color: '#82aaff' }
      ]},
      { tokens: [{ text: '', color: '#fff' }]},
      { tokens: [
        { text: 'app', color: '#fff' }, { text: '.get', color: '#82aaff' },
        { text: "('/api'", color: '#c3e88d' }, { text: ', async (req, res) => {', color: '#89ddff' }
      ]},
      { tokens: [
        { text: '  const', color: '#c792ea' }, { text: ' data ', color: '#f07178' },
        { text: '= await db.query()', color: '#82aaff' }
      ]},
      { tokens: [
        { text: '  res', color: '#fff' }, { text: '.json', color: '#82aaff' },
        { text: '({ success: true })', color: '#c3e88d' }
      ]},
      { tokens: [{ text: '})', color: '#ffd700' }]},
    ];

    let currentLine = 0;
    let currentChar = 0;
    let totalCharsTyped = 0;

    const getLineText = (line) => line.tokens.map(t => t.text).join('');
    const getTotalChars = () => codeLines.reduce((sum, line) => sum + getLineText(line).length, 0);

    const updateScreenTexture = () => {
      // Dark IDE background
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(0, 0, 1920, 1200);
      
      // Window chrome
      ctx.fillStyle = '#21262d';
      ctx.fillRect(0, 0, 1920, 45);
      
      // Traffic lights
      [{ x: 20, c: '#ff5f56' }, { x: 45, c: '#ffbd2e' }, { x: 70, c: '#27c93f' }].forEach(l => {
        ctx.beginPath();
        ctx.arc(l.x, 22, 6, 0, Math.PI * 2);
        ctx.fillStyle = l.c;
        ctx.fill();
      });
      
      // Tab
      ctx.fillStyle = '#161b22';
      ctx.fillRect(100, 8, 140, 30);
      ctx.fillStyle = '#c9d1d9';
      ctx.font = '12px monospace';
      ctx.fillText('server.js', 115, 28);
      
      // Line numbers
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(0, 45, 50, 1155);
      
      // Code
      ctx.font = '15px "JetBrains Mono", monospace';
      
      let charCount = 0;
      codeLines.forEach((line, li) => {
        const y = 75 + li * 24;
        const lineText = getLineText(line);
        
        // Line number
        ctx.fillStyle = li === currentLine ? '#6b7280' : '#3d4450';
        ctx.textAlign = 'right';
        ctx.fillText((li + 1).toString(), 42, y);
        ctx.textAlign = 'left';
        
        // Current line highlight
        if (li === currentLine) {
          ctx.fillStyle = 'rgba(139, 92, 246, 0.1)';
          ctx.fillRect(50, y - 16, 1870, 24);
        }
        
        // Tokens
        let x = 60;
        let lineCharIndex = 0;
        line.tokens.forEach(token => {
          let displayText = '';
          for (let c = 0; c < token.text.length; c++) {
            if (charCount + lineCharIndex + c < totalCharsTyped) {
              displayText += token.text[c];
            }
          }
          lineCharIndex += token.text.length;
          
          if (displayText) {
            ctx.fillStyle = token.color;
            ctx.fillText(displayText, x, y);
          }
          x += ctx.measureText(token.text).width;
        });
        
        charCount += lineText.length;
      });
      
      // Cursor
      if (Math.floor(Date.now() / 500) % 2 === 0) {
        let cursorLine = 0, cursorX = 60, chars = 0;
        for (let i = 0; i < codeLines.length; i++) {
          const lineLen = getLineText(codeLines[i]).length;
          if (chars + lineLen >= totalCharsTyped) {
            cursorLine = i;
            const lineChars = totalCharsTyped - chars;
            const lineText = getLineText(codeLines[i]).substring(0, lineChars);
            cursorX = 60 + ctx.measureText(lineText).width;
            break;
          }
          chars += lineLen;
        }
        ctx.fillStyle = '#a855f7';
        ctx.fillRect(cursorX, 59 + cursorLine * 24, 2, 18);
      }
      
      screenTexture.needsUpdate = true;
    };

    const screenTexture = new THREE.CanvasTexture(canvas);

    // Laptop group
    const laptopGroup = new THREE.Group();
    scene.add(laptopGroup);

    // Base
    const base = new THREE.Mesh(
      new THREE.BoxGeometry(6, 0.15, 4),
      spaceGrayMaterial
    );
    base.position.set(0, -1.5, 0.3);
    base.castShadow = true;
    laptopGroup.add(base);

    // Keyboard area
    const kbArea = new THREE.Mesh(
      new THREE.BoxGeometry(5.5, 0.02, 3.1),
      darkGrayMaterial
    );
    kbArea.position.set(0, -1.42, 0.3);
    laptopGroup.add(kbArea);

    // Keys
    const keys = [];
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 12; c++) {
        const key = new THREE.Mesh(
          new THREE.BoxGeometry(0.32, 0.03, 0.28),
          keyMaterial
        );
        key.position.set(-2.2 + c * 0.38, -1.39, -0.8 + r * 0.38);
        keys.push({ mesh: key, baseY: -1.39 });
        laptopGroup.add(key);
      }
    }

    // Trackpad
    const trackpad = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 0.01, 1.3),
      new THREE.MeshStandardMaterial({ color: 0x3a3a45, metalness: 0.5, roughness: 0.1 })
    );
    trackpad.position.set(0, -1.41, 1.8);
    laptopGroup.add(trackpad);

    // Screen lid
    const lid = new THREE.Mesh(
      new THREE.BoxGeometry(5.9, 4.1, 0.1),
      spaceGrayMaterial
    );
    lid.position.set(0, 0.55, -1.55);
    lid.rotation.x = -0.18;
    lid.castShadow = true;
    laptopGroup.add(lid);

    // Bezel
    const bezel = new THREE.Mesh(
      new THREE.BoxGeometry(5.6, 3.8, 0.015),
      new THREE.MeshStandardMaterial({ color: 0x0a0a0a })
    );
    bezel.position.set(0, 0.55, -1.48);
    bezel.rotation.x = -0.18;
    laptopGroup.add(bezel);

    // Screen
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(5.3, 3.5),
      new THREE.MeshBasicMaterial({ map: screenTexture, toneMapped: false })
    );
    screen.position.set(0, 0.55, -1.46);
    screen.rotation.x = -0.18;
    laptopGroup.add(screen);

    // ========== HOLOGRAM CODE - DIRECT FROM SCREEN ==========
    const holoGroup = new THREE.Group();
    holoGroup.position.set(0, 0.55, -1.3);
    holoGroup.rotation.x = -0.18;
    laptopGroup.add(holoGroup);

    // Hologram lines data
    const holoLineData = [
      { text: 'import { useState } from "react"', colors: ['#c792ea', '#ffd700', '#c3e88d'] },
      { text: 'const app = express()', colors: ['#c792ea', '#f07178', '#82aaff'] },
      { text: 'app.get("/api", async (req, res) => {', colors: ['#82aaff', '#c3e88d', '#89ddff'] },
      { text: '  const data = await db.query()', colors: ['#c792ea', '#f07178', '#82aaff'] },
      { text: '  res.json({ success: true })', colors: ['#82aaff', '#c3e88d', '#ff5370'] },
    ];

    const holoPlanes = [];
    holoLineData.forEach((line, i) => {
      const hCanvas = document.createElement('canvas');
      hCanvas.width = 1024;
      hCanvas.height = 64;
      const hCtx = hCanvas.getContext('2d');

      const hTex = new THREE.CanvasTexture(hCanvas);
      const hMat = new THREE.MeshBasicMaterial({
        map: hTex,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });

      const hPlane = new THREE.Mesh(new THREE.PlaneGeometry(4, 0.35), hMat);
      // Position directly in front of screen, stacked vertically
      hPlane.position.set(0, 1.5 - i * 0.4, 0.5 + i * 0.15);
      hPlane.userData = { 
        text: line.text,
        colors: line.colors,
        canvas: hCanvas,
        ctx: hCtx,
        texture: hTex,
        targetOpacity: 0,
        index: i
      };
      holoGroup.add(hPlane);
      holoPlanes.push(hPlane);
    });

    // Screen glow effect
    const screenGlowMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending
    });
    const screenGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(5.5, 3.7),
      screenGlowMat
    );
    screenGlow.position.set(0, 0.55, -1.4);
    screenGlow.rotation.x = -0.18;
    laptopGroup.add(screenGlow);

    // Update hologram texture
    const updateHologram = (plane, time) => {
      const { ctx, canvas, text, colors, texture, targetOpacity } = plane.userData;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (targetOpacity < 0.1) return;
      
      // Animated gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      const shift = (time * 0.3) % 1;
      colors.forEach((color, i) => {
        gradient.addColorStop((i / colors.length + shift) % 1, color);
      });
      
      ctx.font = 'bold 28px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Multi-layer glow
      ctx.shadowColor = colors[0];
      ctx.shadowBlur = 20;
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = gradient;
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
      
      ctx.shadowBlur = 10;
      ctx.globalAlpha = 0.8;
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
      
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
      
      // Scanline flicker
      if (Math.random() > 0.97) {
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.fillRect(0, Math.random() * canvas.height, canvas.width, 1);
      }
      
      texture.needsUpdate = true;
    };

    // Particles
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(500 * 3);
    const colors = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      const c = new THREE.Color().setHSL(0.7 + Math.random() * 0.2, 0.7, 0.5);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    }));
    scene.add(particles);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 8, 5);
    scene.add(mainLight);
    scene.add(new THREE.DirectionalLight(0xa855f7, 0.4).translateX(-5).translateY(5));
    scene.add(new THREE.DirectionalLight(0x22d3ee, 0.3).translateY(-5).translateZ(-10));
    
    const screenLight = new THREE.PointLight(0x8b5cf6, 0.8, 12);
    screenLight.position.set(0, 1, 2);
    scene.add(screenLight);

    camera.position.set(0, 2, 10);
    camera.lookAt(0, -0.2, 0);

    // Mouse
    let targetRotY = 0, targetRotX = 0;
    const onMouseMove = (e) => {
      targetRotY = ((e.clientX / window.innerWidth) * 2 - 1) * 0.15;
      targetRotX = (-(e.clientY / window.innerHeight) * 2 + 1) * 0.05;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Typing animation
    const totalChars = getTotalChars();
    const typeInterval = setInterval(() => {
      totalCharsTyped++;
      
      // Calculate current line
      let chars = 0;
      for (let i = 0; i < codeLines.length; i++) {
        const lineLen = getLineText(codeLines[i]).length;
        if (chars + lineLen >= totalCharsTyped) {
          currentLine = i;
          currentChar = totalCharsTyped - chars;
          
          // Show hologram for completed lines
          if (i < holoPlanes.length && currentChar >= lineLen * 0.8) {
            holoPlanes[i].userData.targetOpacity = 0.9;
          }
          break;
        }
        chars += lineLen;
        // Show hologram for past lines
        if (i < holoPlanes.length) {
          holoPlanes[i].userData.targetOpacity = 0.9;
        }
      }

      // Key press animation
      const rk = keys[Math.floor(Math.random() * keys.length)];
      rk.mesh.position.y = rk.baseY - 0.015;
      setTimeout(() => { rk.mesh.position.y = rk.baseY; }, 60);

      // Reset
      if (totalCharsTyped >= totalChars) {
        setTimeout(() => {
          totalCharsTyped = 0;
          currentLine = 0;
          currentChar = 0;
          holoPlanes.forEach(p => p.userData.targetOpacity = 0);
        }, 3000);
      }
    }, 80);

    let time = 0;
    let animId;
    
    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.01;
      
      laptopGroup.rotation.y += (targetRotY - laptopGroup.rotation.y) * 0.04;
      laptopGroup.rotation.x += (targetRotX - laptopGroup.rotation.x) * 0.04;
      laptopGroup.position.y = Math.sin(time * 0.6) * 0.08;

      // Update holograms
      holoPlanes.forEach((p, i) => {
        updateHologram(p, time);
        p.material.opacity += (p.userData.targetOpacity - p.material.opacity) * 0.08;
        // Floating animation
        p.position.y = (1.5 - i * 0.4) + Math.sin(time * 1.5 + i * 0.3) * 0.03;
        p.position.x = Math.sin(time * 0.8 + i * 0.2) * 0.05;
        
        // Glitch
        if (Math.random() > 0.99) p.material.opacity *= 0.5;
      });

      // Screen glow pulse
      screenGlowMat.opacity = 0.08 + Math.sin(time * 2) * 0.04;
      screenLight.intensity = 0.7 + Math.sin(time * 1.5) * 0.2;

      particles.rotation.y += 0.0003;

      updateScreenTexture();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(typeInterval);
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}
