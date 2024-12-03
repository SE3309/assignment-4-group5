const db = require("../db/connection");

// Fetch all records
exports.getAllDriverPhone = (req, res) => {
  db.query("SELECT * FROM DriverPhone", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Fetch a single record by ID
exports.getDriverPhoneById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM DriverPhone WHERE phoneID = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "DriverPhone not found" });
    res.status(200).json(results[0]);
  });
};

// Create a new record
exports.createDriverPhone = (req, res) => {
  const fields = ["driverID", "phoneNumber", "phoneType"]; // Define fields explicitly
  const placeholders = fields.map(() => "?").join(", ");
  const values = fields.map((field) => req.body[field]);

  db.query(
    `INSERT INTO DriverPhone (${fields.join(", ")}) VALUES (${placeholders})`,
    values,
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "DriverPhone created successfully", id: result.insertId });
    }
  );
};

// Update an existing record
exports.updateDriverPhone = (req, res) => {
  const fields = ["driverID", "phoneNumber", "phoneType"]; 
  const assignments = fields.map((field) => `${field} = ?`).join(", ");
  const values = fields.map((field) => req.body[field]);
  const id = req.params.id;

  db.query(
    `UPDATE DriverPhone SET ${assignments} WHERE phoneID = ?`,
    [...values, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "DriverPhone updated successfully" });
    }
  );
};