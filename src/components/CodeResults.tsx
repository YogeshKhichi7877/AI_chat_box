import React from 'react';
import { motion } from 'framer-motion';
import { Code, Terminal, FileText } from 'lucide-react';
import { CodeResult } from '../types';

interface CodeResultsProps {
  results: CodeResult[];
}

const CodeResults: React.FC<CodeResultsProps> = ({ results }) => {
  if (results.length === 0) return null;

  return (
    <div className="space-y-4 mt-4">
      {results.map((result, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="rounded-xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
        >
          <div className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${
            result.type === 'code' 
              ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300' 
              : result.type === 'output'
              ? 'bg-green-500/10 text-green-700 dark:text-green-300'
              : 'bg-gray-500/10 text-gray-700 dark:text-gray-300'
          }`}>
            {result.type === 'code' && <Code size={16} />}
            {result.type === 'output' && <Terminal size={16} />}
            {result.type === 'text' && <FileText size={16} />}
            {result.type === 'code' ? 'Code' : result.type === 'output' ? 'Output' : 'Text'}
          </div>
          <div className="p-4 bg-gray-50/50 dark:bg-gray-800/50">
            <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono">
              {result.value}
            </pre>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CodeResults;