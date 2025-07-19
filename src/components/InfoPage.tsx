import React from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  MessageCircle, 
  Users, 
  Code, 
  FileText, 
  Brain, 
  Database,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface InfoPageProps {
  onClose: () => void;
}

const InfoPage: React.FC<InfoPageProps> = ({ onClose }) => {
  const modes = [
    {
      id: 'text',
      icon: MessageCircle,
      title: 'Text Chat',
      color: 'from-blue-500 to-blue-600',
      description: 'Basic conversational AI for general questions and discussions',
      features: [
        'Natural language conversations',
        'General knowledge questions',
        'Creative writing assistance',
        'Problem-solving discussions',
        'Quick answers and explanations'
      ],
      useCases: [
        'Ask about any topic',
        'Get explanations of complex concepts',
        'Brainstorm ideas',
        'Creative writing help',
        'General assistance'
      ]
    },
    {
      id: 'chat',
      icon: Users,
      title: 'Multi-turn Chat',
      color: 'from-green-500 to-green-600',
      description: 'Advanced conversational AI that maintains context throughout the conversation',
      features: [
        'Conversation memory and context',
        'Follow-up questions understanding',
        'Reference to previous messages',
        'Coherent long-form discussions',
        'Personalized responses based on chat history'
      ],
      useCases: [
        'Deep discussions on complex topics',
        'Tutoring and educational conversations',
        'Project planning and development',
        'Iterative problem solving',
        'Ongoing consultations'
      ]
    },
    {
      id: 'code',
      icon: Code,
      title: 'Code Assistant',
      color: 'from-purple-500 to-purple-600',
      description: 'Specialized AI for programming tasks with code execution capabilities',
      features: [
        'Code generation in multiple languages',
        'Real-time code execution',
        'Debugging and error fixing',
        'Code explanation and documentation',
        'Algorithm optimization suggestions'
      ],
      useCases: [
        'Write functions and scripts',
        'Debug existing code',
        'Learn programming concepts',
        'Code review and optimization',
        'Algorithm implementation'
      ]
    },
    {
      id: 'pdf',
      icon: FileText,
      title: 'PDF Analysis',
      color: 'from-red-500 to-red-600',
      description: 'Upload and analyze PDF documents with intelligent content extraction',
      features: [
        'PDF content extraction and analysis',
        'Document summarization',
        'Question answering about document content',
        'Key information identification',
        'Multi-page document processing'
      ],
      useCases: [
        'Analyze research papers',
        'Extract key information from reports',
        'Summarize lengthy documents',
        'Answer questions about PDF content',
        'Document review and analysis'
      ]
    },
    {
      id: 'thinking',
      icon: Brain,
      title: 'Thinking Model',
      color: 'from-indigo-500 to-indigo-600',
      description: 'Advanced reasoning AI that shows its thought process for complex problems',
      features: [
        'Step-by-step reasoning display',
        'Complex problem decomposition',
        'Logical analysis and deduction',
        'Multi-perspective consideration',
        'Transparent decision-making process'
      ],
      useCases: [
        'Solve complex mathematical problems',
        'Analyze philosophical questions',
        'Strategic planning and decision making',
        'Research methodology design',
        'Critical thinking exercises'
      ]
    },
    {
      id: 'structured',
      icon: Database,
      title: 'Structured Output',
      color: 'from-teal-500 to-teal-600',
      description: 'Generate data in specific JSON formats for integration with other systems',
      features: [
        'Custom JSON schema support',
        'Predefined data templates',
        'Structured data validation',
        'API-ready output formats',
        'Consistent data formatting'
      ],
      useCases: [
        'Generate API responses',
        'Create database entries',
        'Export structured data',
        'System integration tasks',
        'Data transformation projects'
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/20 bg-gradient-to-r from-blue-500/10 to-purple-600/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                  AI Modes Guide
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Detailed explanation of each AI assistant mode
                </p>
              </div>
            </div>
            <motion.button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/20 backdrop-blur-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={24} />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <div className="grid gap-6">
            {modes.map((mode, index) => {
              const Icon = mode.icon;
              return (
                <motion.div
                  key={mode.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 bg-gradient-to-r ${mode.color} rounded-xl flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                        {mode.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {mode.description}
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2">
                            <ArrowRight size={16} />
                            Key Features
                          </h4>
                          <ul className="space-y-1">
                            {mode.features.map((feature, idx) => (
                              <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2">
                            <ArrowRight size={16} />
                            Use Cases
                          </h4>
                          <ul className="space-y-1">
                            {mode.useCases.map((useCase, idx) => (
                              <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                                {useCase}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InfoPage;