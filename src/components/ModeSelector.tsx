import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Code, FileText } from 'lucide-react';
import { ChatMode } from '../types';
import { gsap } from 'gsap';

interface ModeSelectorProps {
  currentMode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
}

const modes = [
  { id: 'chat' as ChatMode, label: 'Multi-Chat', icon: MessageCircle, color: 'from-blue-500 to-purple-600', description: 'Multi-turn conversations' },
  { id: 'code' as ChatMode, label: 'Code Gen', icon: Code, color: 'from-green-500 to-teal-600', description: 'Code generation & execution' },
  { id: 'pdf' as ChatMode, label: 'PDF Reader', icon: FileText, color: 'from-orange-500 to-red-600', description: 'Document analysis' },

];

const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 20, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.6, 
          stagger: 0.1,
          ease: "back.out(1.7)"
        }
      );
    }
  }, []);

  const handleModeChange = (mode: ChatMode) => {
    // GSAP animation for mode change
    gsap.to(`.mode-${currentMode}`, {
      scale: 0.95,
      duration: 0.2,
      ease: "power2.out"
    });
    
    gsap.to(`.mode-${mode}`, {
      scale: 1.05,
      duration: 0.3,
      ease: "back.out(1.7)",
      delay: 0.1
    });

    onModeChange(mode);
  };

  return (
    <div ref={containerRef} className="grid h-[9vh] grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isActive = currentMode === mode.id;
        
        return (
          <motion.button
            key={mode.id}
            onClick={() => handleModeChange(mode.id)}
            className={`mode-${mode.id} relative flex h-[6.5vh] flex-col items-center gap-1 p-2 rounded-lg transition-all group ${
              isActive
                ? 'text-white shadow-lg transform scale-105'
                : 'text-gray-600 dark:text-gray-300 hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isActive && (
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${mode.color} rounded-lg`}
                layoutId="activeMode"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <Icon size={15} className="relative z-10" />
            <div className="relative z-10 text-center">
              <span className="text-[14px] font-medium block">{mode.label}</span>
              <span className="text-[9px] opacity-75 block mb-1">{mode.description}</span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default ModeSelector;