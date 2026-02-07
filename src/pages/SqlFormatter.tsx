import React, { useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import { format } from '@sqltools/formatter';
import SEO from '../components/SEO';
import CopyButton from '../components/CopyButton';

const SqlFormatter: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    try {
      setError(null);
      if (!input.trim()) {
        setOutput('');
        return;
      }
      const formatted = format(input, {
        language: 'sql',
        indent: '  ',
        reservedWordCase: 'upper',
        linesBetweenQueries: 2,
      });
      setOutput(formatted);
    } catch (err) {
      setError('Invalid SQL. Please check your syntax.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <SEO 
        title="SQL Formatter" 
        description="Format and beautify your SQL queries instantly online." 
      />
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">SQL Formatter</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Beautify your SQL queries with proper indentation and syntax highlighting.
        </p>
      </div>

      <div className="space-y-6">
        {/* Input Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Input SQL
            </label>
            <CopyButton text={input} />
          </div>
          <CodeEditor 
            value={input} 
            onChange={(val) => setInput(val || '')}
            language="sql"
            height="300px"
          />
        </div>

        {/* Action Button */}
        <div className="flex flex-col items-center space-y-2">
          <button
            onClick={handleFormat}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-[#e0223e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
          >
            Format SQL
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 -mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
          {error && (
            <span className="text-red-600 dark:text-red-400 text-sm font-medium">
              {error}
            </span>
          )}
        </div>

        {/* Output Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
             <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Formatted SQL
            </label>
            <CopyButton text={output} />
          </div>
          <CodeEditor 
            value={output} 
            language="sql"
            height="500px" 
          />
        </div>
      </div>
    </div>
  );
};

export default SqlFormatter;
