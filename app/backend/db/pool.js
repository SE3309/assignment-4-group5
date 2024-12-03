const mysql = require("mysql2/promise");
require("dotenv").config(); // Load environment variables

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Obaid.2004",
  database: process.env.DB_NAME || "my_database",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
