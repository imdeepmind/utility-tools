import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const About: React.FC = () => {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <SEO 
        title="About" 
        description="Learn more about Utility Tools, a collection of developer-friendly tools built with React and Vite." 
      />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">About Utility Tools</h1>
      <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
        This website is a collection of utility tools for developers. All tools are created using 
        <strong> React</strong>, <strong>Vite</strong>, and <strong>TypeScript</strong>.
      </p>
      <p className="text-gray-600 dark:text-gray-300 text-lg">
        A complete list of available tools can be found on the <Link to="/" className="text-primary hover:underline">Home page</Link>.
      </p>
    </div>
  );
};

export default About;
