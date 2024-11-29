const db = require("../db/connection");

// Fetch all records
exports.getAllTruckDamageReport = (req, res) => {
  db.query("SELECT * FROM TruckDamageReport", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Fetch a single record by ID
exports.getTruckDamageReportById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM TruckDamageReport WHERE damageReportID = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "TruckDamageReport not found" });
    res.status(200).json(results[0]);
  });
};

// Create a new record
exports.createTruckDamageReport = (req, res) => {
  const fields = ["truckID", "damageData", "damageDescription"];
  const placeholders = fields.map(() => "?").join(", ");
  const values = fields.map((field) => req.body[field]);

  db.query(
    `INSERT INTO TruckDamageReport (truckID, damageData, damageDescription) VALUES (${placeholders})`,
    values,
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "TruckDamageReport created successfully", id: result.insertId });
    }
  );
};

// Update an existing record
exports.updateTruckDamageReport = (req, res) => {
  const fields = ["truckID", "damageData", "damageDescription"];
  const assignments = fields.map((field) => `${field} = ?`).join(", ");
  const values = fields.map((field) => req.body[field]);
  const id = req.params.id;

  db.query(
    `UPDATE TruckDamageReport SET ${assignments} WHERE damageReportID = ?`,
    [...values, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "TruckDamageReport updated successfully" });
    }
  );
};