import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask('');
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen bg-gray-800 p-6">
      <div className="max-w-md mx-auto bg-gray-500 shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-bold  text-center text-indigo-700 mb-4">🌟 To-Do List</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="flex-1 p-2 bg-gray-700 text-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            onClick={addTask}
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-800 text-white p-3 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(index)}
                  className="accent-indigo-600"
                />
                <span
                  className={`${
                    task.completed ? 'line-through text-green-400' : 'text-white'
                  } text-base`}
                >
                  {task.text}
                </span>
              </div>
              <button
                onClick={() => deleteTask(index)}
                className="text-red-500 hover:text-red-700 font-medium"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        {tasks.length === 0 && (
          <p className="text-center text-gray-400 mt-4">No tasks yet. Add some! ✅</p>
        )}
      </div>
    </div>
  );
}

export default App;
