// server.js - Node.js Backend for Employee Management System

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dummy Users (In-Memory Simulation)
const users = [
  { username: 'admin', password: 'admin123', role: 'Admin' },
  { username: 'manager', password: 'manager123', role: 'Manager' },
  { username: 'employee', password: 'employee123', role: 'Employee' }
];

// Login Endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    res.json({ success: true, role: user.role });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Test Route
app.get('/', (req, res) => {
  res.send('Employee Management Backend is running.');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
