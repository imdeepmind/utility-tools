import React, { useState, useRef } from 'react';
import CodeEditor from '../components/CodeEditor';
import * as diff from 'diff';
import SEO from '../components/SEO';

const TextComparison: React.FC = () => {
  const [originalText, setOriginalText] = useState<string>('');
  const [modifiedText, setModifiedText] = useState<string>('');

  const originalEditorRef = useRef<any>(null);
  const modifiedEditorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);

  const handleOriginalMount = (editor: any, monaco: any) => {
    originalEditorRef.current = editor;
    monacoRef.current = monaco;
  };

  const handleModifiedMount = (editor: any) => {
    modifiedEditorRef.current = editor;
  };
  
  // Refs to store decoration IDs
  const originalDecorationsIds = useRef<string[]>([]);
  const modifiedDecorationsIds = useRef<string[]>([]);

  // Improved compare function with proper decoration clearing
  const handleCompare = () => {
    if (!originalEditorRef.current || !modifiedEditorRef.current || !monacoRef.current) return;

    // Use diffChars for granular comparison
    const changes = diff.diffChars(originalText, modifiedText);

    const originalDecos: any[] = [];
    const modifiedDecos: any[] = [];

    // Cursors (1-based)
    let origLine = 1;
    let origCol = 1;
    let modLine = 1;
    let modCol = 1;

    // Helper to advance cursor based on text
    const advanceCursor = (line: number, col: number, text: string) => {
      let newLine = line;
      let newCol = col;
      
      for (const char of text) {
        if (char === '\n') {
          newLine++;
          newCol = 1;
        } else {
          newCol++;
        }
      }
      return { line: newLine, col: newCol };
    };

    changes.forEach((part) => {
      // Calculate new cursor positions
      const nextOrig = part.added ? { line: origLine, col: origCol } : advanceCursor(origLine, origCol, part.value);
      const nextMod = part.removed ? { line: modLine, col: modCol } : advanceCursor(modLine, modCol, part.value);

      if (part.removed) {
        // Highlight in Original Editor (Red)
        originalDecos.push({
          range: new monacoRef.current.Range(origLine, origCol, nextOrig.line, nextOrig.col),
          options: {
            className: 'diff-remove', 
            isWholeLine: false,
            linesDecorationsClassName: 'diff-gutter-remove' 
          }
        });
      } else if (part.added) {
        // Highlight in Modified Editor (Green)
        modifiedDecos.push({
          range: new monacoRef.current.Range(modLine, modCol, nextMod.line, nextMod.col),
          options: {
            className: 'diff-add',
            isWholeLine: false,
            linesDecorationsClassName: 'diff-gutter-add' 
          }
        });
      }

      // Update cursors
      origLine = nextOrig.line;
      origCol = nextOrig.col;
      modLine = nextMod.line;
      modCol = nextMod.col;
    });

    // Update decorations
    originalDecorationsIds.current = originalEditorRef.current.deltaDecorations(
      originalDecorationsIds.current, 
      originalDecos
    );
    modifiedDecorationsIds.current = modifiedEditorRef.current.deltaDecorations(
      modifiedDecorationsIds.current, 
      modifiedDecos
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <SEO 
        title="Text Comparison Tool" 
        description="Compare two texts and highlight the differences." 
      />
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Text Comparison Tool</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Paste text in both boxes and click the button to find differences.
        </p>
      </div>

      <div className="flex justify-center">
        <button
            onClick={handleCompare}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-[#e0223e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
          >
            Find Difference
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        <div className="flex-1 flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Original Text
          </label>
          <div className="flex-1">
            <CodeEditor 
              value={originalText} 
              onChange={(val) => setOriginalText(val || '')}
              language="text"
              height="600px"
              onMount={handleOriginalMount}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Modified Text
          </label>
          <div className="flex-1">
            <CodeEditor 
              value={modifiedText} 
              onChange={(val) => setModifiedText(val || '')}
              language="text"
              height="600px" 
              onMount={handleModifiedMount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextComparison;
