// import React, { createContext, useState, useEffect } from 'react';

// export const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState('light');

//   // Load theme from localStorage
//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme) {
//       setTheme(savedTheme);
//     } else {
//       // Detect system preference as fallback
//       const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//       setTheme(prefersDark ? 'dark' : 'light');
//     }
//   }, []);

//   // Apply theme to <html> element
//   useEffect(() => {
//     const root = document.documentElement;
//     if (theme === 'dark') {
//       root.classList.add('dark');
//     } else {
//       root.classList.remove('dark');
//     }
//     localStorage.setItem('theme', theme);
//   }, [theme]);

//   // Toggle function
//   const toggleTheme = () => {
//     setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };



import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    console.log('📥 Loading theme from localStorage:', savedTheme);
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Detect system preference as fallback
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      console.log('🎨 System prefers dark:', prefersDark);
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Apply theme to <html> element
  useEffect(() => {
    const root = document.documentElement;
    console.log('🎯 Applying theme:', theme, 'to HTML element');
    
    if (theme === 'dark') {
      root.classList.add('dark');
      console.log('✅ Added "dark" class to HTML');
    } else {
      root.classList.remove('dark');
      console.log('✅ Removed "dark" class from HTML');
    }
    
    localStorage.setItem('theme', theme);
    console.log('💾 Saved theme to localStorage:', theme);
  }, [theme]);

  // Toggle function
  const toggleTheme = () => {
    console.log('🔄 Toggling theme. Current theme:', theme);
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      console.log('🔄 Changing theme from', prev, 'to', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};