// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Menu, X, Bot, MessageCircle, Code, FileText } from 'lucide-react';
// import { ChatMode } from '../types';
// import { gsap } from 'gsap';

// interface NavbarProps {
//   currentMode: ChatMode;
//   onModeChange: (mode: ChatMode) => void;
// }

// const modes = [
//   { id: 'chat' as ChatMode, label: 'Multi-Chat', icon: MessageCircle, color: 'from-blue-500 to-purple-600', description: 'Multi-turn conversations with context' },
//   { id: 'code' as ChatMode, label: 'Code Generator', icon: Code, color: 'from-green-500 to-teal-600', description: 'Live code generation & execution' },
//   { id: 'pdf' as ChatMode, label: 'PDF Analyzer', icon: FileText, color: 'from-orange-500 to-red-600', description: 'Document analysis & Q&A' },
// ];

// const Navbar: React.FC<NavbarProps> = ({ currentMode, onModeChange }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement>(null);
//   const buttonRef = useRef<HTMLButtonElement>(null);

//   useEffect(() => {
//     if (isOpen && menuRef.current) {
//       gsap.fromTo(
//         menuRef.current.children,
//         { opacity: 0, y: -20, scale: 0.8 },
//         { 
//           opacity: 1, 
//           y: 0, 
//           scale: 1, 
//           duration: 0.4, 
//           stagger: 0.1,
//           ease: "back.out(1.7)"
//         }
//       );
//     }
//   }, [isOpen]);

//   const handleModeSelect = (mode: ChatMode) => {
//     // Animate button press
//     if (buttonRef.current) {
//       gsap.to(buttonRef.current, {
//         scale: 0.95,
//         duration: 0.1,
//         yoyo: true,
//         repeat: 1,
//         ease: "power2.out"
//       });
//     }

//     onModeChange(mode);
//     setIsOpen(false);
//   };

//   const currentModeData = modes.find(mode => mode.id === currentMode);

//   return (
//     <>
//       <motion.nav
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo */}
//             <motion.div 
//               className="flex items-center gap-3"
//               whileHover={{ scale: 1.05 }}
//             >
//               <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full flex items-center justify-center shadow-lg">
//                 <Bot className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
//                   Gemini AI Platform
//                 </h1>
//                 <p className="text-xs text-gray-700 dark:text-gray-300">
//                   Advanced Multi-Modal Assistant
//                 </p>
//               </div>
//             </motion.div>

//             {/* Current Mode Display */}
//             <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 shadow-md">
//               {currentModeData && (
//                 <>
//                   <div className={`w-8 h-8 bg-gradient-to-r ${currentModeData.color} rounded-full flex items-center justify-center`}>
//                     <currentModeData.icon size={16} className="text-white" />
//                   </div>
//                   <div>
//                     <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
//                       {currentModeData.label}
//                     </span>
//                     <p className="text-xs text-gray-700 dark:text-gray-300">
//                       {currentModeData.description}
//                     </p>
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* Menu Button */}
//             <motion.button
//               ref={buttonRef}
//               onClick={() => setIsOpen(!isOpen)}
//               className="p-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:from-blue-700 hover:to-purple-800"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <AnimatePresence mode="wait">
//                 {isOpen ? (
//                   <motion.div
//                     key="close"
//                     initial={{ rotate: -90, opacity: 0 }}
//                     animate={{ rotate: 0, opacity: 1 }}
//                     exit={{ rotate: 90, opacity: 0 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <X size={20} />
//                   </motion.div>
//                 ) : (
//                   <motion.div
//                     key="menu"
//                     initial={{ rotate: 90, opacity: 0 }}
//                     animate={{ rotate: 0, opacity: 1 }}
//                     exit={{ rotate: -90, opacity: 0 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <Menu size={20} />
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.button>
//           </div>
//         </div>
//       </motion.nav>

//       {/* Dropdown Menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 z-40"
//               onClick={() => setIsOpen(false)}
//             />

//             {/* Menu */}
//             <motion.div
//               ref={menuRef}
//               initial={{ opacity: 0, y: -20, scale: 0.95 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: -20, scale: 0.95 }}
//               className="fixed top-20 right-4 w-80 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl z-50 p-4"
//             >
//               <div className="mb-4">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
//                   AI Models & Capabilities
//                 </h3>
//                 <p className="text-sm text-gray-700 dark:text-gray-300">
//                   Choose your specialized AI assistant
//                 </p>
//               </div>

//               <div className="space-y-2">
//                 {modes.map((mode) => {
//                   const Icon = mode.icon;
//                   const isActive = currentMode === mode.id;
                  
