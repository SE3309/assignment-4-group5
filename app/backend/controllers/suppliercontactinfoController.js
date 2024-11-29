const db = require("../db/connection");

// Fetch all records
exports.getAllSupplierContactInfo = (req, res) => {
  db.query("SELECT * FROM SupplierContactInfo", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Fetch a single record by ID
exports.getSupplierContactInfoById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM SupplierContactInfo WHERE supplierContactInfoID = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "SupplierContactInfo not found" });
    res.status(200).json(results[0]);
  });
};

// Create a new record
exports.createSupplierContactInfo = (req, res) => {
  const fields = ["supplierID", "contactPerson", "contactNumber"]; // Define fields explicitly
  const placeholders = fields.map(() => "?").join(", ");
  const values = fields.map((field) => req.body[field]);

  db.query(
    `INSERT INTO SupplierContactInfo (supplierID, contactPerson, contactNumber) VALUES (${placeholders})`,
    values,
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "SupplierContactInfo created successfully", id: result.insertId });
    }
  );
};

// Update an existing record
exports.updateSupplierContactInfo = (req, res) => {
  const fields = ["supplierID", "contactPerson", "contactNumber"]; // Define fields explicitly
  const assignments = fields.map((field) => `${field} = ?`).join(", ");
  const values = fields.map((field) => req.body[field]);
  const id = req.params.id;

  db.query(
    `UPDATE SupplierContactInfo SET ${assignments} WHERE supplierContactInfoID = ?`,
    [...values, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "SupplierContactInfo updated successfully" });
    }
  );
};