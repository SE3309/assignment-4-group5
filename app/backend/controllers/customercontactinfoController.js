const db = require("../db/connection");

// Fetch all records
exports.getAllCustomerContactInfo = (req, res) => {
  db.query("SELECT * FROM CustomerContactInfo", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Fetch a single record by ID
exports.getCustomerContactInfoById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM CustomerContactInfo WHERE customerContactInfoID = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "CustomerContactInfo not found" });
    res.status(200).json(results[0]);
  });
};

// Create a new record
exports.createCustomerContactInfo = (req, res) => {
  const fields = ["customerID", "contactPerson", "contactNumber"];
  const placeholders = fields.map(() => "?").join(", ");
  const values = fields.map((field) => req.body[field]);

  db.query(
    `INSERT INTO CustomerContactInfo (customerID, contactPerson, contactNumber) VALUES (${placeholders})`,
    values,
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "CustomerContactInfo created successfully", id: result.insertId });
    }
  );
};

// Update an existing record
exports.updateCustomerContactInfo = (req, res) => {
  const fields = ["customerID", "contactPerson", "contactNumber"];
  const assignments = fields.map((field) => `${field} = ?`).join(", ");
  const values = fields.map((field) => req.body[field]);
  const id = req.params.id;

  db.query(
    `UPDATE CustomerContactInfo SET ${assignments} WHERE customerContactInfoID = ?`,
    [...values, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "CustomerContactInfo updated successfully" });
    }
  );
};