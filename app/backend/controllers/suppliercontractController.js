const db = require("../db/connection");

// Fetch all records
exports.getAllSupplierContract = (req, res) => {
  db.query("SELECT * FROM SupplierContract", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Fetch a single record by ID
exports.getSupplierContractById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM SupplierContract WHERE contractID = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "SupplierContract not found" });
    res.status(200).json(results[0]);
  });
};

// Create a new record
exports.createSupplierContract = (req, res) => {
  const fields = ["supplierID", "contractStart", "contractEnd", "productType"]; // Define fields explicitly
  const placeholders = fields.map(() => "?").join(", ");
  const values = fields.map((field) => req.body[field]);

  db.query(
    `INSERT INTO SupplierContract (supplierID, contractStart, contractEnd, productType) VALUES (${placeholders})`,
    values,
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "SupplierContract created successfully", id: result.insertId });
    }
  );
};

// Update an existing record
exports.updateSupplierContract = (req, res) => {
  const fields = ["supplierID", "contractStart", "contractEnd", "productType"]; // Define fields explicitly
  const assignments = fields.map((field) => `${field} = ?`).join(", ");
  const values = fields.map((field) => req.body[field]);
  const id = req.params.id;

  db.query(
    `UPDATE SupplierContract SET ${assignments} WHERE contractID = ?`,
    [...values, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "SupplierContract updated successfully" });
    }
  );
};