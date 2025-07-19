// import React from 'react';
// import { motion } from 'framer-motion';
// import { Bot, Sparkles } from 'lucide-react';

// const LoadingScreen: React.FC = () => {
//   return (
//     <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center z-50">
//       <div className="text-center">
//         <motion.div
//           className="relative mb-8"
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <motion.div
//             className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto"
//             animate={{ rotate: 360 }}
//             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//           >
//             <Bot className="w-10 h-10 text-white" />
//           </motion.div>
//           <motion.div
//             className="absolute -top-2 -right-2"
//             animate={{ scale: [1, 1.2, 1] }}
//             transition={{ duration: 1.5, repeat: Infinity }}
//           >
//             <Sparkles className="w-6 h-6 text-yellow-400" />
//           </motion.div>
//         </motion.div>
        
//         <motion.h2
//           className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//         >
//           AI Chat Assistant
//         </motion.h2>
        
//         <motion.p
//           className="text-gray-600 dark:text-gray-300 mb-6"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//         >
//           Initializing your intelligent companion...
//         </motion.p>
        
//         <motion.div
//           className="flex justify-center space-x-2"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.7 }}
//         >
//           {[0, 1, 2].map((i) => (
//             <motion.div
//               key={i}
//               className="w-3 h-3 bg-blue-500 rounded-full"
//               animate={{ y: [0, -10, 0] }}
//               transition={{
//                 duration: 0.6,
//                 repeat: Infinity,
//                 delay: i * 0.2,
//               }}
//             />
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default LoadingScreen;



import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { MessageCircle, Users, Code, FileText, Brain, Database } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    if (iconsRef.current) {
      const icons = iconsRef.current.children;
      tl.to(icons, {
        rotation: 360,
        duration: 2,
        stagger: 0.2,
        ease: "power2.inOut"
      })
      .to(icons, {
        scale: 1.2,
        duration: 0.5,
        stagger: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      }, "-=1");
    }
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center z-50 px-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center w-full max-w-2xl mx-auto">
        {/* Responsive Icons Row */}
        <motion.div
          ref={iconsRef}
          className="flex justify-center gap-4 sm:gap-8 mb-6 sm:mb-8 flex-wrap"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {[ // color, Icon
            ['bg-white/10', <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />],
            ['bg-white/10', <Users        className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />],
            ['bg-white/10', <Code         className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />],
            ['bg-white/10', <FileText     className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" />],
            ['bg-white/10', <Brain        className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" />],
            ['bg-white/10', <Database     className="w-6 h-6 sm:w-8 sm:h-8 text-teal-400" />],
          ].map(([bg, icon], i) => (
            <div
              key={i}
              className={`${bg} rounded-2xl backdrop-blur-sm p-2 sm:p-4 flex items-center justify-center`}
            >
              {icon}
            </div>
          ))}
        </motion.div>

        <motion.h1
          className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Gemini AI Studio
        </motion.h1>

        <motion.p
          className="text-base sm:text-xl text-blue-200 mb-6 sm:mb-8 px-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Initializing Multi-Model AI Assistant...
        </motion.p>

        {/* Responsive dots */}
        <motion.div
          className="flex justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex gap-1 sm:gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"
                animate={{ y: [0, -14, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
