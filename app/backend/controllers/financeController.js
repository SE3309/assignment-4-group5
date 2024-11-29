const db = require("../db/connection");

// Fetch all records
exports.getAllFinance = (req, res) => {
  db.query("SELECT * FROM Finance", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Fetch a single record by ID
exports.getFinanceById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Finance WHERE entryID = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Finance not found" });
    res.status(200).json(results[0]);
  });
};

// Create a new record
exports.createFinance = (req, res) => {
  const fields = ["truckID", "expense", "totalAmount", "paymentMethod", "paymentDate"];
  const placeholders = fields.map(() => "?").join(", ");
  const values = fields.map((field) => req.body[field]);

  db.query(
    `INSERT INTO Finance (truckID, expense, totalAmount, paymentMethod, paymentDate) VALUES (${placeholders})`,
    values,
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Finance created successfully", id: result.insertId });
    }
  );
};

// Update an existing record
exports.updateFinance = (req, res) => {
  const fields = ["truckID", "expense", "totalAmount", "paymentMethod", "paymentDate"];
  const assignments = fields.map((field) => `${field} = ?`).join(", ");
  const values = fields.map((field) => req.body[field]);
  const id = req.params.id;

  db.query(
    `UPDATE Finance SET ${assignments} WHERE entryID = ?`,
    [...values, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Finance updated successfully" });
    }
  );
};