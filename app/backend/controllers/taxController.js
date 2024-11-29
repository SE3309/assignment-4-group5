const db = require("../db/connection");

// Fetch all records
exports.getAllTax = (req, res) => {
  db.query("SELECT * FROM Tax", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Fetch a single record by ID
exports.getTaxById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Tax WHERE taxID = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Tax not found" });
    res.status(200).json(results[0]);
  });
};

// Create a new record
exports.createTax = (req, res) => {
  const fields = ["entryID", "amount", "tax", "taxRate"];
  const placeholders = fields.map(() => "?").join(", ");
  const values = fields.map((field) => req.body[field]);

  db.query(
    `INSERT INTO Tax (entryID, amount, tax, taxRate) VALUES (${placeholders})`,
    values,
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Tax created successfully", id: result.insertId });
    }
  );
};

// Update an existing record
exports.updateTax = (req, res) => {
  const fields = ["entryID", "amount", "tax", "taxRate"];
  const assignments = fields.map((field) => `${field} = ?`).join(", ");
  const values = fields.map((field) => req.body[field]);
  const id = req.params.id;

  db.query(
    `UPDATE Tax SET ${assignments} WHERE taxID = ?`,
    [...values, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Tax updated successfully" });
    }
  );
};