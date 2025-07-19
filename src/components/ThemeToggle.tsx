// import React from 'react';
// import { Sun, Moon } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { useTheme } from './ThemeProvider';

// const ThemeToggle: React.FC = () => {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <motion.button
//       onClick={toggleTheme}
//       className="fixed top-6 right-6 p-3 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 z-50 shadow-lg"
//       whileHover={{ scale: 1.1 }}
//       whileTap={{ scale: 0.9 }}
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.5 }}
//     >
//       <motion.div
//         initial={false}
//         animate={{ rotate: theme === 'dark' ? 180 : 0 }}
//         transition={{ duration: 0.3 }}
//       >
//         {theme === 'light' ? (
//           <Moon className="w-5 h-5 text-gray-700" />
//         ) : (
//           <Sun className="w-5 h-5 text-yellow-400" />
//         )}
//       </motion.div>
//     </motion.button>
//   );
// };

// export default ThemeToggle;


import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="fixed top-20 right-6 z-40 p-3 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md rounded-full border border-white/30 dark:border-gray-600/30 shadow-lg hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        ) : (
          <Sun className="w-5 h-5 text-yellow-500" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;