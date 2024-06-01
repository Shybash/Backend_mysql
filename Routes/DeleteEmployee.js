const db = require('../db');
const express = require('express');
const router = express.Router();

router.delete('/employees/:id', (req, res) => {
    const employeeId = req.params.id;

    db.getConnection((err, connection) => {
        if (err) return res.status(500).json({ error: err.message });

        connection.beginTransaction(err => {
            if (err) return res.status(500).json({ error: err.message });

            const deleteTransactionsQuery = 'DELETE FROM transactions WHERE employeeId = ?';
            connection.query(deleteTransactionsQuery, [employeeId], (err, result) => {
                if (err) {
                    return connection.rollback(() => {
                        connection.release();
                        return res.status(500).json({ error: err.message });
                    });
                }

                const deleteEmployeeQuery = 'DELETE FROM employees WHERE id = ?';
                connection.query(deleteEmployeeQuery, [employeeId], (err, result) => {
                    if (err) {
                        return connection.rollback(() => {
                            connection.release();
                            return res.status(500).json({ error: err.message });
                        });
                    }

                    connection.commit(err => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                return res.status(500).json({ error: err.message });
                            });
                        }

                        connection.release();
                        res.status(200).json({ message: 'Employee deleted successfully' });
                    });
                });
            });
        });
    });
});

module.exports = router;
