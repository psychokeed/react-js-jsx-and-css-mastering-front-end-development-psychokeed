import React from 'react';
import { useTheme } from '../context/ThemeContext';
import Button from './Button';

/**
 * Navbar component for site navigation
 * @returns {JSX.Element} - Navbar component
 */
const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              PLP Task Manager
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                href="#tasks"
                className="text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Tasks
              </a>
              <a
                href="#api-data"
                className="text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                API Data
              </a>
            </div>
          </div>

          {/* Theme Toggle Button */}
          <div className="flex items-center">
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleTheme}
              className="ml-4"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 dark:bg-gray-700">
          <a
            href="#tasks"
            className="text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium"
          >
            Tasks
          </a>
          <a
            href="#api-data"
            className="text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium"
          >
            API Data
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
