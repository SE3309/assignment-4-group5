const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables from .env file

// MySQL Database Connection
const db = mysql.createConnection({
  host: "127.0.0.1", 
  port: "3306", 
  user: "root", 
  password: "Obaid.2004", 
  database: "my_database",
});

// Test the Database Connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1); // Exit the process with an error code
  }
  console.log('Connected to the MySQL database.');

  // Execute a test query
  const testQuery = 'SELECT * FROM Driver LIMIT 5'; // Adjust table name as needed
  db.query(testQuery, (queryErr, results) => {
    if (queryErr) {
      console.error('Error executing query:', queryErr.message);
      process.exit(1); // Exit the process with an error code
    }

    console.log('Test Query Results:', results);
    db.end(); // Close the connection
  });
});
