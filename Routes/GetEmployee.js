const db = require('../db');
const express = require('express');
const router = express.Router();
// Get all employees
router.get('/getemployees', (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) {
      console.error('Error fetching employees:', err.stack);
      res.status(500).json({ error: 'Failed to fetch employees' });
      return;
    }
    res.json(results);
  });
});

module.exports=router;