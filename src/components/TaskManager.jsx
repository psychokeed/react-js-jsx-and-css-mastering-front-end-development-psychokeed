import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Card from './Card';
import Button from './Button';

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <Card className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Task Manager</h2>

      {/* Add Task */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Add a new task..."
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
        <Button onClick={addTask}>Add</Button>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6">
        {['all', 'active', 'completed'].map(filterType => (
          <Button
            key={filterType}
            variant={filter === filterType ? 'primary' : 'secondary'}
            onClick={() => setFilter(filterType)}
            className="capitalize"
          >
            {filterType}
          </Button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            No tasks found.
          </p>
        ) : (
          filteredTasks.map(task => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-md"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span
                className={`flex-1 ${
                  task.completed
                    ? 'line-through text-gray-500 dark:text-gray-400'
                    : 'text-gray-900 dark:text-white'
                }`}
              >
                {task.text}
              </span>
              <Button
                variant="danger"
                onClick={() => deleteTask(task.id)}
                className="px-2 py-1 text-sm"
              >
                Delete
              </Button>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default TaskManager;
