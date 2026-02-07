import React, { useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import SEO from '../components/SEO';
import CopyButton from '../components/CopyButton';

const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    if (!input.trim()) {
      setError('Please enter some JSON to format.');
      setOutput('');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setOutput('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <SEO 
        title="JSON Formatter" 
        description="Validate, format, and beautify your JSON data instantly with this free online JSON formatter tool." 
      />
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">JSON Formatter</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Paste your JSON code below to validate, format, and beautify it instantly.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 dark:text-red-200">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-6 items-stretch">
        <div className="flex-1 flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Input JSON
            </label>
            <CopyButton text={input} />
          </div>
          <div className="flex-1">
            <CodeEditor 
              value={input} 
              onChange={(val) => setInput(val || '')}
              language="json"
              height="400px" 
            />
          </div>
        </div>

        <div className="flex justify-center py-4">
          <button
            onClick={handleFormat}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-[#e0223e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
          >
            Format JSON
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 -mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex-1 flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Formatted Output
            </label>
            <CopyButton text={output} />
          </div>
          <div className="flex-1">
            <CodeEditor 
              value={output} 
              language="json"
              height="400px"
              onChange={() => {}} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonFormatter;
