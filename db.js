// backend/db/connection.js

const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables from .env file

// Establish the database connection pool using environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10, // Adjust the connection limit as needed
  queueLimit: 0
});

// Log a message upon successful connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to database successfully');
    connection.release(); // Release the connection
  }
});

module.exports = pool;
