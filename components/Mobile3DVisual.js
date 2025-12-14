'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Mobile3DVisual() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000);
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
    container.appendChild(renderer.domElement);

    // Premium Materials
    const aluminumMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x2d2d3a,
      metalness: 0.9,
      roughness: 0.1
    });

    const darkMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1a1a24,
      metalness: 0.8,
      roughness: 0.2
    });

    const keyMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1f1f2a,
      metalness: 0.3,
      roughness: 0.6,
      emissive: 0x3a3a5a,
      emissiveIntensity: 0.05
    });

    // Code Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');

    const codeLines = [
      { tokens: [{ text: 'const', color: '#c792ea' }, { text: ' app = ', color: '#fff' }, { text: 'express', color: '#82aaff' }, { text: '();', color: '#89ddff' }] },
      { tokens: [] },
      { tokens: [{ text: 'app.', color: '#fff' }, { text: 'get', color: '#82aaff' }, { text: '(', color: '#89ddff' }, { text: '"/api"', color: '#c3e88d' }, { text: ', (req, res) => {', color: '#89ddff' }] },
      { tokens: [{ text: '  const', color: '#c792ea' }, { text: ' data = ', color: '#fff' }, { text: 'await', color: '#c792ea' }, { text: ' db.', color: '#fff' }, { text: 'query', color: '#82aaff' }, { text: '();', color: '#89ddff' }] },
      { tokens: [{ text: '  res.', color: '#fff' }, { text: 'json', color: '#82aaff' }, { text: '({ data });', color: '#89ddff' }] },
      { tokens: [{ text: '});', color: '#89ddff' }] }
    ];

    let displayLine = 0;
    let displayToken = 0;

    const updateCodeTexture = () => {
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(0, 0, 800, 600);
      
      // Window chrome
      const gradient = ctx.createLinearGradient(0, 0, 0, 40);
      gradient.addColorStop(0, '#2d333b');
      gradient.addColorStop(1, '#22272e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 800, 40);
      
      // Traffic lights
      ctx.fillStyle = '#ff5f56';
      ctx.beginPath(); ctx.arc(18, 20, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#ffbd2e';
      ctx.beginPath(); ctx.arc(40, 20, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#27c93f';
      ctx.beginPath(); ctx.arc(62, 20, 6, 0, Math.PI * 2); ctx.fill();
      
      ctx.fillStyle = '#c9d1d9';
      ctx.font = '14px -apple-system';
      ctx.fillText('server.js', 85, 25);
      
      // Line numbers
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(0, 40, 45, 560);
      
      ctx.font = 'bold 16px "SF Mono", monospace';
      
      codeLines.forEach((line, lineIndex) => {
        const y = 70 + lineIndex * 26;
        
        ctx.fillStyle = lineIndex <= displayLine ? '#484f58' : '#30363d';
        ctx.textAlign = 'right';
        ctx.fillText((lineIndex + 1).toString(), 38, y);
        ctx.textAlign = 'left';
        
        if (lineIndex === displayLine) {
          ctx.fillStyle = 'rgba(56, 139, 253, 0.15)';
          ctx.fillRect(45, y - 18, 755, 26);
        }
        
        let x = 55;
        line.tokens.forEach((token, tokenIndex) => {
          if (lineIndex < displayLine || (lineIndex === displayLine && tokenIndex <= displayToken)) {
            ctx.fillStyle = token.color;
            ctx.fillText(token.text, x, y);
          }
          x += ctx.measureText(token.text).width;
        });
        
        if (lineIndex === displayLine && Math.floor(Date.now() / 500) % 2 === 0) {
          let cursorX = 55;
          for (let t = 0; t <= displayToken && t < line.tokens.length; t++) {
            cursorX += ctx.measureText(line.tokens[t].text).width;
          }
          ctx.fillStyle = '#58a6ff';
          ctx.fillRect(cursorX, y - 14, 2, 20);
        }
      });
      
      screenTexture.needsUpdate = true;
    };

    const screenTexture = new THREE.CanvasTexture(canvas);

    // Laptop group
    const laptopGroup = new THREE.Group();
    scene.add(laptopGroup);

    // Base
    const base = new THREE.Mesh(
      new THREE.BoxGeometry(4, 0.15, 2.8),
      aluminumMaterial
    );
    base.position.set(0, -1, 0);
    base.castShadow = true;
    laptopGroup.add(base);

    // Keyboard plate
    const keyboardPlate = new THREE.Mesh(
      new THREE.BoxGeometry(3.6, 0.02, 2.2),
      darkMaterial
    );
    keyboardPlate.position.set(0, -0.9, 0.1);
    laptopGroup.add(keyboardPlate);

    // Keys
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 10; col++) {
        const key = new THREE.Mesh(
          new THREE.BoxGeometry(0.28, 0.025, 0.22),
          keyMaterial
        );
        key.position.set(-1.35 + col * 0.32, -0.87, -0.55 + row * 0.3);
        laptopGroup.add(key);
      }
    }

    // Trackpad
    const trackpad = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 0.01, 1),
      new THREE.MeshStandardMaterial({ color: 0x1a1a24, metalness: 0.5, roughness: 0.2 })
    );
    trackpad.position.set(0, -0.89, 0.8);
    laptopGroup.add(trackpad);

    // Screen lid
    const lid = new THREE.Mesh(
      new THREE.BoxGeometry(3.8, 2.6, 0.1),
      aluminumMaterial
    );
    lid.position.set(0, 0.2, -1);
    lid.rotation.x = -0.25;
    lid.castShadow = true;
    laptopGroup.add(lid);

    // Screen bezel
    const bezel = new THREE.Mesh(
      new THREE.BoxGeometry(3.5, 2.3, 0.02),
      new THREE.MeshStandardMaterial({ color: 0x0a0a0a })
    );
    bezel.position.set(0, 0.2, -0.93);
    bezel.rotation.x = -0.25;
    laptopGroup.add(bezel);

    // Screen
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(3.3, 2.1),
      new THREE.MeshBasicMaterial({ map: screenTexture })
    );
    screen.position.set(0, 0.2, -0.91);
    screen.rotation.x = -0.25;
    laptopGroup.add(screen);

    // Camera notch
    const notch = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.12, 0.02),
      new THREE.MeshStandardMaterial({ color: 0x0a0a0a })
    );
    notch.position.set(0, 1.35, -0.89);
    notch.rotation.x = -0.25;
    laptopGroup.add(notch);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.9);
    keyLight.position.set(3, 5, 3);
    keyLight.castShadow = true;
    scene.add(keyLight);
    
    const fillLight = new THREE.DirectionalLight(0x8b5cf6, 0.3);
    fillLight.position.set(-3, 3, -3);
    scene.add(fillLight);
    
    const screenGlow = new THREE.PointLight(0x58a6ff, 0.5, 5);
    screenGlow.position.set(0, 0, 1);
    scene.add(screenGlow);

    camera.position.set(0, 1, 4.5);
    camera.lookAt(0, -0.3, 0);

    let typingInterval = setInterval(() => {
      displayToken++;
      if (displayLine < codeLines.length - 1) {
        if (displayToken >= codeLines[displayLine].tokens.length) {
          displayLine++;
          displayToken = 0;
        }
      } else if (displayToken >= codeLines[displayLine].tokens.length) {
        setTimeout(() => {
          displayLine = 0;
          displayToken = 0;
        }, 2000);
      }
    }, 100);

    updateCodeTexture();

    let time = 0;
    let animationId;
    
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.008;
      
      // Gentle rotation
      laptopGroup.rotation.y = Math.sin(time * 0.5) * 0.12;
      
      // Floating
      laptopGroup.position.y = Math.sin(time * 0.6) * 0.05;
      
      // Screen glow pulse
      screenGlow.intensity = 0.4 + Math.sin(time * 2) * 0.15;
      
      updateCodeTexture();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      clearInterval(typingInterval);
      cancelAnimationFrame(animationId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}
