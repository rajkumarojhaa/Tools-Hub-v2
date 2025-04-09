import React from 'react';
import { Link } from 'react-router-dom';

const ToolCard = ({ title, tools }) => {
  return (
    <div className="p-4 mx-5 mb-5 bg-black/30 dark:bg-black/40 backdrop-blur-lg rounded-lg shadow-lg border border-white/10 dark:border-gray-700/10">
      <h2 className="text-2xl font-semibold mb-6 text-center text-white dark:text-gray-200">
        {title}
      </h2>
      <div className="flex flex-col sm:flex-row justify-start space-y-6 sm:space-y-0 sm:space-x-10">
        {tools.map((tool, index) => (
          <Link
            key={index}
            to={tool.path}
            className="flex py-10 px-10 bg-black/50 dark:bg-gray-900/50 backdrop-blur-md rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 border border-white/10 dark:border-gray-600/10"
          >
            <div className="flex items-center justify-center">
              <span className="mr-4 text-4xl text-white dark:text-gray-200">{tool.icon}</span>
              <span className="text-xl font-medium text-white dark:text-gray-200">
                {tool.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ToolCard;
