import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          Welcome to my Utility Tools
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-400">
          A collection of simple yet powerful tools for developers, built with modern web technologies.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* JSON Formatter Card */}
        <Link
          to="/json-formatter"
          className="block p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            JSON Formatter
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Format, validate, and beautify your JSON data with a powerful code editor.
          </p>
        </Link>
      </div>
    </div>
  )
}

export default Home
