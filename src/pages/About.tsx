import React from 'react';

const About: React.FC = () => {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">About Utility Tools</h1>
      <p className="text-gray-600 dark:text-gray-300 text-lg">
        This is a collection of utility tools built with React and Vite.
      </p>
    </div>
  );
};

export default About;
