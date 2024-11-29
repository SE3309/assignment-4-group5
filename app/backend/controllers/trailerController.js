const db = require("../db/connection");

// Fetch all records
exports.getAllTrailer = (req, res) => {
  db.query("SELECT * FROM Trailer", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Fetch a single record by ID
exports.getTrailerById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Trailer WHERE trailerID = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Trailer not found" });
    res.status(200).json(results[0]);
  });
};

// Create a new record
exports.createTrailer = (req, res) => {
  const fields = [
    "supplierID",
    "truckID",
    "trailerCapacity",
    "maxLoadWeight",
    "trailerLength",
    "trailerType",
    "licensePlateNumber",
    "VIN",
    "makeModelYear",
    "registration",
  ];
  const placeholders = fields.map(() => "?").join(", ");
  const values = fields.map((field) => req.body[field]);

  db.query(
    `INSERT INTO Trailer (supplierID, truckID, trailerCapacity, maxLoadWeight, trailerLength, trailerType, licensePlateNumber, VIN, makeModelYear, registration) VALUES (${placeholders})`,
    values,
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Trailer created successfully", id: result.insertId });
    }
  );
};

// Update an existing record
exports.updateTrailer = (req, res) => {
  const fields = [
    "supplierID",
    "truckID",
    "trailerCapacity",
    "maxLoadWeight",
    "trailerLength",
    "trailerType",
    "licensePlateNumber",
    "VIN",
    "makeModelYear",
    "registration",
  ];
  const assignments = fields.map((field) => `${field} = ?`).join(", ");
  const values = fields.map((field) => req.body[field]);
  const id = req.params.id;

  db.query(
    `UPDATE Trailer SET ${assignments} WHERE trailerID = ?`,
    [...values, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Trailer updated successfully" });
    }
  );
};