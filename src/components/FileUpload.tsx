import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, X, AlertCircle } from 'lucide-react';

// Types
interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onRemoveFile: () => void;
  accept: string;
  label: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  selectedFile,
  onRemoveFile,
  accept,
  label
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        onFileSelect(file);
      } else {
        alert('Please select a PDF file only.');
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf') {
        onFileSelect(file);
      } else {
        alert('Please select a PDF file only.');
      }
    }
  };

  return (
    <div className="mb-4">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {selectedFile ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 p-4 bg-green-500/10 backdrop-blur-sm rounded-xl border border-green-500/30"
        >
          <FileText className="w-5 h-5 text-green-500" />
          <div className="flex-1">
            <span className="text-sm font-medium text-green-700 dark:text-green-300 block truncate">
              {selectedFile.name}
            </span>
            <span className="text-xs text-green-600 dark:text-green-400">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • PDF Document
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-2 py-1 bg-green-500/20 rounded-full">
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">Ready</span>
            </div>
            <motion.button
              type="button"
              onClick={onRemoveFile}
              className="p-1 rounded-full bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={16} />
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="w-full p-6 border-2 border-dashed border-white/30 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-blue-400/50 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 text-gray-600 dark:text-gray-300 min-h-[120px]"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Upload size={32} className="text-blue-400" />
          <div className="text-center">
            <p className="font-medium">{label}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Supports PDF files up to 10MB
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-2">
            <AlertCircle size={14} />
            <span>Only PDF files are supported</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FileUpload;
