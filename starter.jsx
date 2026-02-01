import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Terminal, Cpu, Database, Wifi, Shield, Code, Layers, MapPin, Calendar, Award, Navigation, Compass, ExternalLink, Star } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
// CONTACT INFO
// ═══════════════════════════════════════════════════════════════════════════════

const CONTACT = {
  github: 'https://github.com/Sedulous-sedu',
  linkedin: 'https://www.linkedin.com/in/abinraj/',
  email: 'abin.abhiraj@gmail.com'
};

// ═══════════════════════════════════════════════════════════════════════════════
// ZONE CONFIGURATION - 3D Spatial Positions
// ═══════════════════════════════════════════════════════════════════════════════

const ZONES = {
  home: { x: 0, y: 0, z: 0, label: 'HOME', key: '1' },
  projects: { x: 1200, y: 0, z: -800, label: 'PROJECTS', key: '2' },
  skills: { x: -1200, y: 0, z: -800, label: 'SKILLS', key: '3' },
  experience: { x: 0, y: 400, z: -1400, label: 'EXPERIENCE', key: '4' },
  contact: { x: 0, y: 0, z: -2200, label: 'CONTACT', key: '5' }
};

const CAMERA_DEFAULTS = {
  position: { x: 0, y: 0, z: 800 },
  rotation: { x: 0, y: 0 },
  speed: 15,
  rotationSpeed: 0.3,
  friction: 0.92,
  zoomSpeed: 50
};

// ═══════════════════════════════════════════════════════════════════════════════
// REAL GITHUB PROJECTS
// ═══════════════════════════════════════════════════════════════════════════════

