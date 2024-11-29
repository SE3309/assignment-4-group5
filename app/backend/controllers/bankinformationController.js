const db = require("../db/connection");

// Fetch all records
exports.getAllbankInformation = (req, res) => {
  db.query("SELECT * FROM bankInformation", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Fetch all driver IDs and names
exports.getDriverID = (req, res) => {
  db.query("SELECT driverID FROM bankInformation", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Fetch a single record by ID
exports.getbankInformationById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM bankInformation WHERE accountID = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "bankInformation not found" });
    res.status(200).json(results[0]);
  });
};

// Create a new record
exports.createbankInformation = (req, res) => {
  const fields = ["driverID", "transitNo", "branchNo", "accountNo"];
  const placeholders = fields.map(() => "?").join(", ");
  const values = fields.map((field) => req.body[field]);

  db.query(
    `INSERT INTO bankInformation (driverID, transitNo, branchNo, accountNo) VALUES (${placeholders})`,
    values,
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "bankInformation created successfully", id: result.insertId });
    }
  );
};

// Update an existing record
exports.updatebankInformation = (req, res) => {
  const fields = ["driverID", "transitNo", "branchNo", "accountNo"];
  const assignments = fields.map((field) => `${field} = ?`).join(", ");
  const values = fields.map((field) => req.body[field]);
  const id = req.params.id;

  db.query(
    `UPDATE bankInformation SET ${assignments} WHERE accountID = ?`,
    [...values, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "bankInformation updated successfully" });
    }
  );
};





