import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Send, Loader2 } from 'lucide-react';

interface StructuredOutputFormProps {
  onGenerateStructured: (prompt: string, schema: any) => void;
  isLoading: boolean;
}

const StructuredOutputForm: React.FC<StructuredOutputFormProps> = ({ 
  onGenerateStructured, 
  isLoading 
}) => {
  const [prompt, setPrompt] = useState('');
  const [schemaType, setSchemaType] = useState('person');
  const [customSchema, setCustomSchema] = useState('');

  const predefinedSchemas = {
    person: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' },
        occupation: { type: 'string' },
        location: { type: 'string' },
        skills: { type: 'array', items: { type: 'string' } }
      },
      required: ['name', 'age', 'occupation']
    },
    product: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        price: { type: 'number' },
        category: { type: 'string' },
        description: { type: 'string' },
        features: { type: 'array', items: { type: 'string' } },
        inStock: { type: 'boolean' }
      },
      required: ['name', 'price', 'category']
    },
    recipe: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        servings: { type: 'number' },
        prepTime: { type: 'string' },
        ingredients: { type: 'array', items: { type: 'string' } },
        instructions: { type: 'array', items: { type: 'string' } },
        difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] }
      },
      required: ['title', 'ingredients', 'instructions']
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      let schema;
      if (schemaType === 'custom') {
        try {
          schema = JSON.parse(customSchema);
        } catch (error) {
          alert('Invalid JSON schema');
          return;
        }
      } else {
        schema = predefinedSchemas[schemaType as keyof typeof predefinedSchemas];
      }
      onGenerateStructured(prompt.trim(), schema);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Describe what you want structured data for
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Create a person profile for John Doe, a 30-year-old software engineer from San Francisco..."
          className="w-full p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none outline-none focus:ring-2 focus:ring-teal-500"
          rows={3}
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Output Schema Type
        </label>
        <select
          value={schemaType}
          onChange={(e) => setSchemaType(e.target.value)}
          className="w-full p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-white/30 dark:border-gray-600/30 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
          disabled={isLoading}
        >
          <option value="person" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white">Person Profile</option>
          <option value="product" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white">Product Information</option>
          <option value="recipe" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white">Recipe Details</option>
          <option value="custom" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white">Custom Schema</option>
        </select>
      </div>

      {schemaType === 'custom' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Custom JSON Schema
          </label>
          <textarea
            value={customSchema}
            onChange={(e) => setCustomSchema(e.target.value)}
            placeholder='{"type": "object", "properties": {...}, "required": [...]}'
            className="w-full p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none outline-none focus:ring-2 focus:ring-teal-500 font-mono text-sm"
            rows={6}
            disabled={isLoading}
          />
        </div>
      )}

      <motion.button
        type="submit"
        disabled={!prompt.trim() || isLoading || (schemaType === 'custom' && !customSchema.trim())}
        className="w-full p-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-teal-600 hover:to-cyan-700 transition-all shadow-lg flex items-center justify-center gap-3 hover:shadow-xl transform hover:scale-[1.02]"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isLoading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            <span>Generating Structured Data...</span>
          </>
        ) : (
          <>
            <Send size={20} />
            <span>Send to AI Assistant</span>
          </>
        )}
      </motion.button>
    </motion.form>
  );
};

export default StructuredOutputForm;