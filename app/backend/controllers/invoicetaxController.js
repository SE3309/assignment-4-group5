const db = require("../db/connection");

// Fetch all records
exports.getAllInvoiceTax = (req, res) => {
  db.query("SELECT * FROM InvoiceTax", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Fetch a single record by ID
exports.getInvoiceTaxById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM InvoiceTax WHERE invoiceTaxID = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "InvoiceTax not found" });
    res.status(200).json(results[0]);
  });
};

// Create a new record
exports.createInvoiceTax = (req, res) => {
  const fields = ["invoiceID", "totalAmount", "taxedAmount", "currency", "paymentTerms"];
  const placeholders = fields.map(() => "?").join(", ");
  const values = fields.map((field) => req.body[field]);

  db.query(
    `INSERT INTO InvoiceTax (invoiceID, totalAmount, taxedAmount, currency, paymentTerms) VALUES (${placeholders})`,
    values,
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "InvoiceTax created successfully", id: result.insertId });
    }
  );
};

// Update an existing record
exports.updateInvoiceTax = (req, res) => {
  const fields = ["invoiceID", "totalAmount", "taxedAmount", "currency", "paymentTerms"];
  const assignments = fields.map((field) => `${field} = ?`).join(", ");
  const values = fields.map((field) => req.body[field]);
  const id = req.params.id;

  db.query(
    `UPDATE InvoiceTax SET ${assignments} WHERE invoiceTaxID = ?`,
    [...values, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "InvoiceTax updated successfully" });
    }
  );
};