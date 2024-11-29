const db = require("../db/connection");

// Fetch all records
exports.getAllSupplier = (req, res) => {
  db.query("SELECT * FROM Supplier", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Fetch a single record by ID
exports.getSupplierById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Supplier WHERE supplierID = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Supplier not found" });
    res.status(200).json(results[0]);
  });
};


// Create a new Supplier
exports.createSupplier = (req, res) => {
  const fields = [
    "supplierName",
    "contactPerson",
    "contactName",
    "supplierLongitude",
    "supplierLatitude",
    "supplierType",
    "businessHours",
  ]; // Define fields explicitly

  const placeholders = fields.map(() => "?").join(", ");
  const values = fields.map((field) => req.body[field]);

  db.query(
    `INSERT INTO Supplier (${fields.join(", ")}) VALUES (${placeholders})`,
    values,
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Supplier created successfully", id: result.insertId });
    }
  );
};


// Update an existing record
exports.updateSupplier = (req, res) => {
  const fields = [
    "supplierName",
    "contactPerson",
    "contactName",
    "supplierLongitude",
    "supplierLatitude",
    "supplierType",
    "businessHours",
  ]; // Define fields explicitly

  const assignments = fields.map((field) => `${field} = ?`).join(", ");
  const values = fields.map((field) => req.body[field]);
  const id = req.params.id;

  db.query(
    `UPDATE Supplier SET ${assignments} WHERE supplierID = ?`,
    [...values, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Supplier updated successfully" });
    }
  );
};