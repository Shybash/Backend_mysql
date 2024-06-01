// backend/controllers/EmployeeController.js

const db = require('../db');
const express = require('express');
const router = express.Router();

router.get('/countTrans', (req, res) => {
    const query = 'SELECT SUM(amount) AS total_amount FROM transactions';
    db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ total_amount: result[0].total_amount });
  });
});

module.exports = router;
