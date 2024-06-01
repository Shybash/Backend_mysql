// Routes/Category.js

const express = require('express');
const router = express.Router();
const db = require('../db');

// Fetch all categories
router.get('/categories', (req, res) => {
  db.query('SELECT * FROM categories', (err, results) => {
    if (err) {
      console.error('Error fetching categories:', err.stack);
      res.status(500).json({ error: 'Failed to fetch categories' });
      return;
    }
    res.json(results);
  });
});

// Add a new category
router.post('/categories', (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO categories (name) VALUES (?)', [name], (err, results) => {
    if (err) {
      console.error('Error adding category:', err.stack);
      res.status(500).json({ error: 'Failed to add category' });
      return;
    }
    res.status(201).json({ id: results.insertId, name });
  });
});

module.exports = router;
