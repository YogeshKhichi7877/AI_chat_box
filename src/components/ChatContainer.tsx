// import React, { useState, useRef, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { MessageCircle, Sparkles } from 'lucide-react';
// import { Message, ChatMode, CodeResult } from '../types';
// import ChatMessage from './ChatMessage';
// import ChatInput from './ChatInput';
// import ModeSelector from './ModeSelector';

// const ChatContainer: React.FC = () => {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: '1',
//       text: 'Hello! I\'m your AI assistant powered by Gemini. I\'m here to help you with questions, creative tasks, coding, and much more. What would you like to explore today?',
//       isUser: false,
//       timestamp: new Date(),
//       type: 'text'
//     }
//   ]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [mode, setMode] = useState<ChatMode>('text');
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const getApiEndpoint = (chatMode: ChatMode) => {
//     const baseUrl = 'http://localhost:5002';
    
//     switch (chatMode) {
//       case 'code': return `${baseUrl}/code`;
//       case 'pdf': return `${baseUrl}/pdf`;
//       default: return `${baseUrl}/text`;
//     }
//   };

//   const sendMessage = async (text: string) => {
//     const userMessage: Message = {
//       id: Date.now().toString(),
//       text,
//       isUser: true,
//       timestamp: new Date(),
//       type: mode
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setIsLoading(true);

//     try {
//       const API_URL = getApiEndpoint(mode);

//       const response = await fetch(API_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ text }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
      
//       let aiMessage: Message;
      
//       if (mode === 'code' && data.results) {
//         // Handle code execution results
//         const codeResults: CodeResult[] = data.results;
//         aiMessage = {
//           id: (Date.now() + 1).toString(),
//           text: data.answer || 'Code executed successfully',
//           isUser: false,
//           timestamp: new Date(),
//           type: 'code',
//           codeResults
//         };
//       } else {
//         aiMessage = {
//           id: (Date.now() + 1).toString(),
//           text: data.answer || 'I apologize, but I couldn\'t process your request properly. Please try again.',
//           isUser: false,
//           timestamp: new Date(),
//           type: mode
//         };
//       }

//       setMessages(prev => [...prev, aiMessage]);
//     } catch (error) {
//       console.error('Error sending message:', error);
//       const aiMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         text: 'I\'m having trouble connecting to the server right now. Please check your connection and try again in a moment.',
//         isUser: false,
//         timestamp: new Date(),
//         type: mode
//       };
//       setMessages(prev => [...prev, aiMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const sendFile = async (file: File, text: string) => {
//     const userMessage: Message = {
//       id: Date.now().toString(),
//       text: `📄 ${file.name}${text ? `\n\n${text}` : ''}`,
//       isUser: true,
//       timestamp: new Date(),
//       type: 'pdf'
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setIsLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('text', text || 'Please analyze this PDF document');

//       const response = await fetch(getApiEndpoint('pdf'), {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
      
//       const aiMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         text: data.answer || 'I couldn\'t analyze the PDF properly. Please try again.',
//         isUser: false,
//         timestamp: new Date(),
//         type: 'pdf'
//       };

//       setMessages(prev => [...prev, aiMessage]);
//     } catch (error) {
//       console.error('Error sending message:', error);
//       const errorMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         text: 'I\'m having trouble processing the PDF. Please check your connection and try again.',
//         isUser: false,
//         timestamp: new Date(),
//         type: 'pdf'
//       };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleModeChange = (newMode: ChatMode) => {
//     setMode(newMode);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30, scale: 0.95 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       transition={{ duration: 0.5 }}
//       className=" max-w-[80vw] mx-auto h-[95vh] flex flex-col bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
//     >
//       {/* Header */}
//       <motion.div 
//   className="p-2 border border-red-500/20 bg-gradient-to-r from-blue-500/10 to-purple-600/10"
//   initial={{ opacity: 0, y: -20 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ delay: 0.2 }}
// >

//         <div className="flex items-center justify-between mb-4">
//           <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
//             <MessageCircle className="w-6 h-6 text-white" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
//               AI Chat Assistant
//               <Sparkles className="w-5 h-5 text-yellow-400" />
//             </h1>
//             <p className="text-gray-600 dark:text-gray-300 text-sm">
//               Powered by Gemini AI • Chat, Code, Images & PDF Analysis
//             </p>
//           </div>
//         </div>
        
//         <ModeSelector currentMode={mode} onModeChange={handleModeChange} />
//       </motion.div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
//         {messages.map((message, index) => (
//           <motion.div
//             key={message.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <ChatMessage
//               message={message}
//             />
//           </motion.div>
//         ))}
        
//         {isLoading && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="flex items-center gap-3 text-gray-500 dark:text-gray-400 px-4"
//           >
//             <div className="flex gap-1">
//               {[0, 1, 2].map((i) => (
//                 <motion.div
//                   key={i}
//                   className="w-2 h-2 bg-blue-500 rounded-full"
//                   animate={{ y: [0, -8, 0] }}
//                   transition={{
//                     duration: 0.6,
//                     repeat: Infinity,
//                     delay: i * 0.2,
//                   }}
//                 />
//               ))}
//             </div>
//             <span className="text-sm">AI is thinking... It can take some time</span>
//           </motion.div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input */}
//       <div className="p-6 border-t border-white/20 bg-gradient-to-r from-blue-500/5 to-purple-600/5">
//         <ChatInput 
//           onSendMessage={sendMessage}
//           onSendFile={sendFile}
//           isLoading={isLoading}
//           mode={mode}
//         />
//       </div>
//     </motion.div>
//   );
// };

// export default ChatContainer;

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Message, ChatMode, CodeResult, ChatHistory } from '../types';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import FileUpload from './FileUpload';

