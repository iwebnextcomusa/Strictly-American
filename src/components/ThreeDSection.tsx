import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, Sparkles, Shield, Eye, Cpu, Zap } from 'lucide-react';

export const ThreeDSection: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [colorTheme, setColorTheme] = useState<'navy' | 'crimson' | 'gold'>('navy');
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeViewMode, setActiveViewMode] = useState<'shield' | 'ring'>('shield');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const shieldMeshGroupRef = useRef<THREE.Group | null>(null);
  const ringGroupRef = useRef<THREE.Group | null>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const goldMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Clear previous canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.5);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const blueLight = new THREE.PointLight(0x0a2342, 4, 15);
    blueLight.position.set(-4, -2, 3);
    scene.add(blueLight);

    const redLight = new THREE.PointLight(0xb22234, 4, 15);
    redLight.position.set(4, 2, 3);
    scene.add(redLight);

    const cursorLight = new THREE.PointLight(0xffd700, 2, 10);
    cursorLight.position.set(0, 0, 4);
    scene.add(cursorLight);

    // 5. Build 3D Metallic Shield / Emblem Group
    const shieldGroup = new THREE.Group();

    // Metallic Shield Base Shape
    const shieldShape = new THREE.Shape();
    shieldShape.moveTo(0, 2.2);
    shieldShape.quadraticCurveTo(1.6, 2.2, 1.8, 1.2);
    shieldShape.quadraticCurveTo(2.0, -0.4, 0, -2.4);
    shieldShape.quadraticCurveTo(-2.0, -0.4, -1.8, 1.2);
    shieldShape.quadraticCurveTo(-1.6, 2.2, 0, 2.2);

    const extrudeSettings = {
      depth: 0.35,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 2,
      bevelSize: 0.1,
      bevelThickness: 0.12,
    };

    const geometry = new THREE.ExtrudeGeometry(shieldShape, extrudeSettings);
    geometry.center();

    const mainMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a2342,
      metalness: 0.85,
      roughness: 0.2,
      wireframe: false,
    });
    materialRef.current = mainMaterial;

    const shieldMesh = new THREE.Mesh(geometry, mainMaterial);
    shieldMesh.castShadow = true;
    shieldMesh.receiveShadow = true;
    shieldGroup.add(shieldMesh);

    // Gold Outer Rim Accent
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.15,
    });
    goldMaterialRef.current = goldMaterial;

    // Center Gold Star Emblem
    const starShape = new THREE.Shape();
    const points = 5;
    const outerRadius = 0.7;
    const innerRadius = 0.3;
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) starShape.moveTo(x, y);
      else starShape.lineTo(x, y);
    }
    const starGeometry = new THREE.ExtrudeGeometry(starShape, { depth: 0.15, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04 });
    starGeometry.center();
    const starMesh = new THREE.Mesh(starGeometry, goldMaterial);
    starMesh.position.z = 0.28;
    shieldGroup.add(starMesh);

    // Surrounding Floating Stars Ring
    for (let i = 0; i < 13; i++) {
      const angle = (i / 13) * Math.PI * 2;
      const radius = 2.8;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      const miniStarGeom = new THREE.ExtrudeGeometry(starShape, { depth: 0.05, bevelEnabled: false });
      miniStarGeom.scale(0.18, 0.18, 0.18);
      miniStarGeom.center();
      const miniStar = new THREE.Mesh(miniStarGeom, goldMaterial);
      miniStar.position.set(x, y, 0);
      shieldGroup.add(miniStar);
    }

    scene.add(shieldGroup);
    shieldMeshGroupRef.current = shieldGroup;

    // 6. Build 3D Ring Object (Alternative View)
    const ringGroup = new THREE.Group();
    const torusGeom = new THREE.TorusGeometry(2.2, 0.12, 16, 100);
    const torusMesh = new THREE.Mesh(torusGeom, goldMaterial);
    ringGroup.add(torusMesh);

    // Inner orbiting sphere icons
    for (let i = 0; i < 3; i++) {
      const sphereGeom = new THREE.IcosahedronGeometry(0.35, 2);
      const sphereMat = new THREE.MeshStandardMaterial({ color: i === 0 ? 0xb22234 : i === 1 ? 0x0a2342 : 0xffffff, metalness: 0.9, roughness: 0.1 });
      const sphereMesh = new THREE.Mesh(sphereGeom, sphereMat);
      const angle = (i / 3) * Math.PI * 2;
      sphereMesh.position.set(Math.cos(angle) * 2.2, Math.sin(angle) * 2.2, 0);
      ringGroup.add(sphereMesh);
    }
    ringGroup.visible = false;
    scene.add(ringGroup);
    ringGroupRef.current = ringGroup;

    // Mouse Move interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      cursorLight.position.x = mouseX * 4;
      cursorLight.position.y = mouseY * 4;
    };
    container.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (shieldMeshGroupRef.current) {
        if (autoRotate) {
          shieldMeshGroupRef.current.rotation.y = elapsedTime * 0.6;
          shieldMeshGroupRef.current.rotation.x = Math.sin(elapsedTime * 0.4) * 0.15;
        } else {
          shieldMeshGroupRef.current.rotation.y += (mouseX * 0.8 - shieldMeshGroupRef.current.rotation.y) * 0.05;
          shieldMeshGroupRef.current.rotation.x += (-mouseY * 0.8 - shieldMeshGroupRef.current.rotation.x) * 0.05;
        }
        shieldMeshGroupRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.1;
      }

      if (ringGroupRef.current) {
        ringGroupRef.current.rotation.z = elapsedTime * 0.3;
        ringGroupRef.current.rotation.x = elapsedTime * 0.2;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, []);

  // Handle Color Theme Updates
  useEffect(() => {
    if (!materialRef.current) return;
    if (colorTheme === 'navy') {
      materialRef.current.color.setHex(0x0a2342);
    } else if (colorTheme === 'crimson') {
      materialRef.current.color.setHex(0xb22234);
    } else if (colorTheme === 'gold') {
      materialRef.current.color.setHex(0xd4af37);
    }
  }, [colorTheme]);

  // Toggle View Objects
  useEffect(() => {
    if (shieldMeshGroupRef.current && ringGroupRef.current) {
      shieldMeshGroupRef.current.visible = activeViewMode === 'shield';
      ringGroupRef.current.visible = activeViewMode === 'ring';
    }
  }, [activeViewMode]);

  return (
    <section className="relative py-20 bg-[#FDFCFB] overflow-hidden border-y border-[#0A2342]/10 text-[#0A2342]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Description Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A2342] text-[10px] uppercase tracking-[0.2em] font-bold text-white shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Interactive 3D Heritage Showcase
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#0A2342] tracking-tight leading-tight italic">
              Crafted with Precision. <br />
              <span className="text-[#B22234]">Inspected in 3D Real-Time.</span>
            </h2>

            <p className="text-[#0A2342]/80 text-sm sm:text-base font-serif italic leading-relaxed">
              Every garment carrying the Strictly American crest is subject to 100% domestic quality control. Drag, tilt, and examine our signature metallic emblem representing Texas cotton, California tailoring, and North Carolina weave heritage.
            </p>

            {/* Interactive 3D Controls */}
            <div className="pt-4 border-t border-[#0A2342]/10 space-y-4">
              
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#0A2342]/60 font-bold">Finish Variant:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setColorTheme('navy')}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                      colorTheme === 'navy' ? 'bg-[#0A2342] border-[#0A2342] text-white shadow' : 'bg-[#F3F1EF] border-transparent text-[#0A2342]/70'
                    }`}
                  >
                    Patriot Navy
                  </button>
                  <button
                    onClick={() => setColorTheme('crimson')}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                      colorTheme === 'crimson' ? 'bg-[#B22234] border-[#B22234] text-white shadow' : 'bg-[#F3F1EF] border-transparent text-[#0A2342]/70'
                    }`}
                  >
                    Crimson Red
                  </button>
                  <button
                    onClick={() => setColorTheme('gold')}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                      colorTheme === 'gold' ? 'bg-[#D4AF37] border-[#D4AF37] text-black font-bold shadow' : 'bg-[#F3F1EF] border-transparent text-[#0A2342]/70'
                    }`}
                  >
                    Heritage Gold
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#0A2342] hover:bg-[#B22234] text-[10px] uppercase tracking-wider font-bold text-white rounded transition-colors shadow-sm"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
                  {autoRotate ? 'Pause 3D Orbit' : 'Resume 3D Orbit'}
                </button>

                <div className="flex items-center gap-1 bg-[#F3F1EF] p-1 rounded border border-[#0A2342]/10">
                  <button
                    onClick={() => setActiveViewMode('shield')}
                    className={`px-3 py-1 rounded text-[10px] uppercase tracking-wider font-bold transition-colors ${
                      activeViewMode === 'shield' ? 'bg-[#B22234] text-white' : 'text-[#0A2342]/70'
                    }`}
                  >
                    Shield Crest
                  </button>
                  <button
                    onClick={() => setActiveViewMode('ring')}
                    className={`px-3 py-1 rounded text-[10px] uppercase tracking-wider font-bold transition-colors ${
                      activeViewMode === 'ring' ? 'bg-[#B22234] text-white' : 'text-[#0A2342]/70'
                    }`}
                  >
                    Orbit Ring
                  </button>
                </div>
              </div>

            </div>

            {/* Feature Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center">
              <div className="p-3 rounded-lg bg-[#F3F1EF] border border-[#0A2342]/10">
                <Shield className="w-5 h-5 mx-auto text-[#B22234] mb-1" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A2342] block">100% US Sourced</span>
              </div>
              <div className="p-3 rounded-lg bg-[#F3F1EF] border border-[#0A2342]/10">
                <Cpu className="w-5 h-5 mx-auto text-[#0A2342] mb-1" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A2342] block">Real-Time WebGL</span>
              </div>
              <div className="p-3 rounded-lg bg-[#F3F1EF] border border-[#0A2342]/10">
                <Zap className="w-5 h-5 mx-auto text-[#B22234] mb-1" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A2342] block">Interactive Light</span>
              </div>
            </div>

          </div>

          {/* Right Interactive 3D Canvas */}
          <div className="lg:col-span-7 relative h-[420px] sm:h-[480px] rounded-xl bg-[#F3F1EF] p-2 shadow-sm flex items-center justify-center overflow-hidden border border-[#0A2342]/15 group">
            
            <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Instruction Overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#0A2342]/90 backdrop-blur-md px-4 py-2 rounded-lg text-[10px] uppercase tracking-wider text-white flex items-center justify-between border border-white/10 pointer-events-none">
              <span className="flex items-center gap-1.5 font-bold">
                <Eye className="w-3.5 h-3.5 text-amber-300" />
                Move cursor over canvas to direct illumination.
              </span>
              <span className="text-white/70 hidden sm:inline">Three.js Hardware Accelerated</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
