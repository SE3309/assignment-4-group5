const db = require("../db/connection");

// Fetch all records
exports.getAllInvoice = (req, res) => {
  db.query("SELECT * FROM Invoice", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Fetch a single record by ID
exports.getInvoiceById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Invoice WHERE invoiceID = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Invoice not found" });
    res.status(200).json(results[0]);
  });
};

// Create a new record
exports.createInvoice = (req, res) => {
  const fields = ["supplierID", "shipmentID", "invoiceNumber", "invoiceDate", "paymentDate"];
  const placeholders = fields.map(() => "?").join(", ");
  const values = fields.map((field) => req.body[field]);

  db.query(
    `INSERT INTO Invoice (supplierID, shipmentID, invoiceNumber, invoiceDate, paymentDate) VALUES (${placeholders})`,
    values,
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Invoice created successfully", id: result.insertId });
    }
  );
};

// Update an existing record
exports.updateInvoice = (req, res) => {
  const fields = ["supplierID", "shipmentID", "invoiceNumber", "invoiceDate", "paymentDate"];
  const assignments = fields.map((field) => `${field} = ?`).join(", ");
  const values = fields.map((field) => req.body[field]);
  const id = req.params.id;

  db.query(
    `UPDATE Invoice SET ${assignments} WHERE invoiceID = ?`,
    [...values, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Invoice updated successfully" });
    }
  );
};