interface ChatContainerProps {
  mode: ChatMode;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ mode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- PDF Upload state ---
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const [pdfPrompt, setPdfPrompt] = useState('');

  useEffect(() => {
    const getWelcomeMessage = (currentMode: ChatMode): string => {
      switch (currentMode) {
        case 'text':
          return "Hello! I'm your Text Chat assistant. I can help you with general conversations, answer questions, and provide information on a wide variety of topics. What would you like to talk about?";
        case 'chat':
          return "Hello! I'm your Multi-turn Chat assistant. I can maintain context throughout our conversation and remember what we've discussed. This allows for more natural, flowing conversations. What would you like to discuss?";
        case 'code':
          return "Hello! I'm your Code Assistant. I can help you write code, debug programs, explain algorithms, and even execute code in real-time. What programming challenge can I help you with today?";
        case 'pdf':
          return "Hello! I'm your PDF Analysis assistant. Upload a PDF document and I'll help you analyze its content, answer questions about it, or summarize key information. Please upload a PDF to get started.";
        case 'thinking':
          return "Hello! I'm your Thinking Model assistant. I specialize in complex reasoning and problem-solving, showing you my thought process step-by-step. What challenging question or problem would you like me to work through?";
        case 'structured':
          return "Hello! I'm your Structured Output assistant. I can generate data in specific JSON formats based on your requirements. Use the form below to specify what kind of structured data you need.";
        default:
          return "Hello! I'm your AI assistant. How can I help you today?";
      }
    };
    setMessages([
      {
        id: Date.now().toString(),
        text: getWelcomeMessage(mode),
        isUser: false,
        timestamp: new Date(),
        type: mode
      }
    ]);
    setChatHistory([]);
    setSelectedPdf(null);
    setPdfPrompt('');
  }, [mode]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (mode !== 'chat') setChatHistory([]);
  }, [mode]);

  const getApiEndpoint = (chatMode: ChatMode) => {
    const baseUrl = 'http://localhost:5002';
    switch (chatMode) {
      case 'code': return `${baseUrl}/code`;
      case 'pdf': return `${baseUrl}/pdf`;
      case 'chat': return `${baseUrl}/chat`;
      case 'thinking': return `${baseUrl}/thinking`;
      case 'structured': return `${baseUrl}/structured`;
      default: return `${baseUrl}/text`;
    }
  };

  const sendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
      type: mode
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const API_URL = getApiEndpoint(mode);
      let requestBody: any = { text };
      if (mode === 'chat') {
        const newHistory = [...chatHistory, { role: 'user' as const, parts: [{ text }] }];
        setChatHistory(newHistory);
        requestBody.history = newHistory;
      }
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      let aiMessage: Message;
      if (mode === 'code' && data.results) {
        const codeResults: CodeResult[] = data.results;
        aiMessage = {
          id: (Date.now() + 1).toString(),
          text: data.answer || 'Code executed successfully',
          isUser: false,
          timestamp: new Date(),
          type: 'code',
          codeResults
        };
      } else if (mode === 'thinking' && data.thinking) {
        aiMessage = {
          id: (Date.now() + 1).toString(),
          text: data.response || data.answer,
          isUser: false,
          timestamp: new Date(),
          type: 'thinking',
          thinkingProcess: data.thinking
        };
      } else if (mode === 'structured' && data.structuredData) {
        aiMessage = {
          id: (Date.now() + 1).toString(),
          text: data.answer || 'Structured data generated successfully',
          isUser: false,
          timestamp: new Date(),
          type: 'structured',
          structuredData: data.structuredData
        };
      } else {
        aiMessage = {
          id: (Date.now() + 1).toString(),
          text: data.answer || "I apologize, but I couldn't process your request properly. Please try again.",
          isUser: false,
          timestamp: new Date(),
          type: mode
        };
      }

      if (mode === 'chat') {
        setChatHistory(prev => [...prev, { role: 'model', parts: [{ text: aiMessage.text }] }]);
      }
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting to the server right now. Please check your connection and try again in a moment.",
        isUser: false,
        timestamp: new Date(),
        type: mode
      };
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendFile = async (file: File, text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: `📄 ${file.name}${text ? `\n\n${text}` : ''}`,
      isUser: true,
      timestamp: new Date(),
      type: 'pdf'
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('text', text || 'Please analyze this PDF document');
      const response = await fetch(getApiEndpoint('pdf'), {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.answer || "I couldn't analyze the PDF properly. Please try again.",
        isUser: false,
        timestamp: new Date(),
        type: 'pdf'
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble processing the PDF. Please check your connection and try again.",
        isUser: false,
        timestamp: new Date(),
        type: mode
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setSelectedPdf(null); // Reset after sending
      setPdfPrompt('');
    }
  };

  const handleFileSelect = (file: File) => setSelectedPdf(file);
  const handleRemoveFile = () => setSelectedPdf(null);
  const handlePdfPromptChange = (e: React.ChangeEvent<HTMLInputElement>) => setPdfPrompt(e.target.value);
  const handlePdfAnalyze = () => {
    if (selectedPdf) sendFile(selectedPdf, pdfPrompt);
  };

  const generateStructured = async (prompt: string, schema: any) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: `📊 Generate structured data: ${prompt}`,
      isUser: true,
      timestamp: new Date(),
      type: 'structured'
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(getApiEndpoint('structured'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: prompt, schema }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.answer || 'Structured data generated successfully',
        isUser: false,
        timestamp: new Date(),
        type: 'structured',
        structuredData: data.structuredData
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating structured data:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble generating structured data right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date(),
        type: mode
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // ---- MOBILE-FOCUSED STYLES ----
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="
        w-full 
        max-w-xl          // shrink width on big screens for mobile
        md:max-w-3xl      // bigger only on medium screens
        mx-auto 
        h-[calc(100vh-110px)]
        flex flex-col 
        bg-white/10 backdrop-blur-md 
        rounded-3xl border border-white/20 shadow-2xl 
        overflow-hidden mt-4
        sm:mt-8
        px-0 sm:px-0      // no horizontal padding on mobile
      "
      style={{ fontSize: "clamp(0.98rem, 2.2vw, 1.06rem)" }} // unify base font size for mobile
    >

      <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-3 sm:py-6 space-y-2 sm:space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ChatMessage message={message} currentMode={mode} />
          </motion.div>
        ))}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 text-gray-500 dark:text-gray-400 px-2 sm:px-4"
          >
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-blue-500 rounded-full"
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
            <span className="text-xs sm:text-sm">AI is processing... This may take a moment</span>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* User Input */}
      <div className="p-2 sm:p-4 border-t border-white/20 bg-gradient-to-r from-blue-500/5 to-purple-600/5">
        <ChatInput 
          onSendMessage={sendMessage}
          onSendFile={sendFile}
          onGenerateStructured={generateStructured}
          isLoading={isLoading}
          mode={mode}
        />
      </div>
    </motion.div>
  );
};

export default ChatContainer;
