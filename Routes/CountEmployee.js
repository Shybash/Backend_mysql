// backend/controllers/EmployeeController.js

const db = require('../db');
const express = require('express');
const router = express.Router();

router.get('/countEmp', (req, res) => {
  const query = 'SELECT COUNT(*) AS count FROM employees';
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ count: result[0].count });
  });
});

module.exports = router;
