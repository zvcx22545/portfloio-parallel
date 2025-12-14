'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function FloatingShapes() {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        const container = mountRef.current;
        if (!container) return;

        const width = container.offsetWidth;
        const height = container.offsetHeight;

        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const shapes = [];

        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial({ wireframe: true })
        );
        cube.position.set(-2, 0, 0);
        shapes.push(cube);
        scene.add(cube);

        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.7, 16, 16),
            new THREE.MeshNormalMaterial({ wireframe: true })
        );
        sphere.position.set(2, 0, 0);
        shapes.push(sphere);
        scene.add(sphere);

        const torus = new THREE.Mesh(
            new THREE.TorusGeometry(0.6, 0.3, 16, 32),
            new THREE.MeshNormalMaterial({ wireframe: true })
        );
        torus.position.set(0, 1.5, 0);
        shapes.push(torus);
        scene.add(torus);

        camera.position.z = 5;

        let animationId;
        const animate = () => {
            animationId = requestAnimationFrame(animate);

            shapes.forEach((shape, i) => {
                shape.rotation.x += 0.01;
                shape.rotation.y += 0.01;
                shape.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
            });

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            if (container && renderer.domElement) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}
