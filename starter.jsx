import React, { useState, useEffect, useRef, useMemo, useCallback, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useFBX, useAnimations, Environment, ContactShadows, Float, PresentationControls } from '@react-three/drei';
import { Github, Linkedin, Mail, MapPin, Calendar, ExternalLink, ChevronDown, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import * as THREE from 'three';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils';
import Lenis from 'lenis';

// ═══════════════════════════════════════════════════════════════════════════════
// PROFILE & CONFIG
// ═══════════════════════════════════════════════════════════════════════════════

const PROFILE = {
  name: "Abin Raj Devarajan",
  role: "Computer Engineering | AI & Embedded Systems",
  location: "Ras Al Khaimah, UAE",
  phone: "+971-55-3970058",
  email: "abin.abhiraj@gmail.com",
  summary: "Final-year Computer Engineering student delivering AI-enabled platforms, multi-modal computer vision systems, and production-ready full-stack applications. Strong execution record across internships and industry-linked capstone work."
};

const CONTACT = {
  github: 'https://github.com/Sedulous-sedu',
  linkedin: 'https://www.linkedin.com/in/abinraj/',
  email: PROFILE.email
};

const SECTIONS = [
  { id: 'home', label: 'HOME', number: '01' },
  { id: 'projects', label: 'PROJECTS', number: '02' },
  { id: 'skills', label: 'SKILLS', number: '03' },
  { id: 'experience', label: 'EXPERIENCE', number: '04' },
  { id: 'contact', label: 'CONTACT', number: '05' }
];

const MODELS = {
  hero: {
    path: 'models/model-6.glb',
    animationPath: 'models/Arm Stretching.fbx',
    type: 'animated-glb',
    scale: 4.5,
    position: [0, -6.5, 0]
  },
  heroGLB: { path: 'models/model.glb', type: 'glb', scale: 4.0, position: [0, -2.5, 0] },
  contact: { path: 'models/model-6.glb', type: 'glb', scale: 7.0, position: [0, -2.5, 0] }
};

// ═══════════════════════════════════════════════════════════════════════════════
// EDUCATION DATA
// ═══════════════════════════════════════════════════════════════════════════════

const EDUCATION = [
  {
    institution: "American University of Ras Al Khaimah (AURAK)",
    degree: "B.Sc. Computer Engineering (Final Year)",
    period: "2022 - Present",
    details: "CGPA: 3.2/4.00 | Relevant Coursework: Microprocessors, Embedded Systems, Machine Learning, Network Security, OS.",
    id: "EDU_01"
  },
  {
    institution: "Sharjah Indian School",
    degree: "High School (Computer Science)",
    period: "2019 - 2022",
    details: "Graduated with Distinction",
    id: "EDU_02"
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// EXPERIENCE DATA
// ═══════════════════════════════════════════════════════════════════════════════

const experienceData = [
  {
    company: "Suhail Smart Solutions",
    role: "Full-Stack Developer Intern",
    id: "EXP_01",
    period: "May 2025 - Jul 2025",
    location: "UAE",
    description: "Designed AI_Suhail, a unified AI hub. Co-authored technical architecture documentation. Built production-ready web apps with iterative QA.",
    tech: ["REACT", "AI/ML", "DOCS"]
  },
  {
    company: "Amtec Int'l Links FZC",
    role: "Full-Stack Developer Intern",
    id: "EXP_02",
    period: "May 2024 - Aug 2024",
    location: "Ras Al Khaimah",
    description: "Developed 'Mazari' marketplace (Flask, PostgreSQL, React). Optimized APIs by 40%. Implemented CI/CD with Docker & GitHub Actions.",
    tech: ["FLASK", "POSTGRES", "DOCKER"]
  },
  {
    company: "Al Baraha Building Contracting",
    role: "Business Development Manager",
    id: "EXP_03",
    period: "Mar 2022 - Present",
    location: "Ajman",
    description: "Built internal Python-MySQL systems for inventory & operations. Managed digital infrastructure and security hygiene.",
    tech: ["PYTHON", "ERP", "SECURITY"]
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// PROJECTS DATA
// ═══════════════════════════════════════════════════════════════════════════════

const projectsData = [
  {
    id: 'aurasentry',
    title: 'AURASENTRY',
    subtitle: 'Multi-modal PPE Detection System',
    type: 'CAPSTONE / DEPLOYED',
    tags: ['Python', 'TensorFlow', 'OpenCV', 'IoT'],
    status: 'DEPLOYED',
    url: 'https://github.com/Sedulous-sedu',
    gradient: 'from-emerald-500 to-cyan-500',
    desc: "Multi-modal warehouse surveillance for PPE detection, pallet compliance, and forklift monitoring."
  },
  {
    id: 'mazari',
    title: 'MAZARI',
    subtitle: 'Full-Stack Marketplace Platform',
    type: 'E-COMMERCE',
    tags: ['Flask', 'React', 'PostgreSQL', 'Docker'],
    status: 'DEPLOYED',
    url: 'https://github.com/Sedulous-sedu',
    gradient: 'from-purple-500 to-pink-500',
    desc: "Full-stack marketplace with payment integration (Stripe) and secure JWT authentication."
  },
  {
    id: 'ai-traffic',
    title: 'AI TRAFFIC',
    subtitle: 'Smart Traffic Light System',
    type: 'SIMULATION',
    tags: ['Python', 'OpenCV', 'TensorFlow'],
    status: 'COMPLETED',
    url: 'https://github.com/Sedulous-sedu',
    gradient: 'from-orange-500 to-red-500',
    desc: "Real-time traffic signal logic simulation utilizing Computer Vision for flow optimization."
  },
  {
    id: 'delta-robot',
    title: 'DEBRIS ROBOT',
    subtitle: 'Delta Robot (Mubadala Competition)',
    type: 'ROBOTICS',
    tags: ['Embedded', 'C++', 'Computer Vision'],
    status: 'COMPLETED',
    url: 'https://github.com/Sedulous-sedu',
    gradient: 'from-cyan-500 to-blue-500',
    desc: "Delta robot for debris collection (Mubadala Competition). Led embedded systems design."
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// SKILLS DATA
// ═══════════════════════════════════════════════════════════════════════════════

const SKILLS = {
  "EMBEDDED": ["Arduino", "ESP32", "STM32", "RTOS", "MQTT", "I2C/SPI"],
  "CODE": ["C/C++", "Python", "Java", "JavaScript"],
  "AI_VISION": ["TensorFlow", "OpenCV", "NumPy", "Pandas"],
  "WEB_DB": ["Flask", "React", "Node.js", "MySQL", "PostgreSQL"],
  "DEVOPS": ["Git", "Docker", "Kubernetes", "AWS"],
  "HARDWARE": ["Verilog", "VHDL", "Vivado", "Quartus", "Altium", "KiCad"],
  "SECURITY": ["ICS & SCADA", "Network Security"]
};

// Legacy format for existing components
const skillsData = [
  { name: 'Python', level: 95, category: 'CODE' },
  { name: 'C/C++', level: 90, category: 'CODE' },
  { name: 'JavaScript', level: 88, category: 'CODE' },
  { name: 'Java', level: 80, category: 'CODE' },
  { name: 'TensorFlow', level: 88, category: 'AI_VISION' },
  { name: 'OpenCV', level: 92, category: 'AI_VISION' },
  { name: 'NumPy/Pandas', level: 85, category: 'AI_VISION' },
  { name: 'Flask', level: 90, category: 'WEB_DB' },
  { name: 'React', level: 85, category: 'WEB_DB' },
  { name: 'PostgreSQL', level: 82, category: 'WEB_DB' },
  { name: 'Node.js', level: 80, category: 'WEB_DB' },
  { name: 'Arduino', level: 95, category: 'EMBEDDED' },
  { name: 'ESP32', level: 93, category: 'EMBEDDED' },
  { name: 'STM32', level: 85, category: 'EMBEDDED' },
  { name: 'MQTT', level: 88, category: 'EMBEDDED' },
  { name: 'Docker', level: 82, category: 'DEVOPS' },
  { name: 'Kubernetes', level: 75, category: 'DEVOPS' },
  { name: 'AWS', level: 78, category: 'DEVOPS' },
  { name: 'Git', level: 92, category: 'DEVOPS' },
  { name: 'Verilog/VHDL', level: 80, category: 'HARDWARE' },
  { name: 'Altium/KiCad', level: 78, category: 'HARDWARE' }
];

// ═══════════════════════════════════════════════════════════════════════════════
// AWARDS, CERTIFICATIONS & MEMBERSHIPS
// ═══════════════════════════════════════════════════════════════════════════════

const AWARDS = [
  { title: "Bronze Winner - IEEE CyberX Day 2026", issuer: "IEEE UAE Section; DESC" },
  { title: "Top 3 UAE (National Level)", issuer: "Huawei ICT Competition 2025" }
];

const CERTIFICATIONS = [
  "Prompt Engineering for ChatGPT (Vanderbilt)",
  "ARM Cortex-M Processors Overview",
  "NVIDIA AI Infrastructure & Ops",
  "AWS Academy Data Engineering",
  "SLB GoTech Conference Cert",
  "Huawei Advanced Search Algorithms"
];

const MEMBERSHIPS = [
  "Society of Engineers - UAE",
  "IEEE Member",
  "Sustainability Ambassador - UAE"
];

// ═══════════════════════════════════════════════════════════════════════════════
// CREATIVE ANIMATED BACKGROUND ELEMENTS
// ═══════════════════════════════════════════════════════════════════════════════

// Flying Birds Component
// 3D Bird Component
function Bird({ speed, factor, url, ...props }) {
  const { scene, animations } = useGLTF(url);
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const group = useRef();
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const action = actions[Object.keys(actions)[0]];
    if (action) {
      action.play();
      action.setEffectiveTimeScale(speed);
    }
  }, [actions, speed]);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + factor;
    const x = ((t % 30) - 15) * 3;

    if (group.current) {
      group.current.position.x = x;
      group.current.position.y = Math.sin(t) * 1 + props.position[1];
      group.current.rotation.z = Math.cos(t) * 0.1;
      group.current.rotation.y = Math.PI / 2;
    }
  });

  return (
    <group ref={group} dispose={null}>
      <primitive object={clone} {...props} />
    </group>
  );
}

useGLTF.preload('models/Stork.glb');

const FlyingBirds = () => {
  const birds = useMemo(() =>
    [...Array(5)].map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 20,
      y: (Math.random() - 0.5) * 10,
      scale: 0.03,
      speed: 0.8 + Math.random() * 0.5,
      factor: Math.random() * 100
    })), []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 h-screen w-screen">
      <Canvas camera={{ position: [0, 0, 20], fov: 45 }} gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
        <ambientLight intensity={2} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          {birds.map((bird) => (
            <Bird
              key={bird.id}
              url="models/Stork.glb"
              position={[0, bird.y, 0]}
              scale={[bird.scale, bird.scale, bird.scale]}
              speed={bird.speed}
              factor={bird.factor}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};

// Floating Orbs Component
const FloatingOrbs = () => {
  const orbs = useMemo(() =>
    [...Array(6)].map((_, i) => ({
      id: i,
      size: 60 + Math.random() * 100,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      duration: 20 + Math.random() * 15,
      delay: i * 3,
      color: ['cyan', 'purple', 'emerald', 'blue', 'pink', 'orange'][i],
    })), []
  );

  const colorMap = {
    cyan: 'from-cyan-500/20 to-cyan-500/5',
    purple: 'from-purple-500/20 to-purple-500/5',
    emerald: 'from-emerald-500/20 to-emerald-500/5',
    blue: 'from-blue-500/20 to-blue-500/5',
    pink: 'from-pink-500/20 to-pink-500/5',
    orange: 'from-orange-500/20 to-orange-500/5',
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {orbs.map(orb => (
        <motion.div
          key={orb.id}
          className={`absolute rounded-full bg-gradient-to-br ${colorMap[orb.color]} blur-3xl`}
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
          }}
          animate={{
            x: [0, 50, -30, 20, 0],
            y: [0, -40, 30, -20, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
            opacity: [0.3, 0.5, 0.4, 0.6, 0.3],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// Shooting Stars Component
const ShootingStars = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const createStar = () => {
      const id = Date.now();
      const newStar = {
        id,
        x: Math.random() * 100,
        y: Math.random() * 50,
        duration: 1 + Math.random() * 1.5,
      };
      setStars(prev => [...prev.slice(-5), newStar]);
    };

    const interval = setInterval(createStar, 3000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{ left: `${star.x}%`, top: `${star.y}%` }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            x: 150,
            y: 150,
          }}
          transition={{ duration: star.duration, ease: 'linear' }}
          onAnimationComplete={() => {
            setStars(prev => prev.filter(s => s.id !== star.id));
          }}
        >
          <div className="w-20 h-[1px] bg-gradient-to-r from-white to-transparent -rotate-45 origin-left" />
        </motion.div>
      ))}
    </div>
  );
};

// Floating Code Symbols
const FloatingCodeSymbols = () => {
  const symbols = ['<>', '/>', '{}', '[]', '()', '&&', '||', '=>', '::'];
  const items = useMemo(() =>
    [...Array(12)].map((_, i) => ({
      id: i,
      symbol: symbols[i % symbols.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 25 + Math.random() * 20,
      delay: i * 2,
    })), []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {items.map(item => (
        <motion.div
          key={item.id}
          className="absolute font-mono text-xs text-cyan-500/20"
          style={{ left: `${item.x}%`, top: `${item.y}%` }}
          animate={{
            y: [0, -100, -200],
            opacity: [0, 0.3, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {item.symbol}
        </motion.div>
      ))}
    </div>
  );
};

// Background Music Player Component
const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        setHasInteracted(true);
        audioRef.current.volume = 0.3;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    };

    // Auto-play on first user interaction
    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('scroll', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [hasInteracted]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src="The Foundation.mp3" type="audio/mpeg" />
      </audio>
      <motion.button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-700 hover:border-cyan-500/50 flex items-center justify-center transition-all shadow-lg hover:shadow-cyan-500/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        title={isPlaying ? 'Mute Music' : 'Play Music'}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-cyan-400" />
        ) : (
          <VolumeX className="w-5 h-5 text-zinc-500" />
        )}
      </motion.button>
    </>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATED HOLOGRAM FALLBACK (Works without WebGL)
// ═══════════════════════════════════════════════════════════════════════════════

const HologramDisplay = ({ initials = "AR" }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 rounded-full blur-3xl" />

      {/* Rotating outer ring */}
      <motion.div
        className="absolute w-[300px] h-[300px] border border-cyan-500/20 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Counter-rotating middle ring */}
      <motion.div
        className="absolute w-[250px] h-[250px] border border-cyan-500/30 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(0,255,200,0.8)]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(0,255,200,0.8)]" />
      </motion.div>

      {/* Inner pulsing ring */}
      <motion.div
        className="absolute w-[200px] h-[200px] border-2 border-cyan-500/40 rounded-full"
        animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${50 + Math.cos(i * 30 * Math.PI / 180) * 40}%`,
            top: `${50 + Math.sin(i * 30 * Math.PI / 180) * 40}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            delay: i * 0.2
          }}
        />
      ))}

      {/* Core hexagon */}
      <div className="absolute w-[120px] h-[120px]">
        <motion.div
          className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-sm"
          style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Initials */}
      <motion.div
        className="relative z-10 text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-emerald-400"
        animate={{
          textShadow: [
            '0 0 20px rgba(0,255,200,0.5)',
            '0 0 40px rgba(0,255,200,0.8)',
            '0 0 20px rgba(0,255,200,0.5)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {initials}
      </motion.div>

      {/* Scanline effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(transparent 50%, rgba(0,255,200,0.03) 50%)',
          backgroundSize: '100% 4px'
        }}
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 0.2, repeat: Infinity }}
      />

      {/* Top label */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[10px] text-cyan-500/50 tracking-widest">
        DIGITAL TWIN v2.0
      </div>

      {/* Bottom status */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 font-mono text-[10px] text-cyan-500/50">
        <motion.div
          className="w-2 h-2 rounded-full bg-emerald-500"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        ONLINE
      </div>
    </div>
  );
};

class Canvas3DErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <HologramDisplay initials={this.props.initials || "AR"} />;
    }
    return this.props.children;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3D AVATAR COMPONENTS (GLB + FBX Support)
// ═══════════════════════════════════════════════════════════════════════════════

// GLB Model (static with subtle animation)
function GLBAvatarModel({ modelPath, scale, position }) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
      modelRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <primitive ref={modelRef} object={scene.clone()} scale={scale} position={position} />
  );
}

// FBX Model (with animation support)
function FBXAvatarModel({ modelPath, scale, position }) {
  const fbx = useFBX(modelPath);
  const modelRef = useRef();
  const { actions, mixer } = useAnimations(fbx.animations, modelRef);

  useEffect(() => {
    // Play the first animation found
    const animationNames = Object.keys(actions);
    if (animationNames.length > 0) {
      const firstAnimation = actions[animationNames[0]];
      if (firstAnimation) {
        firstAnimation.reset().fadeIn(0.5).play();
      }
    }

    return () => {
      // Cleanup animations
      animationNames.forEach(name => {
        if (actions[name]) actions[name].fadeOut(0.5);
      });
    };
  }, [actions]);

  useFrame((state, delta) => {
    if (mixer) mixer.update(delta);
    if (modelRef.current) {
      // Subtle idle sway
      modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <primitive ref={modelRef} object={fbx} scale={scale} position={position} />
  );
}

// Animated GLB Model (GLB mesh + FBX animation)
// Animated GLB Model (GLB mesh + FBX animation)
function AnimatedGLBModel({ modelPath, animationPath, scale, position }) {
  const { scene } = useGLTF(modelPath);
  const fbx = useFBX(animationPath);

  // Clone the scene using SkeletonUtils to allow independent animation
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const modelRef = useRef();

  // Using fbx animations on the cloned GLB scene
  const { actions } = useAnimations(fbx.animations, modelRef);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAnim = actions[Object.keys(actions)[0]];
      firstAnim.reset().fadeIn(0.5).play();
    }
  }, [actions]);

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <primitive ref={modelRef} object={clone} scale={scale} position={position} />
  );
}

