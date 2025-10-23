import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import TaskManager from './components/TaskManager';
import ApiData from './components/ApiData';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        {/* Task Manager Section */}
        <div id="tasks" className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <TaskManager />
        </div>

        {/* API Data Section */}
        <ApiData />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
