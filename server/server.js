// server/server.js
const express = require('express');
const app = express();
const port = 3000;

// In-memory data store (array)
let tasks = [];

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (frontend)
app.use(express.static('public'));

// API Route to get all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// API Route to add a new task
app.post('/api/tasks', (req, res) => {
  const { task } = req.body;
  if (task) {
    const newTask = { id: tasks.length + 1, task };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } else {
    res.status(400).json({ error: 'Task is required' });
  }
});

// API Route to delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  tasks = tasks.filter((task) => task.id !== taskId);
  res.status(200).json({ message: 'Task deleted' });
});

// Start the server
app.listen(port, () => {
  console.log(Server running at http://localhost:${port});
});