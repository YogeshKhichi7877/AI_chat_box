// import React from 'react';
// import { motion } from 'framer-motion';
// import { Bot, User, Code, Image, FileText } from 'lucide-react';
// import ReactMarkdown from 'react-markdown';
// import { Message } from '../types';
// import CodeResults from './CodeResults';

// interface ChatMessageProps {
//   message: Message;
// }

// const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
//   const getIcon = () => {
//     if (message.isUser) return <User size={18} />;
    
//     switch (message.type) {
//       case 'code': return <Code size={18} />;
//       case 'image': return <Image size={18} />;
//       case 'pdf': return <FileText size={18} />;
//       default: return <Bot size={18} />;
//     }
//   };

//   const getGradient = () => {
//     if (message.isUser) return 'from-blue-500 to-purple-600';
    
//     switch (message.type) {
//       case 'code': return 'from-green-500 to-teal-600';
//       case 'image': return 'from-pink-500 to-rose-600';
//       case 'pdf': return 'from-orange-500 to-red-600';
//       default: return 'from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600';
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20, scale: 0.95 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       transition={{ duration: 0.3 }}
//       className={`flex gap-4 mb-6 ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}
//     >
//       <motion.div 
//         className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-r ${getGradient()} ${
//           message.isUser || message.type !== 'text' ? 'text-white' : 'text-gray-700 dark:text-gray-300'
//         }`}
//         whileHover={{ scale: 1.1 }}
//         transition={{ type: "spring", stiffness: 400, damping: 10 }}
//       >
//         {getIcon()}
//       </motion.div>
      
//       <div className={`max-w-[75%] ${message.isUser ? 'text-right' : 'text-left'}`}>
//         <motion.div 
//           className={`inline-block p-4 rounded-2xl shadow-lg backdrop-blur-sm ${
//             message.isUser
//               ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md'
//               : 'bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white rounded-bl-md border border-gray-200/50 dark:border-gray-700/50'
//           }`}
//           whileHover={{ scale: 1.02 }}
//           transition={{ type: "spring", stiffness: 400, damping: 10 }}
//         >
//           {message.isUser ? (
//             <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
//           ) : (
//             <>
//               <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-code:bg-gray-100 dark:prose-code:bg-gray-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700">
//                 <ReactMarkdown>
//                   {message.text}
//                 </ReactMarkdown>
//               </div>
              
//               {message.images && message.images.length > 0 && (
//                 <div className="grid grid-cols-2 gap-2 mt-4">
//                   {message.images.map((imageUrl, index) => (
//                     <img
//                       key={index}
//                       src={imageUrl}
//                       alt={`Generated ${index + 1}`}
//                       className="w-full h-32 object-cover rounded-lg"
//                     />
//                   ))}
//                 </div>
//               )}
              
//               {message.codeResults && <CodeResults results={message.codeResults} />}
//             </>
//           )}
//         </motion.div>
//         <motion.p 
//           className="text-xs text-gray-500 dark:text-gray-400 mt-2 px-1"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//         </motion.p>
//       </div>
//     </motion.div>
//   );
// };

import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot, Brain, Code, Database, Users, FileText, MessageCircle } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
  currentMode?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, currentMode }) => {
  const formatTimestamp = (date: Date) =>
    new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const getBotIcon = () => {
    if (message.isUser) return null;
    switch (currentMode || message.type) {
      case 'text':
        return <MessageCircle className="w-5 h-5 text-white" />;
      case 'chat':
        return <Users className="w-5 h-5 text-white" />;
      case 'code':
        return <Code className="w-5 h-5 text-white" />;
      case 'pdf':
        return <FileText className="w-5 h-5 text-white" />;
      case 'thinking':
        return <Brain className="w-5 h-5 text-white" />;
      case 'structured':
        return <Database className="w-5 h-5 text-white" />;
      default:
        return <Bot className="w-5 h-5 text-white" />;
    }
  };

  const getBotGradient = () => {
    if (message.isUser) return 'from-blue-500 to-purple-600';
    switch (currentMode || message.type) {
      case 'text':
        return 'from-blue-500 to-blue-600';
      case 'chat':
        return 'from-green-500 to-green-600';
      case 'code':
        return 'from-violet-700 to-indigo-700';
      case 'pdf':
        return 'from-red-500 to-red-600';
      case 'thinking':
        return 'from-indigo-500 to-indigo-600';
      case 'structured':
        return 'from-teal-500 to-teal-600';
      default:
        return 'from-green-500 to-teal-600';
    }
  };

  const renderStructuredData = (data: any) => (
    <div className="mt-3 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
      <div className="flex items-center gap-2 mb-2">
        <Database className="w-4 h-4 text-teal-500" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Structured Output
        </span>
      </div>
      <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-x-auto whitespace-pre-wrap">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );

  const renderThinkingProcess = (thinking: string) => (
    <div className="mt-3 p-3 bg-indigo-50/50 dark:bg-indigo-900/20 backdrop-blur-sm rounded-xl border border-indigo-200/30 dark:border-indigo-700/30">
      <div className="flex items-center gap-2 mb-2">
        <Brain className="w-4 h-4 text-indigo-500" />
        <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
          Thinking Process
        </span>
      </div>
      <p className="text-sm text-indigo-600 dark:text-indigo-400 italic">
        {thinking}
      </p>
    </div>
  );

  const renderCodeResults = (results: any[]) => (
    <div className="mt-3 space-y-2">
      {results.map((result, index) => (
        <div key={index} className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
          {result.type === 'code' && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Code
                </span>
              </div>
              <pre className="text-sm bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto border border-gray-700 font-mono leading-relaxed">
                {result.value}
              </pre>
            </div>
          )}
          {result.type === 'output' && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-4 h-4 mr-2 inline-block bg-blue-500 rounded-full"></span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Execution Output
                </span>
              </div>
              <pre className="text-sm bg-gray-800 text-cyan-300 p-4 rounded-lg overflow-x-auto border border-gray-600 font-mono leading-relaxed whitespace-pre-wrap">
                {result.value}
              </pre>
            </div>
          )}
          {result.type === 'text' && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-4 h-4 mr-2 inline-block bg-green-500 rounded-full"></span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  AI Response
                </span>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {result.value}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <motion.div
      className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`flex gap-3 max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <motion.div
          className={`
            flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
            bg-gradient-to-r ${getBotGradient()}
          `}
        >
          {message.isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            getBotIcon()
          )}
        </motion.div>

        {/* Message Content */}
        <div className={`flex flex-col ${message.isUser ? 'items-end' : 'items-start'}`}>
          <motion.div
            className={`
              p-4 rounded-2xl backdrop-blur-sm border shadow-lg transition-colors duration-200
              ${
                message.isUser
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-400/30'
                  : currentMode === 'code'
                      ? 'bg-gradient-to-r from-violet-700 to-indigo-700 text-white border-violet-500/30 hover:from-violet-800 hover:to-indigo-800'
                      : 'bg-white/20 text-gray-900 dark:text-white border-white/30 hover:bg-gray-200 dark:hover:bg-gray-700'
              }
              ${!message.isUser ? 'cursor-pointer' : ''}
            `}
            // No scaling on hover
          >
            <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>

            {/* Thinking Process */}
            {message.thinkingProcess && renderThinkingProcess(message.thinkingProcess)}

            {/* Code Results */}
            {message.codeResults && renderCodeResults(message.codeResults)}

            {/* Structured Data */}
            {message.structuredData && renderStructuredData(message.structuredData)}

          </motion.div>

          <span className="text-xs text-gray-400 dark:text-gray-300 mt-1 px-2">
            {formatTimestamp(message.timestamp)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;

