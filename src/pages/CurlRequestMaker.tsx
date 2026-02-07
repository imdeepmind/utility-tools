import React, { useState, useEffect } from 'react';
import CodeEditor from '../components/CodeEditor';
import SEO from '../components/SEO';
import CopyButton from '../components/CopyButton';

const METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

interface Header {
  key: string;
  value: string;
}

const CurlRequestMaker: React.FC = () => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState<Header[]>([{ key: '', value: '' }]);
  const [body, setBody] = useState('');
  const [curlCommand, setCurlCommand] = useState('');

  // Options
  const [isJson, setIsJson] = useState(false);
  const [insecure, setInsecure] = useState(false);
  const [verbose, setVerbose] = useState(false);
  const [withComments, setWithComments] = useState(false);

  // Update cURL command whenever inputs change
  useEffect(() => {
    let cmd = `curl`;

    // Options
    if (insecure) {
      cmd += ` \\\n  -k`;
      if (withComments) cmd += ` # Allow insecure server connections`;
    }
    if (verbose) {
      cmd += ` \\\n  -v`;
      if (withComments) cmd += ` # Verbose output`;
    }
    
    // Method
    cmd += ` \\\n  -X ${method}`;

    // URL
    cmd += ` "${url || 'https://example.com'}"`;
    if (withComments) cmd += ` # Request URL & Method`;

    // Content-Type for JSON
    if (isJson) {
       cmd += ` \\\n  -H "Content-Type: application/json"`;
       if (withComments) cmd += ` # Set Content-Type to JSON`;
    }

    // Headers
    headers.forEach(h => {
      if (h.key && h.value) {
        // Skip Content-Type if isJson is selected (to avoid duplicate, though curl handles it, cleaner to skip)
        if (isJson && h.key.toLowerCase() === 'content-type') return;
        
        cmd += ` \\\n  -H "${h.key}: ${h.value}"`;
        if (withComments) cmd += ` # Custom Header`;
      }
    });

    // Add Body
    if (body) {
      // Escape single quotes for shell safety (basic)
      const safeBody = body.replace(/'/g, "'\\''");
      cmd += ` \\\n  -d '${safeBody}'`;
      if (withComments) cmd += ` # Request Body data`;
    }

    setCurlCommand(cmd);
  }, [method, url, headers, body, isJson, insecure, verbose, withComments]);

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const removeHeader = (index: number) => {
    const newHeaders = headers.filter((_, i) => i !== index);
    setHeaders(newHeaders.length ? newHeaders : [{ key: '', value: '' }]);
  };

  const updateHeader = (index: number, field: 'key' | 'value', value: string) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <SEO 
        title="cURL Request Maker" 
        description="Generate cURL commands easily online." 
      />
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">cURL Request Maker</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Build and customize cURL commands for your API requests.
        </p>
      </div>

      <div className="space-y-8">
        {/* Method & URL */}
        <div className="space-y-2">
           <div className="flex gap-4">
            <div className="w-1/4">
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Method</label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white p-2.5 border"
                >
                  {METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
            </div>
            <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL</label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://api.example.com/data"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white p-2.5 border"
                />
            </div>
          </div>
        </div>

        {/* Headers */}
        <div className="space-y-4 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-900 dark:text-white">Headers</label>
            <button 
              onClick={addHeader} 
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-primary bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 transition-colors"
            >
              + Add Header
            </button>
          </div>
          <div className="space-y-3">
            {headers.map((header, index) => (
              <div key={index} className="flex gap-3 items-center">
                <input
                  type="text"
                  placeholder="Key (e.g. Authorization)"
                  value={header.key}
                  onChange={(e) => updateHeader(index, 'key', e.target.value)}
                  className="block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white p-2 border"
                />
                <input
                  type="text"
                  placeholder="Value (e.g. Bearer token)"
                  value={header.value}
                  onChange={(e) => updateHeader(index, 'value', e.target.value)}
                  className="block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white p-2 border"
                />
                <button 
                  onClick={() => removeHeader(index)}
                  className="text-gray-400 hover:text-red-500 p-1"
                  title="Remove header"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

          {/* Body */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Request Body</label>
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                <CodeEditor
                    value={body}
                    onChange={(val) => setBody(val || '')}
                    language="json"
                    height="200px"
                />
            </div>
            {!['POST', 'PUT', 'PATCH'].includes(method) && (
              <p className="text-xs text-gray-500 italic">
                Note: Checking body with {method} request is unconventional but allowed.
              </p>
            )}
          </div>

        {/* Configurations */}
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Configurations</label>
            <div className="flex flex-wrap gap-6">
                <label className="inline-flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        checked={isJson}
                        onChange={(e) => setIsJson(e.target.checked)}
                        className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" 
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">JSON Content-Type</span>
                </label>
                 <label className="inline-flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        checked={verbose}
                        onChange={(e) => setVerbose(e.target.checked)}
                        className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" 
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Verbose (-v)</span>
                </label>
                 <label className="inline-flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        checked={insecure}
                        onChange={(e) => setInsecure(e.target.checked)}
                        className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" 
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Accept self-signed certs (-k)</span>
                </label>
                 <label className="inline-flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        checked={withComments}
                        onChange={(e) => setWithComments(e.target.checked)}
                        className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" 
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Explain with Comments</span>
                </label>
            </div>
        </div>

        {/* Output Preview */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Generated Command</h2>
             <CopyButton text={curlCommand} />
          </div>
          <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
            <CodeEditor
              value={curlCommand}
              language="shell"
              height="300px"
              onChange={() => {}} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurlRequestMaker;
