const express = require('express');
const app = express();
const PORT = 3000;

// Sample data (mock database)
let tasks = [
    { id: 1, title: "Learn Node.js", completed: false },
    { id: 2, title: "Build a REST API", completed: false }
];

// Middleware to parse JSON request bodies
app.use(express.json());

// ✅ GET all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// ✅ GET a specific task by ID
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
});

// ✅ POST (Create) a new task
app.post('/tasks', (req, res) => {
    const { title, completed } = req.body;
    const newTask = {
        id: tasks.length + 1,
        title,
        completed: completed || false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// ✅ PUT (Update) a task
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    const updatedTask = { ...tasks[taskIndex], ...req.body };
    tasks[taskIndex] = updatedTask;
    res.json(updatedTask);
});

// ✅ DELETE a task
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== taskId);

    res.json({ message: "Task deleted successfully" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
