const mysql = require("mysql2");
require("dotenv").config(); // Load environment variables

const db = mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  port: process.env.DB_PORT || "3306",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "Obaid.2004",
  database: process.env.DB_NAME || "my_database",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
  console.log("Connected to MySQL database.");
});

module.exports = db;
