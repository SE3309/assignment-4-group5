const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST, 
  port: process.env.DB_PORT, 
  user: process.env.DB_USER, 
  password: process.env.DB_PASS, 
  database: process.env.DB_NAME, 
});

// Test Database Connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the MySQL database.');
  }
});

// API Endpoints
app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM Driver'; 
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json(results);
  });
});

app.post('/api/add-user', (req, res) => {
  const { name, email } = req.body; 
  const query = 'INSERT INTO ... ';
  db.query(query, [name, email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ message: 'Driver added successfully', id: results.insertId });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
