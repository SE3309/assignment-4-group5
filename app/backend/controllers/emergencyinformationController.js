const db = require("../db/connection");

// Fetch all records
exports.getAllEmergencyInformation = (req, res) => {
  db.query("SELECT * FROM EmergencyInformation", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Fetch a single record by ID
exports.getEmergencyInformationById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM EmergencyInformation WHERE emergencyContactID = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "EmergencyInformation not found" });
    res.status(200).json(results[0]);
  });
};

// Create a new record
exports.createEmergencyInformation = (req, res) => {
  const fields = ["driverID", "contanctName", "contactNumber"];
  const placeholders = fields.map(() => "?").join(", ");
  const values = fields.map((field) => req.body[field]);

  db.query(
    `INSERT INTO EmergencyInformation (driverID, contanctName, contactNumber) VALUES (${placeholders})`,
    values,
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "EmergencyInformation created successfully", id: result.insertId });
    }
  );
};

// Update an existing record
exports.updateEmergencyInformation = (req, res) => {
  const fields = ["driverID", "contanctName", "contactNumber"];
  const assignments = fields.map((field) => `${field} = ?`).join(", ");
  const values = fields.map((field) => req.body[field]);
  const id = req.params.id;

  db.query(
    `UPDATE EmergencyInformation SET ${assignments} WHERE emergencyContactID = ?`,
    [...values, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "EmergencyInformation updated successfully" });
    }
  );
};