//                   return (
//                     <motion.button
//                       key={mode.id}
//                       onClick={() => handleModeSelect(mode.id)}
//                       className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left ${
//                         isActive
//                           ? 'bg-gradient-to-r text-white shadow-lg transform scale-105'
//                           : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
//                       }`}
//                       style={isActive ? { backgroundImage: `linear-gradient(to right, ${mode.color.split(' ')[1]}, ${mode.color.split(' ')[3]})` } : {}}
//                       whileHover={{ scale: isActive ? 1.05 : 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
//                         isActive ? 'bg-white/20' : `bg-gradient-to-r ${mode.color} shadow-md`
//                       }`}>
//                         <Icon size={20} className={isActive ? 'text-white' : 'text-white'} />
//                       </div>
//                       <div className="flex-1">
//                         <h4 className="font-medium mb-1">{mode.label}</h4>
//                         <p className={`text-sm ${isActive ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'}`}>
//                           {mode.description}
//                         </p>
//                       </div>
//                       {isActive && (
//                         <motion.div
//                           initial={{ scale: 0 }}
//                           animate={{ scale: 1 }}
//                           className="w-3 h-3 bg-white rounded-full"
//                         />
//                       )}
//                     </motion.button>
//                   );
//                 })}
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Navbar;


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, Code, FileText, Users, Brain, Database, Sparkles, Info, Menu
} from 'lucide-react';
import { ChatMode } from '../types';

interface NavbarProps {
  currentMode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
  onShowInfo: () => void;
  navbarTheme: string;
}

const modeConfig = {
  text:      { icon: MessageCircle, label: 'Text Chat',       color: 'from-blue-500 to-blue-600' },
  chat:      { icon: Users,         label: 'Multi-turn Chat', color: 'from-green-500 to-green-600' },
  code:      { icon: Code,          label: 'Code Assistant',  color: 'from-purple-500 to-purple-600' },
  pdf:       { icon: FileText,      label: 'PDF Analysis',    color: 'from-red-500 to-red-600' },
  thinking:  { icon: Brain,         label: 'Thinking Model',  color: 'from-indigo-500 to-indigo-600' },
  structured:{ icon: Database,      label: 'Structured Output',color:'from-teal-500 to-teal-600' }
};

const Navbar: React.FC<NavbarProps> = ({ currentMode, onModeChange, onShowInfo, navbarTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleModeSelect = (mode: ChatMode) => {
    onModeChange(mode);
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20 transition-all duration-500`}
    >
      <div className={`max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-r ${navbarTheme} transition-all duration-500`}>
        <div className="flex items-center justify-around h-16">
          {/* --- Logo and Title --- */}
          <motion.div
            className="flex items-center gap-5"
            whileHover={{ scale: 1.03 }}
          >
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                AI Chat Box 
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Multi-Model AI Assistant
              </p>
            </div>
          </motion.div>

          {/* --- Desktop Mode Selector & Info Button --- */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-2xl p-2">
              {Object.entries(modeConfig).map(([mode, config]) => {
                const Icon = config.icon;
                const isActive = currentMode === mode;
                return (
                  <motion.button
                    key={mode}
                    onClick={() => onModeChange(mode as ChatMode)}
                    className={`
                      relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all
                      ${isActive 
                        ? 'text-white shadow-lg' 
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeBackground"
                        className={`absolute inset-0 bg-gradient-to-r ${config.color} rounded-xl`}
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon size={16} className="relative z-10" />
                    <span className="relative z-10 hidden sm:inline">
                      {config.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
            {/* Info Button */}
            <motion.button
              onClick={onShowInfo}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="About/Info"
            >
              <Info size={20} />
            </motion.button>
          </div>

          {/* --- Mobile Burger/Menu Button & Info Button --- */}
          <div className="md:hidden flex items-center gap-3">
            <motion.button
              className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-gray-600 dark:text-gray-300 focus:outline-none"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Open model menu"
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.05 }}
            >
              <Menu size={22} />
            </motion.button>
            <motion.button
              onClick={onShowInfo}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="About/Info"
            >
              <Info size={20} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu Overlay --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-16 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 shadow-2xl border-b border-white/20 backdrop-blur-lg"
          >
            <div className="px-5 py-4 flex flex-col gap-2">
              {Object.entries(modeConfig).map(([mode, config]) => {
                const Icon = config.icon;
                const isActive = currentMode === mode;
                return (
                  <button
                    key={mode}
                    onClick={() => handleModeSelect(mode as ChatMode)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold
                      ${isActive 
                        ? `text-white bg-gradient-to-r ${config.color} shadow-lg`
                        : 'text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                      }
                      transition-all`}
                  >
                    <Icon size={20} />
                    {config.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
