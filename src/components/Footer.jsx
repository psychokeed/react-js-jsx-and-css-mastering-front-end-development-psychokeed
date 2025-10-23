import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              About
            </h3>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              A responsive React application built with Tailwind CSS demonstrating modern front-end development practices.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#tasks" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Tasks
                </a>
              </li>
              <li>
                <a href="#api" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  API Data
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Contact
            </h3>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              Built with React, JSX, and Tailwind CSS.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-sm text-center text-gray-600 dark:text-gray-300">
            © 2025 React Tailwind Assignment. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
