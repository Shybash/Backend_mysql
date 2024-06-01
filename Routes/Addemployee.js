// backend/routes/employees.js

const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the database connection pool

// Route to handle adding a new employee
router.post('/employees', (req, res) => {
  const { name, email, salary, category } = req.body;

  // Check if all required fields are present
  if (!name || !email || !salary || !category) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Insert new employee into MySQL database
  db.query('INSERT INTO employees (name, email, salary, category) VALUES (?, ?, ?, ?)', [name, email, salary, category], function(error, results) {
    if (error) {
      console.error('Error adding employee: ' + error.message);
      return res.status(500).json({ message: 'Error adding employee' });
    }
    
    // Respond with the newly created employee
    res.status(201).json({ id: results.insertId, name, email, salary, category });
  });
});

module.exports = router;
