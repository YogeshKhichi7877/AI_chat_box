// import React, { useState, useEffect } from 'react';
// import { ThemeProvider } from './components/ThemeProvider';
// import LoadingScreen from './components/LoadingScreen';
// import Scene3D from './components/Scene3D';
// import ThemeToggle from './components/ThemeToggle';
// import ChatContainer from './components/ChatContainer';

// function App() {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Simulate loading time for a smooth experience
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 2500);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <ThemeProvider>
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500 overflow-hidden">
//         {isLoading ? (
//           <LoadingScreen />
//         ) : (
//           <>
//             <Scene3D />
//             <ThemeToggle />
//             <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
//               <ChatContainer />
//             </div>
//           </>
//         )}
//       </div>
//     </ThemeProvider>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import LoadingScreen from './components/LoadingScreen';
import Scene3D from './components/Scene3D';
import ThemeToggle from './components/ThemeToggle';
import Navbar from './components/Navbar';
import ChatContainer from './components/ChatContainer';
import InfoPage from './components/InfoPage';
import OfflineAlert from './components/Offline';
import { ChatMode } from './types';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentMode, setCurrentMode] = useState<ChatMode>('text');
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    // Simulate loading time for a smooth experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleModeChange = (mode: ChatMode) => {
    setCurrentMode(mode);
  };

  const handleShowInfo = () => {
    setShowInfo(true);
  };

  const handleCloseInfo = () => {
    setShowInfo(false);
  };

  const getModeTheme = (mode: ChatMode) => {
    switch (mode) {
      case 'text':
        return 'from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900';
      case 'chat':
        return 'from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900';
      case 'code':
        return 'from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900';
      case 'pdf':
        return 'from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900';
      case 'thinking':
        return 'from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900';
      case 'structured':
        return 'from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900';
      default:
        return 'from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900';
    }
  };

  const getNavbarTheme = (mode: ChatMode) => {
    switch (mode) {
      case 'text':
        return 'from-blue-500/10 to-blue-600/10';
      case 'chat':
        return 'from-green-500/10 to-green-600/10';
      case 'code':
        return 'from-purple-500/10 to-purple-600/10';
      case 'pdf':
        return 'from-red-500/10 to-red-600/10';
      case 'thinking':
        return 'from-indigo-500/10 to-indigo-600/10';
      case 'structured':
        return 'from-teal-500/10 to-teal-600/10';
      default:
        return 'from-blue-500/10 to-purple-600/10';
    }
  };

  return (
    <ThemeProvider>
      <OfflineAlert />
      <div className={`min-h-screen bg-gradient-to-br ${getModeTheme(currentMode)} transition-colors duration-500 overflow-hidden`}>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <Scene3D />
            <Navbar 
              currentMode={currentMode} 
              onModeChange={handleModeChange}
              onShowInfo={handleShowInfo}
              navbarTheme={getNavbarTheme(currentMode)}
            />
            <ThemeToggle />
            <div className="relative z-10 h-screen flex items-center justify-center p-2 mt-5">
              <ChatContainer mode={currentMode} />
            </div>
            {showInfo && <InfoPage onClose={handleCloseInfo} />}
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;