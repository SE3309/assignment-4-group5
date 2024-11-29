const db = require("../db/connection");

// Fetch all records
exports.getAllTrips = (req, res) => {
  db.query("SELECT * FROM Trips", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Fetch a single record by ID
exports.getTripsById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Trips WHERE tripID = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Trips not found" });
    res.status(200).json(results[0]);
  });
};

// Create a new record
exports.createTrips = (req, res) => {
  const fields = ["routeID", "destinationLongitude", "destinationLatitude", "tripIndex"];
  const placeholders = fields.map(() => "?").join(", ");
  const values = fields.map((field) => req.body[field]);

  db.query(
    `INSERT INTO Trips (routeID, destinationLongitude, destinationLatitude, tripIndex) VALUES (${placeholders})`,
    values,
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Trips created successfully", id: result.insertId });
    }
  );
};

// Update an existing record
exports.updateTrips = (req, res) => {
  const fields = ["routeID", "destinationLongitude", "destinationLatitude", "tripIndex"];
  const assignments = fields.map((field) => `${field} = ?`).join(", ");
  const values = fields.map((field) => req.body[field]);
  const id = req.params.id;

  db.query(
    `UPDATE Trips SET ${assignments} WHERE tripID = ?`,
    [...values, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Trips updated successfully" });
    }
  );
};