// Universal Avatar Model (handles both types)
function AvatarModel({ path, animationPath, scale, position, type = 'glb' }) {
  if (type === 'animated-glb') {
    return <AnimatedGLBModel modelPath={path} animationPath={animationPath} scale={scale} position={position} />;
  }
  if (type === 'fbx') {
    return <FBXAvatarModel modelPath={path} scale={scale} position={position} />;
  }
  return <GLBAvatarModel modelPath={path} scale={scale} position={position} />;
}

function AvatarScene({ modelConfig, className = '' }) {
  return (
    <div className={`pointer-events-auto ${className}`}>
      <Canvas3DErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={1.2} />
            <directionalLight position={[5, 10, 5]} intensity={2} color="#ffffff" />
            <spotLight position={[5, 5, 5]} angle={0.4} penumbra={1} intensity={2} castShadow color="#ffffff" />
            <spotLight position={[-5, 3, 5]} angle={0.5} penumbra={1} intensity={1.5} color="#00ffcc" />
            <spotLight position={[0, 5, -5]} angle={0.6} penumbra={1} intensity={1} color="#ff8844" />
            <pointLight position={[0, 0, 3]} intensity={0.8} color="#ffffff" />

            <PresentationControls
              global
              rotation={[0.05, 0.1, 0]}
              polar={[-0.2, 0.2]}
              azimuth={[-0.5, 0.5]}
              config={{ mass: 2, tension: 400 }}
            >
              <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <AvatarModel {...modelConfig} />
              </Float>
            </PresentationControls>

            <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={10} blur={2.5} />
            <Environment preset="sunset" />
          </Suspense>
        </Canvas>
      </Canvas3DErrorBoundary>
    </div>
  );
}