const projectsData = [
  {
    id: 'sentinel',
    title: 'SENTINEL',
    subtitle: 'Raspberry Pi System Monitor with Web Dashboard',
    tags: ['Python', 'CSS', 'Raspberry Pi', 'systemd'],
    status: 'DEPLOYED',
    url: 'https://github.com/Sedulous-sedu/sentinel'
  },
  {
    id: 'suhail-ai',
    title: 'SUHAIL AI',
    subtitle: 'AI-Powered Mobile Application',
    tags: ['Dart', 'Flutter', 'AI', 'MIT License'],
    status: 'ACTIVE',
    url: 'https://github.com/Sedulous-sedu/Suhail_AI'
  },
  {
    id: 'motion-profile',
    title: 'ADVANCED MOTION PROFILE',
    subtitle: 'Motor Motion Profile Generator',
    tags: ['C++', 'Embedded', 'Control Systems'],
    status: 'ACTIVE',
    url: 'https://github.com/Sedulous-sedu/advanced-motion-profile'
  },
  {
    id: 'news-haiku',
    title: 'DAILY NEWS HAIKU',
    subtitle: 'LLM-Powered News to Haiku Converter',
    tags: ['JavaScript', 'HackerNews API', 'LLM'],
    status: 'ACTIVE',
    url: 'https://github.com/Sedulous-sedu/daily-news-haiku'
  },
  {
    id: 'ascii-camera',
    title: 'REAL-TIME ASCII CAMERA',
    subtitle: 'Matrix-style ASCII webcam art',
    tags: ['JavaScript', 'Canvas', 'WebRTC'],
    status: 'DEPLOYED',
    url: 'https://github.com/Sedulous-sedu/Real-Time-ASCII-Camera'
  },
  {
    id: 'drum-machine',
    title: 'BROWSER DRUM MACHINE',
    subtitle: 'Web Audio API Drum Sequencer',
    tags: ['JavaScript', 'Web Audio', 'MIT License'],
    status: 'DEPLOYED',
    url: 'https://github.com/Sedulous-sedu/browser-drum-machine',
    homepage: 'https://browser-drum-machine.vercel.app'
  },
  {
    id: 'github-galaxy',
    title: 'GITHUB GALAXY',
    subtitle: '3D GitHub Data Visualization',
    tags: ['React', 'Three.js', 'WebGL', 'Vite'],
    status: 'ACTIVE',
    url: 'https://github.com/Sedulous-sedu/github-galaxy'
  },
  {
    id: 'aurak-insights',
    title: 'AURAK INSIGHTS DASHBOARD',
    subtitle: 'University Analytics Platform',
    tags: ['TypeScript', 'React', 'Data Viz'],
    status: 'ACTIVE',
    url: 'https://github.com/Sedulous-sedu/AURAK-Insights-Dashboard'
  },
  {
    id: 'ai-weather',
    title: 'AI WEATHER',
    subtitle: 'AI-Powered Weather Application',
    tags: ['HTML', 'JavaScript', 'AI'],
    status: 'ACTIVE',
    url: 'https://github.com/Sedulous-sedu/AI_weather'
  },
  {
    id: 'sic',
    title: 'SIC',
    subtitle: 'Python Automation Project',
    tags: ['Python', 'Automation'],
    status: 'DEVELOPMENT',
    url: 'https://github.com/Sedulous-sedu/SIC'
  },
  {
    id: 'tictactoe',
    title: 'TICTACTOE',
    subtitle: 'C++ Console Game',
    tags: ['C++', 'Console', 'Game'],
    status: 'COMPLETE',
    url: 'https://github.com/Sedulous-sedu/TickTacToe'
  },
  {
    id: 'keypad',
    title: 'KEYPAD',
    subtitle: 'Hardware Documentation Project',
    tags: ['TeX', 'Hardware', 'Documentation'],
    status: 'COMPLETE',
    url: 'https://github.com/Sedulous-sedu/Keypad'
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// CUSTOM HOOKS
// ═══════════════════════════════════════════════════════════════════════════════

const useAnimationFrame = (callback) => {
  const requestRef = useRef();
  const previousTimeRef = useRef();

  useEffect(() => {
    const animate = (time) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime, time);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [callback]);
};

const useKeyboard = () => {
  const [keys, setKeys] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['w', 'a', 's', 'd', 'q', 'e', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
      setKeys(prev => ({ ...prev, [e.key.toLowerCase()]: true }));
    };
    const handleKeyUp = (e) => {
      setKeys(prev => ({ ...prev, [e.key.toLowerCase()]: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keys;
};

// ═══════════════════════════════════════════════════════════════════════════════
// STARFIELD BACKGROUND
// ═══════════════════════════════════════════════════════════════════════════════

const Starfield = ({ cameraZ }) => {
  const stars = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 300; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 6000,
        y: (Math.random() - 0.5) * 4000,
        z: Math.random() * -4000,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
    return arr;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ perspective: '1000px' }}>
      {stars.map((star, i) => {
        const relZ = star.z - cameraZ + 800;
        const scale = Math.max(0.1, 1 + relZ / 2000);
        const opacity = Math.max(0, Math.min(1, star.opacity * (1 - relZ / 3000)));

        return (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: '50%',
              top: '50%',
              width: star.size * scale,
              height: star.size * scale,
              opacity,
              transform: `translate3d(${star.x * scale}px, ${star.y * scale}px, ${relZ}px)`,
              boxShadow: `0 0 ${star.size * 2}px rgba(100, 200, 255, ${opacity})`
            }}
          />
        );
      })}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// MINI MAP / RADAR
// ═══════════════════════════════════════════════════════════════════════════════

const MiniMap = ({ cameraPosition, activeZone }) => {
  const scale = 0.05;

  return (
    <div className="fixed bottom-6 right-6 w-48 h-48 rounded-xl border border-cyan-500/30 bg-black/60 backdrop-blur-xl overflow-hidden z-50">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle, rgba(0,255,200,0.3) 1px, transparent 1px)',
        backgroundSize: '10px 10px'
      }} />

      <div className="absolute top-2 left-2 font-mono text-[8px] text-cyan-500/60">SPATIAL RADAR</div>

      <div className="absolute inset-0 flex items-center justify-center">
        {/* Zone markers */}
        {Object.entries(ZONES).map(([key, zone]) => {
          const x = zone.x * scale;
          const z = -zone.z * scale;
          const isActive = activeZone === key;

          return (
            <div
              key={key}
              className={`absolute w-3 h-3 rounded-full transition-all duration-300 ${isActive ? 'bg-cyan-400 shadow-[0_0_10px_rgba(0,255,200,0.8)]' : 'bg-white/30'
                }`}
              style={{
                transform: `translate(${x}px, ${z}px)`,
                left: '50%',
                top: '50%'
              }}
            >
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-mono text-[6px] text-white/50 whitespace-nowrap">
                {zone.label}
              </span>
            </div>
          );
        })}

        {/* Camera position (you) */}
        <div
          className="absolute w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,1)] z-10"
          style={{
            transform: `translate(${cameraPosition.x * scale}px, ${-cameraPosition.z * scale}px)`,
            left: '50%',
            top: '50%'
          }}
        />
      </div>

      <div className="absolute bottom-2 left-2 right-2 flex justify-between font-mono text-[7px] text-white/30">
        <span>X: {cameraPosition.x.toFixed(0)}</span>
        <span>Z: {cameraPosition.z.toFixed(0)}</span>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// NAVIGATION HUD
// ═══════════════════════════════════════════════════════════════════════════════

const NavigationHUD = ({ activeZone, onTeleport }) => {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10">
        {Object.entries(ZONES).map(([key, zone]) => (
          <button
            key={key}
            onClick={() => onTeleport(key)}
            className={`px-4 py-2 rounded-xl font-mono text-xs transition-all ${activeZone === key
              ? 'bg-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(0,255,200,0.3)]'
              : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
          >
            <span className="text-[10px] text-white/30 mr-1">[{zone.key}]</span>
            {zone.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// CONTROLS HELP
// ═══════════════════════════════════════════════════════════════════════════════

const ControlsHelp = ({ visible }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-6 left-6 p-4 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 font-mono text-[10px] z-50"
      >
        <div className="text-cyan-400 mb-2">// NAVIGATION</div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-white/50">
          <span>W/↑ Forward</span>
          <span>S/↓ Back</span>
          <span>A/← Left</span>
          <span>D/→ Right</span>
          <span>Q Rise</span>
          <span>E Descend</span>
          <span>Mouse Drag</span>
          <span>Look Around</span>
          <span>Scroll</span>
          <span>Zoom</span>
          <span>1-5</span>
          <span>Teleport</span>
        </div>
        <div className="mt-2 text-white/30">Press H to hide</div>
      </motion.div>
    )}
  </AnimatePresence>
);

// ═══════════════════════════════════════════════════════════════════════════════
// 3D ZONE PORTAL (Glowing entry)
// ═══════════════════════════════════════════════════════════════════════════════

const ZonePortal = ({ zone, children, isActive }) => {
  return (
    <div
      className="absolute"
      style={{
        transform: `translate3d(${zone.x}px, ${zone.y}px, ${zone.z}px)`,
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Portal glow */}
      <div
        className={`absolute -inset-20 rounded-full transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-30'}`}
        style={{
          background: 'radial-gradient(circle, rgba(0,255,200,0.15) 0%, transparent 70%)',
          filter: 'blur(20px)'
        }}
      />

      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION CONTENT COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

const HeroContent = () => (
  <div className="w-[800px] text-center">
    <div className="font-mono text-[10px] text-cyan-500/60 mb-4 tracking-widest">
      // ORIGIN_POINT [0, 0, 0]
    </div>

    <h1 className="text-7xl font-black text-white mb-4 leading-none">
      ABIN RAJ
    </h1>
    <h2 className="text-2xl font-light text-white/60 mb-2">DEVARAJAN</h2>

    <div className="font-mono text-xl text-cyan-400 mb-8">
      Computer Engineer // AI Specialist // IoT Architect
    </div>

    <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
      Building intelligent systems at the intersection of hardware and software.
      Navigate through 3D space to explore my work.
    </p>

    <div className="flex justify-center gap-6 font-mono text-[10px]">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-emerald-500/80">STATUS: ONLINE</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-cyan-500" />
        <span className="text-cyan-500/80">12 PUBLIC REPOS</span>
      </div>
    </div>

    {/* Central orb */}
    <div className="mt-12 flex justify-center">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 animate-pulse" />
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
          <Cpu className="w-12 h-12 text-black" />
        </div>
        {/* Orbiting ring */}
        <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-spin" style={{ animationDuration: '10s' }} />
      </div>
    </div>

    {/* Quick links */}
    <div className="mt-8 flex justify-center gap-4">
      <a href={CONTACT.github} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all">
        <Github className="w-4 h-4 text-white" />
        <span className="text-white/70 text-sm font-mono">Sedulous-sedu</span>
      </a>
    </div>
  </div>
);

const ProjectsContent = () => {
  const [page, setPage] = useState(0);
  const projectsPerPage = 6;
  const totalPages = Math.ceil(projectsData.length / projectsPerPage);
  const displayedProjects = projectsData.slice(page * projectsPerPage, (page + 1) * projectsPerPage);

  const statusColors = {
    DEPLOYED: 'text-emerald-400',
    ACTIVE: 'text-cyan-400',
    DEVELOPMENT: 'text-amber-400',
    COMPLETE: 'text-purple-400'
  };

  return (
    <div className="w-[1000px]">
      <div className="font-mono text-[10px] text-cyan-500/60 mb-2">// ZONE: PROJECTS [1200, 0, -800]</div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-5xl font-black text-white">MISSION LOGS</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-3 py-1 rounded border border-white/10 text-white/50 hover:bg-white/5 disabled:opacity-30 font-mono text-xs"
          >
            ← PREV
          </button>
          <span className="px-3 py-1 font-mono text-xs text-cyan-500">{page + 1}/{totalPages}</span>
          <button
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="px-3 py-1 rounded border border-white/10 text-white/50 hover:bg-white/5 disabled:opacity-30 font-mono text-xs"
          >
            NEXT →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {displayedProjects.map((p, i) => (
          <motion.a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="block p-5 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.05] hover:border-cyan-500/30 transition-all group"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="font-mono text-[8px] text-cyan-500/50 mb-1">//PROJECT_{p.id.toUpperCase()}</div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">{p.title}</h3>
                <p className="text-white/40 text-xs">{p.subtitle}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[8px] font-mono ${statusColors[p.status]}`}>◉ {p.status}</span>
                <ExternalLink className="w-3 h-3 text-white/20 group-hover:text-cyan-400 transition-colors" />
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {p.tags.map(t => (
                <span key={t} className="px-2 py-0.5 bg-white/5 rounded text-[8px] font-mono text-white/40">{t}</span>
              ))}
            </div>
            {p.homepage && (
              <div className="mt-2 font-mono text-[8px] text-emerald-400/60">
                🌐 LIVE: {p.homepage}
              </div>
            )}
          </motion.a>
        ))}
      </div>

      <div className="mt-6 text-center">
        <a
          href={CONTACT.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 transition-all"
        >
          <Github className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400 font-mono text-sm">VIEW ALL ON GITHUB</span>
        </a>
      </div>
    </div>
  );
};

const skillNodes = [
  { id: 'python', name: 'Python', x: 0, y: -100 },
  { id: 'cpp', name: 'C/C++', x: -120, y: -50 },
  { id: 'js', name: 'JavaScript', x: 120, y: -50 },
  { id: 'ts', name: 'TypeScript', x: 180, y: 10 },
  { id: 'dart', name: 'Dart/Flutter', x: -180, y: 10 },
  { id: 'react', name: 'React', x: 140, y: 60 },
  { id: 'threejs', name: 'Three.js', x: 60, y: 90 },
  { id: 'tensorflow', name: 'TensorFlow', x: -60, y: 60 },
  { id: 'rpi', name: 'Raspberry Pi', x: -140, y: 90 },
  { id: 'stm32', name: 'Embedded C', x: -100, y: 130 },
  { id: 'webgl', name: 'WebGL', x: 100, y: 130 },
  { id: 'html', name: 'HTML/CSS', x: 0, y: 50 },
];

const SkillsContent = () => (
  <div className="w-[700px]">
    <div className="font-mono text-[10px] text-cyan-500/60 mb-2">// ZONE: SKILLS [-1200, 0, -800]</div>
    <h2 className="text-5xl font-black text-white mb-8">NEURAL MATRIX</h2>

    <div className="relative h-[320px]">
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <line x1="350" y1="60" x2="230" y2="110" stroke="rgba(0,255,200,0.2)" strokeWidth="1" />
        <line x1="350" y1="60" x2="470" y2="110" stroke="rgba(0,255,200,0.2)" strokeWidth="1" />
        <line x1="350" y1="60" x2="350" y2="210" stroke="rgba(0,255,200,0.2)" strokeWidth="1" />
        <line x1="470" y1="110" x2="490" y2="170" stroke="rgba(0,255,200,0.2)" strokeWidth="1" />
        <line x1="230" y1="110" x2="210" y2="170" stroke="rgba(0,255,200,0.2)" strokeWidth="1" />
        <line x1="350" y1="210" x2="290" y2="220" stroke="rgba(0,255,200,0.2)" strokeWidth="1" />
        <line x1="350" y1="210" x2="410" y2="220" stroke="rgba(0,255,200,0.2)" strokeWidth="1" />
      </svg>

      {/* Skill nodes */}
      {skillNodes.map((skill, i) => (
        <motion.div
          key={skill.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.08, type: 'spring' }}
          className="absolute px-3 py-1.5 rounded-lg bg-white/5 border border-cyan-500/30 backdrop-blur-sm font-mono text-[11px] text-cyan-400 hover:bg-cyan-500/20 hover:scale-110 transition-all cursor-pointer whitespace-nowrap"
          style={{
            left: `calc(50% + ${skill.x}px)`,
            top: `calc(50% + ${skill.y}px)`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {skill.name}
        </motion.div>
      ))}
    </div>

    <div className="mt-4 flex justify-center gap-4 font-mono text-[9px]">
      <span className="text-cyan-400">◉ Languages</span>
      <span className="text-emerald-400">◉ Frameworks</span>
      <span className="text-purple-400">◉ Hardware</span>
    </div>
  </div>
);

const experienceData = [
  { role: 'Founder & Lead Engineer', company: 'Suhail Smart Solutions', period: '2023 - NOW', location: 'UAE' },
  { role: 'Computer Engineering Student', company: 'American University of Ras Al Khaimah', period: '2021 - 2025', location: 'UAE' },
  { role: 'Embedded Systems Developer', company: 'Freelance/Projects', period: '2022 - Present', location: 'Remote' }
];

const ExperienceContent = () => (
  <div className="w-[700px]">
    <div className="font-mono text-[10px] text-cyan-500/60 mb-2">// ZONE: EXPERIENCE [0, 400, -1400]</div>
    <h2 className="text-5xl font-black text-white mb-8">SERVICE RECORD</h2>

    <div className="space-y-6">
      {experienceData.map((exp, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15 }}
          className="p-6 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 mb-2 font-mono text-[9px] text-cyan-500/50">
            <Calendar className="w-3 h-3" />
            <span>{exp.period}</span>
            <span className="text-white/20">|</span>
            <MapPin className="w-3 h-3" />
            <span>{exp.location}</span>
          </div>
          <h3 className="text-lg font-bold text-white">{exp.role}</h3>
          <p className="text-cyan-400 text-sm">{exp.company}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const ContactContent = () => (
  <div className="w-[600px] text-center">
    <div className="font-mono text-[10px] text-cyan-500/60 mb-2">// DESTINATION [0, 0, -2200]</div>
    <h2 className="text-5xl font-black text-white mb-6">ESTABLISH LINK</h2>
    <p className="text-white/50 mb-8">Ready to collaborate on your next mission?</p>

    <div className="flex flex-col gap-4 items-center">
      <motion.a
        href={`mailto:${CONTACT.email}`}
        whileHover={{ scale: 1.02, y: -2 }}
        className="w-full max-w-md flex items-center gap-4 px-6 py-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all group"
      >
        <Mail className="w-6 h-6 text-cyan-500" />
        <div className="text-left">
          <div className="text-white group-hover:text-cyan-400 transition-colors font-medium">Email</div>
          <div className="text-white/40 text-sm font-mono">{CONTACT.email}</div>
        </div>
      </motion.a>

      <motion.a
        href={CONTACT.github}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02, y: -2 }}
        className="w-full max-w-md flex items-center gap-4 px-6 py-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-purple-500/10 hover:border-purple-500/50 transition-all group"
      >
        <Github className="w-6 h-6 text-purple-500" />
        <div className="text-left">
          <div className="text-white group-hover:text-purple-400 transition-colors font-medium">GitHub</div>
          <div className="text-white/40 text-sm font-mono">github.com/Sedulous-sedu</div>
        </div>
      </motion.a>

      <motion.a
        href={CONTACT.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02, y: -2 }}
        className="w-full max-w-md flex items-center gap-4 px-6 py-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-blue-500/10 hover:border-blue-500/50 transition-all group"
      >
        <Linkedin className="w-6 h-6 text-blue-500" />
        <div className="text-left">
          <div className="text-white group-hover:text-blue-400 transition-colors font-medium">LinkedIn</div>
          <div className="text-white/40 text-sm font-mono">linkedin.com/in/abinraj</div>
        </div>
      </motion.a>
    </div>

    <div className="mt-12 font-mono text-[10px] text-white/20">
      DESIGNED & BUILT BY ABIN RAJ DEVARAJAN // 2026
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN 3D CANVAS APP
// ═══════════════════════════════════════════════════════════════════════════════

export default function Portfolio() {
  const [camera, setCamera] = useState(CAMERA_DEFAULTS.position);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0, z: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showHelp, setShowHelp] = useState(true);
  const [activeZone, setActiveZone] = useState('home');

  const keys = useKeyboard();
  const containerRef = useRef(null);

  // Find closest zone
  useEffect(() => {
    let closest = 'home';
    let minDist = Infinity;

    Object.entries(ZONES).forEach(([key, zone]) => {
      const dist = Math.sqrt(
        Math.pow(camera.x - zone.x, 2) +
        Math.pow(camera.y - zone.y, 2) +
        Math.pow(camera.z - 800 - zone.z, 2)
      );
      if (dist < minDist) {
        minDist = dist;
        closest = key;
      }
    });

    setActiveZone(closest);
  }, [camera]);

  // Keyboard teleport
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'h') setShowHelp(prev => !prev);

      const zoneByKey = Object.entries(ZONES).find(([_, z]) => z.key === e.key);
      if (zoneByKey) {
        teleportTo(zoneByKey[0]);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);

  // Main physics loop
  useAnimationFrame(useCallback(() => {
    const { speed, friction } = CAMERA_DEFAULTS;

    let ax = 0, ay = 0, az = 0;

    if (keys.w || keys.arrowup) az = -speed;
    if (keys.s || keys.arrowdown) az = speed;
    if (keys.a || keys.arrowleft) ax = -speed;
    if (keys.d || keys.arrowright) ax = speed;
    if (keys.q) ay = -speed;
    if (keys.e) ay = speed;

    setVelocity(prev => ({
      x: (prev.x + ax) * friction,
      y: (prev.y + ay) * friction,
      z: (prev.z + az) * friction
    }));

    setCamera(prev => ({
      x: prev.x + velocity.x,
      y: Math.max(-500, Math.min(500, prev.y + velocity.y)),
      z: Math.max(-1500, Math.min(1500, prev.z + velocity.z))
    }));
  }, [keys, velocity]));

  // Mouse drag for rotation
  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;

    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;

    setRotation(prev => ({
      x: Math.max(-30, Math.min(30, prev.x - dy * CAMERA_DEFAULTS.rotationSpeed)),
      y: prev.y + dx * CAMERA_DEFAULTS.rotationSpeed
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Scroll zoom
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    setCamera(prev => ({
      ...prev,
      z: Math.max(-1500, Math.min(1500, prev.z + (e.deltaY > 0 ? CAMERA_DEFAULTS.zoomSpeed : -CAMERA_DEFAULTS.zoomSpeed)))
    }));
  }, []);

  // Teleport function
  const teleportTo = useCallback((zoneKey) => {
    const zone = ZONES[zoneKey];
    if (!zone) return;

    setCamera({ x: zone.x, y: zone.y, z: zone.z + 800 });
    setVelocity({ x: 0, y: 0, z: 0 });
    setRotation({ x: 0, y: 0 });
  }, []);

  // Camera transform
  const worldTransform = useMemo(() => {
    return `
      translateZ(${-camera.z}px)
      rotateX(${rotation.x}deg)
      rotateY(${rotation.y}deg)
      translateX(${-camera.x}px)
      translateY(${-camera.y}px)
    `;
  }, [camera, rotation]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-[#030712] overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* Starfield */}
      <Starfield cameraZ={camera.z} />

      {/* 3D World */}
      <div
        className="fixed inset-0 flex items-center justify-center"
        style={{ perspective: '1000px', perspectiveOrigin: '50% 50%' }}
      >
        <div
          style={{
            transformStyle: 'preserve-3d',
            transform: worldTransform,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out'
          }}
        >
          {/* HOME */}
          <ZonePortal zone={ZONES.home} isActive={activeZone === 'home'}>
            <HeroContent />
          </ZonePortal>

          {/* PROJECTS */}
          <ZonePortal zone={ZONES.projects} isActive={activeZone === 'projects'}>
            <ProjectsContent />
          </ZonePortal>

          {/* SKILLS */}
          <ZonePortal zone={ZONES.skills} isActive={activeZone === 'skills'}>
            <SkillsContent />
          </ZonePortal>

          {/* EXPERIENCE */}
          <ZonePortal zone={ZONES.experience} isActive={activeZone === 'experience'}>
            <ExperienceContent />
          </ZonePortal>

          {/* CONTACT */}
          <ZonePortal zone={ZONES.contact} isActive={activeZone === 'contact'}>
            <ContactContent />
          </ZonePortal>
        </div>
      </div>

      {/* Navigation HUD */}
      <NavigationHUD activeZone={activeZone} onTeleport={teleportTo} />

      {/* Mini Map */}
      <MiniMap cameraPosition={camera} activeZone={activeZone} />

      {/* Controls Help */}
      <ControlsHelp visible={showHelp} />

      {/* Crosshair */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-40">
        <div className="w-6 h-6 border border-cyan-500/30 rounded-full" />
        <div className="absolute w-1 h-1 bg-cyan-500/50 rounded-full" />
      </div>
    </div>
  );
}