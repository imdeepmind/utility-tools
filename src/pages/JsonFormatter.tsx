import React, { useState } from 'react';
import CodeEditor from '../components/CodeEditor';

const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState<string>('{\n  "example": "paste your json here"\n}');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">JSON Formatter</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Paste your JSON code below to view and edit it.
        </p>
      </div>

      <CodeEditor 
        value={input} 
        onChange={(val) => setInput(val || '')}
        language="json"
        height="600px"
      />
    </div>
  );
};

export default JsonFormatter;
