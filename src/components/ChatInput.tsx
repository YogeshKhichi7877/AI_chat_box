// import React, { useState, useRef, useEffect } from 'react';
// import { Send, Loader2, Mic } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { ChatMode } from '../types';
// import FileUpload from './FileUpload';

// type ChatInputProps = {
//   onSendMessage: (message: string) => void;
//   onSendFile: (file: File, message: string) => void;
//   isLoading: boolean;
//   mode: ChatMode;
// };

// const ChatInput: React.FC<ChatInputProps> = ({ 
//   onSendMessage, 
//   onSendFile, 
//   isLoading, 
//   mode
// }) => {
//   const [message, setMessage] = useState('');
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!isLoading) {
//       if (mode === 'pdf' && selectedFile) {
//         onSendFile(selectedFile, message.trim());
//         setSelectedFile(null);
//       } else if (message.trim()) {
//         onSendMessage(message.trim());
//       }
//       setMessage('');
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit(e);
//     }
//   };

//   useEffect(() => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = 'auto';
//       textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
//     }
//   }, [message]);

//   const handleFileSelect = (file: File) => {
//     setSelectedFile(file);
//   };

//   const handleRemoveFile = () => {
//     setSelectedFile(null);
//   };

//   const getPlaceholder = () => {
//     switch (mode) {
//       case 'code': return 'Ask for code help or request code generation...';
//       case 'pdf': return 'Upload a PDF and ask questions about it...';
//       default: return 'Ask me anything... (Press Enter to send)';
//     }
//   };

//   return (
//     <motion.form 
//       onSubmit={handleSubmit} 
//       className="relative"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.3 }}
//     >
//       {mode === 'pdf' && (
//         <FileUpload
//           onFileSelect={handleFileSelect}
//           selectedFile={selectedFile}
//           onRemoveFile={handleRemoveFile}
//           accept=".pdf"
//           label="Click to upload PDF file"
//         />
//       )}
      
//       <div className="flex items-end gap-3 p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg">
//         <textarea
//           ref={textareaRef}
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyPress={handleKeyPress}
//           placeholder={getPlaceholder()}
//           className="flex-1 bg-transparent text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none outline-none min-h-[24px] max-h-32 leading-relaxed"
//           rows={1}
//           disabled={isLoading}
//         />
        
//         <div className="flex gap-2">
//           <motion.button
//             type="button"
//             className="p-2 rounded-xl bg-gray-200/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-gray-600/50 transition-colors"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Mic size={18} />
//           </motion.button>
          
//           <motion.button
//             type="submit"
//             disabled={
//               isLoading || 
//               (mode === 'pdf' ? !selectedFile : !message.trim())
//             }
//             className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             {isLoading ? (
//               <Loader2 size={18} className="animate-spin" />
//             ) : (
//               <Send size={18} />
//             )}
//           </motion.button>
//         </div>
//       </div>
//     </motion.form>
//   );
// };

// export default ChatInput;


import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Mic } from 'lucide-react';
import { motion } from 'framer-motion';
import { ChatMode } from '../types';
import FileUpload from './FileUpload';
import StructuredOutputForm from './StructuredOutputForm';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onSendFile: (file: File, message: string) => void;
  onGenerateStructured: (prompt: string, schema: any) => void;
  isLoading: boolean;
  mode: ChatMode;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  onSendFile, 
  onGenerateStructured,
  isLoading, 
  mode
}) => {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading) {
      if (mode === 'pdf' && selectedFile) {
        onSendFile(selectedFile, message.trim());
        setSelectedFile(null);
      } else if (message.trim()) {
        onSendMessage(message.trim());
      }
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const getPlaceholder = () => {
    switch (mode) {
      case 'text': return 'Ask me anything... (Press Enter to send)';
      case 'chat': return 'Start a conversation... (Multi-turn chat enabled)';
      case 'code': return 'Ask for code help or request code generation...';
      case 'pdf': return selectedFile ? 'Ask questions about the uploaded PDF...' : 'Upload a PDF first, then ask questions about it...';
      case 'thinking': return 'Ask a complex question that requires deep thinking...';
      case 'structured': return 'This mode uses the structured output form below...';
      default: return 'Ask me anything...';
    }
  };

  if (mode === 'structured') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <StructuredOutputForm
          onGenerateStructured={onGenerateStructured}
          isLoading={isLoading}
        />
      </motion.div>
    );
  }

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {mode === 'pdf' && (
        <FileUpload
          onFileSelect={handleFileSelect}
          selectedFile={selectedFile}
          onRemoveFile={handleRemoveFile}
          accept=".pdf"
          label="📄 Click to upload PDF file or drag & drop here"
        />
      )}
      
      <div className="flex items-end gap-1 p-2 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={getPlaceholder()}
          className="flex-1 bg-transparent text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none outline-none min-h-[20px] max-h-30 leading-relaxed"
          rows={1}
          disabled={isLoading}
        />
        
        <div className="flex gap-2">
          <motion.button
            type="button"
            className="p-2 rounded-xl bg-gray-200/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-gray-600/50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mic size={18} />
          </motion.button>
          
          <motion.button
            type="submit"
            disabled={
              isLoading || 
              (mode === 'pdf' ? !selectedFile : !message.trim())
            }
            className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
          </motion.button>
        </div>
      </div>
    </motion.form>
  );
};

export default ChatInput;