const db = require("../db/connection");

// Fetch all records
exports.getAllProofOfDelivery = (req, res) => {
  db.query("SELECT * FROM ProofOfDelivery", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Fetch a single record by ID
exports.getProofOfDeliveryById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM ProofOfDelivery WHERE podID = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "ProofOfDelivery not found" });
    res.status(200).json(results[0]);
  });
};

// Create a new record
exports.createProofOfDelivery = (req, res) => {
  const fields = ["routeID", "proofOfDelivery", "PODNo"];
  const placeholders = fields.map(() => "?").join(", ");
  const values = fields.map((field) => req.body[field]);

  db.query(
    `INSERT INTO ProofOfDelivery (routeID, proofOfDelivery, PODNo) VALUES (${placeholders})`,
    values,
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "ProofOfDelivery created successfully", id: result.insertId });
    }
  );
};

// Update an existing record
exports.updateProofOfDelivery = (req, res) => {
  const fields = ["routeID", "proofOfDelivery", "PODNo"];
  const assignments = fields.map((field) => `${field} = ?`).join(", ");
  const values = fields.map((field) => req.body[field]);
  const id = req.params.id;

  db.query(
    `UPDATE ProofOfDelivery SET ${assignments} WHERE podID = ?`,
    [...values, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "ProofOfDelivery updated successfully" });
    }
  );
};