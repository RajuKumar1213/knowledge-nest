import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="text-center p-8 rounded-lg shadow-lg bg-gray-800 bg-opacity-80">
        {/* 404 Error Code */}
        <h1 className="text-6xl font-bold text-blue-500 mb-4">404</h1>
        
        {/* Error Message */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-100 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-8">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        
        {/* Home Button */}
        <Link to="/">
          <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-md shadow-md hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