// Preload GLB models only (FBX uses different loader)
Object.values(MODELS).filter(m => m.type !== 'fbx').forEach(m => useGLTF.preload(m.path));

// ═══════════════════════════════════════════════════════════════════════════════
// PARTICLE SPHERE
// ═══════════════════════════════════════════════════════════════════════════════

function ParticleSphere({ radius = 2, count = 2500 }) {
  const pointsRef = useRef();

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = Math.PI * 2 * goldenRatio;

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = angleIncrement * i;
      const r = radius * (0.95 + Math.random() * 0.1);

      pos[i * 3] = r * Math.sin(inclination) * Math.cos(azimuth);
      pos[i * 3 + 1] = r * Math.sin(inclination) * Math.sin(azimuth);
      pos[i * 3 + 2] = r * Math.cos(inclination);

      const colorT = Math.random();
      col[i * 3] = colorT * 0.2;
      col[i * 3 + 1] = 0.7 + colorT * 0.3;
      col[i * 3 + 2] = 0.8 + colorT * 0.2;
    }
    return { positions: pos, colors: col };
  }, [count, radius]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.9} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

function ParticleSphereCanvas({ className = '' }) {
  return (
    <div className={className}>
      <Canvas3DErrorBoundary>
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ffcc" />
            <PresentationControls global polar={[-0.3, 0.3]} azimuth={[-0.5, 0.5]}>
              <ParticleSphere />
            </PresentationControls>
          </Suspense>
        </Canvas>
      </Canvas3DErrorBoundary>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SPINE NAVIGATION
// ═══════════════════════════════════════════════════════════════════════════════

const SpineNavigation = ({ activeSection, onNavigate, scrollProgress }) => {
  return (
    <motion.nav
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center"
    >
      {/* Progress line background */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full bg-zinc-800" />

      {/* Progress fill */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-cyan-500 to-emerald-500 origin-top"
        style={{ height: '100%', scaleY: scrollProgress }}
      />

      <div className="relative flex flex-col gap-12">
        {SECTIONS.map((section, index) => {
          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              className="group relative flex items-center gap-4"
            >
              {/* Dot */}
              <motion.div
                className={`relative w-4 h-4 rounded-full border-2 transition-all duration-300 ${isActive
                  ? 'border-cyan-500 bg-cyan-500 shadow-[0_0_20px_rgba(0,255,200,0.5)]'
                  : 'border-zinc-600 bg-zinc-900 group-hover:border-zinc-400'
                  }`}
                animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-cyan-500"
                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                )}
              </motion.div>

              {/* Label */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] font-mono text-zinc-600">{section.number}</span>
                <span className={`text-sm font-bold tracking-wider ${isActive ? 'text-cyan-400' : 'text-zinc-400'}`}>
                  {section.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION WRAPPER
// ═══════════════════════════════════════════════════════════════════════════════

const Section = ({ id, children, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  return (
    <section
      id={id}
      ref={ref}
      className={`relative min-h-screen flex items-center justify-center z-20 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 20 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-7xl mx-auto px-8 lg:px-16"
      >
        {children}
      </motion.div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════════════════════════════

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <Section id="home" className="overflow-hidden">
      <div ref={ref} className="flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left: Text */}
        <motion.div style={{ y, opacity }} className="flex-1 lg:pl-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-sm text-cyan-500/70 mb-4 tracking-[0.3em]"
          >
            {PROFILE.role.toUpperCase()}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-[clamp(4rem,15vw,12rem)] font-black leading-[0.85] tracking-tight"
          >
            <span className="text-zinc-100">{PROFILE.name.split(' ')[0].toUpperCase()}</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 animate-gradient">
              {PROFILE.name.split(' ')[1]?.toUpperCase() || 'RAJ'}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-lg text-zinc-500 max-w-md leading-relaxed"
          >
            {PROFILE.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex gap-4"
          >
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all rounded-full"
            >
              <Github className="w-5 h-5" />
              <span className="font-medium">GitHub</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all rounded-full"
            >
              <Linkedin className="w-5 h-5" />
              <span className="font-medium">LinkedIn</span>
            </a>
            <a
              href="/Abin_Portfolio/Abin_Raj_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-3 bg-zinc-100 text-zinc-900 border border-zinc-100 hover:bg-cyan-400 hover:border-cyan-400 transition-all rounded-full"
            >
              <span className="font-bold">RESUME</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right: 3D Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="flex-1 h-[500px] lg:h-[700px] relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 rounded-full blur-3xl" />
          <AvatarScene modelConfig={MODELS.hero} className="w-full h-full" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono text-zinc-600 tracking-widest">SCROLL</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown className="w-5 h-5 text-zinc-600" />
        </motion.div>
      </motion.div>
    </Section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PROJECTS SECTION
// ═══════════════════════════════════════════════════════════════════════════════

const ProjectsSection = () => {
  return (
    <Section id="projects">
      <div className="lg:pl-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-sm text-cyan-500/70 tracking-[0.3em]">02 / PROJECTS</span>
          <h2 className="text-[clamp(3rem,10vw,8rem)] font-black text-zinc-100 leading-[0.9] mt-4">
            SELECTED<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">WORKS</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {projectsData.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-6 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all overflow-hidden"
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient}`} />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-zinc-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-emerald-400 transition-all">
                    {project.title}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-cyan-400 transition-colors" />
                </div>

                <p className="text-zinc-500 text-sm mb-4">{project.subtitle}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs font-mono bg-zinc-800 text-zinc-400 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
            </motion.a>
          ))}
        </div>

        {/* Divider */}
        <div className="my-20 h-[1px] bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

        {/* Awards Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-zinc-100 mb-6 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-yellow-500"></span>
            AWARDS & ACHIEVEMENTS
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {AWARDS.map((award, i) => (
              <div key={i} className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl">
                <h4 className="text-lg font-bold text-yellow-400">{award.title}</h4>
                <p className="text-sm text-zinc-500">{award.issuer}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="my-16 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

        {/* Certifications & Memberships */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-12 md:grid-cols-2"
        >
          <div>
            <h3 className="text-xl font-bold text-zinc-100 mb-4 flex items-center gap-3">
              <span className="w-6 h-[2px] bg-purple-500"></span>
              CERTIFICATIONS
            </h3>
            <ul className="space-y-2">
              {CERTIFICATIONS.map((cert, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-zinc-400">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                  {cert}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-100 mb-4 flex items-center gap-3">
              <span className="w-6 h-[2px] bg-emerald-500"></span>
              MEMBERSHIPS
            </h3>
            <ul className="space-y-2">
              {MEMBERSHIPS.map((mem, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-zinc-400">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  {mem}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SKILLS SECTION
// ═══════════════════════════════════════════════════════════════════════════════

const SkillsSection = () => {
  return (
    <Section id="skills">
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:pl-16">
        {/* Particle Sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full lg:w-[400px] h-[400px] relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl" />
          <ParticleSphereCanvas className="w-full h-full" />
        </motion.div>

        {/* Skills content */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="font-mono text-sm text-cyan-500/70 tracking-[0.3em]">03 / SKILLS</span>
            <h2 className="text-[clamp(3rem,10vw,8rem)] font-black text-zinc-100 leading-[0.9] mt-4">
              TECH<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">STACK</span>
            </h2>
          </motion.div>

          <div className="grid gap-4">
            {skillsData.slice(0, 8).map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors">{skill.name}</span>
                  <span className="font-mono text-sm text-zinc-600">{skill.level}%</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.05, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// EXPERIENCE SECTION
// ═══════════════════════════════════════════════════════════════════════════════

const ExperienceSection = () => {
  return (
    <Section id="experience">
      <div className="lg:pl-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-sm text-cyan-500/70 tracking-[0.3em]">04 / EXPERIENCE</span>
          <h2 className="text-[clamp(3rem,10vw,8rem)] font-black text-zinc-100 leading-[0.9] mt-4">
            JOURNEY<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">SO FAR</span>
          </h2>
        </motion.div>

        {/* Work Experience */}
        <div className="relative mb-20">
          <div className="absolute left-0 lg:left-8 top-0 bottom-0 w-[2px] bg-zinc-800" />
          <div className="space-y-12 pl-8 lg:pl-20">
            {experienceData.map((exp, index) => (
              <motion.div
                key={exp.id || index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="absolute -left-8 lg:-left-12 top-2 w-4 h-4 rounded-full bg-zinc-900 border-2 border-cyan-500 shadow-[0_0_10px_rgba(0,255,200,0.3)]" />
                <div className="flex flex-wrap items-center gap-4 mb-2 text-sm font-mono text-zinc-600">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{exp.period}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{exp.location}</span>
                </div>
                <h3 className="text-2xl font-bold text-zinc-100 mb-1">{exp.role}</h3>
                <p className="text-lg text-cyan-400 font-medium mb-3">{exp.company}</p>
                <p className="text-zinc-500 max-w-xl mb-3">{exp.description}</p>
                {exp.tech && (
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t, i) => (
                      <span key={i} className="px-2 py-1 text-xs font-mono bg-zinc-800 text-cyan-400 rounded">{t}</span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-24 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

        {/* Education Section - with extra spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-zinc-100 mb-6 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-cyan-500"></span>
            EDUCATION
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {EDUCATION.map((edu) => (
              <div key={edu.id} className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-cyan-500/30 transition-all">
                <h4 className="text-lg font-bold text-zinc-100">{edu.degree}</h4>
                <p className="text-cyan-400 font-medium">{edu.institution}</p>
                <p className="text-sm text-zinc-600 font-mono mt-1">{edu.period}</p>
                <p className="text-sm text-zinc-500 mt-2">{edu.details}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// CONTACT SECTION
// ═══════════════════════════════════════════════════════════════════════════════

const ContactSection = () => {
  return (
    <Section id="contact">
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:pl-16">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full lg:w-[600px] h-[700px] relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20 rounded-full blur-3xl" />
          <AvatarScene modelConfig={MODELS.contact} className="w-full h-full" />
        </motion.div>

        {/* Contact content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-sm text-cyan-500/70 tracking-[0.3em]">05 / CONTACT</span>
            <h2 className="text-[clamp(3rem,10vw,8rem)] font-black text-zinc-100 leading-[0.9] mt-4">
              LET'S<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">CONNECT</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-xl text-zinc-500 max-w-md mx-auto lg:mx-0"
          >
            Have a project in mind? Let's build something amazing together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-col gap-4 max-w-md mx-auto lg:mx-0"
          >
            <a
              href={`mailto:${CONTACT.email}`}
              className="group flex items-center gap-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-cyan-500/50 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-cyan-500" />
              </div>
              <div className="text-left">
                <div className="text-sm text-zinc-500">Email</div>
                <div className="text-zinc-100 font-medium group-hover:text-cyan-400 transition-colors">{CONTACT.email}</div>
              </div>
            </a>

            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-purple-500/50 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Github className="w-5 h-5 text-purple-500" />
              </div>
              <div className="text-left">
                <div className="text-sm text-zinc-500">GitHub</div>
                <div className="text-zinc-100 font-medium group-hover:text-purple-400 transition-colors">Sedulous-sedu</div>
              </div>
            </a>

            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-blue-500/50 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Linkedin className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-left">
                <div className="text-sm text-zinc-500">LinkedIn</div>
                <div className="text-zinc-100 font-medium group-hover:text-blue-400 transition-colors">/in/abinraj</div>
              </div>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-sm font-mono text-zinc-700"
          >
            DESIGNED & BUILT BY ABIN RAJ © 2026
          </motion.p>
        </div>
      </div>
    </Section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const containerRef = useRef(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = SECTIONS.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="bg-zinc-950 text-zinc-100 min-h-screen">
      {/* Background gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,200,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.05),transparent_50%)]" />
      </div>

      {/* Subtle grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />

      {/* Creative Animated Elements */}
      <FloatingOrbs />
      <FlyingBirds />
      <ShootingStars />
      <FloatingCodeSymbols />

      {/* Background Music */}
      <BackgroundMusic />

      {/* Spine Navigation */}
      <SpineNavigation
        activeSection={activeSection}
        onNavigate={scrollToSection}
        scrollProgress={smoothProgress}
      />

      {/* Sections */}
      <main>
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </div>
  );
}
