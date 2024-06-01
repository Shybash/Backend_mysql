const express = require('express');
const router = express.Router();
const db = require('../db');

// Add a new transaction
router.post('/transactions', (req, res) => {
  const { employeeId, amount, type } = req.body;

  const query = 'INSERT INTO transactions (employeeId, amount, type) VALUES (?, ?, ?)';
  db.query(query, [employeeId, amount, type], (err, result) => {
    if (err) {
      console.error('Error processing transaction:', err);
      res.status(500).send('Error processing transaction');
      return;
    }
    res.status(201).send('Transaction successful');
  });
});

module.exports = router;
