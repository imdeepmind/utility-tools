import React from 'react';
import Editor from '@monaco-editor/react';
import { useTheme } from '../context/ThemeContext';

interface CodeEditorProps {
  value?: string;
  language?: string;
  onChange?: (value: string | undefined) => void;
  height?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  value = '', 
  language = 'json', 
  onChange,
  height = '500px'
}) => {
  const { theme } = useTheme();

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
      <Editor
        height={height}
        language={language}
        value={value}
        theme={theme === 'dark' ? 'vs-dark' : 'light'}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          tabSize: 2,
          padding: { top: 10, bottom: 10 },
        }}
      />
    </div>
  );
};

export default CodeEditor;
