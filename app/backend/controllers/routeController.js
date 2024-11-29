const db = require("../db/connection");

// Fetch all records
exports.getAllRoute = (req, res) => {
  db.query("SELECT * FROM Route", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Fetch a single record by ID
exports.getRouteById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Route WHERE routeID = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Route not found" });
    res.status(200).json(results[0]);
  });
};

// Create a new record
exports.createRoute = (req, res) => {
  const fields = ["driverID", "shipmentID", "truckID", "trailerID", "pickupLongitude", "pickupLattitude", "pickupTime"];
  const placeholders = fields.map(() => "?").join(", ");
  const values = fields.map((field) => req.body[field]);

  db.query(
    `INSERT INTO Route (driverID, shipmentID, truckID, trailerID, pickupLongitude, pickupLattitude, pickupTime) VALUES (${placeholders})`,
    values,
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Route created successfully", id: result.insertId });
    }
  );
};

// Update an existing record
exports.updateRoute = (req, res) => {
  const fields = ["driverID", "shipmentID", "truckID", "trailerID", "pickupLongitude", "pickupLattitude", "pickupTime"];
  const assignments = fields.map((field) => `${field} = ?`).join(", ");
  const values = fields.map((field) => req.body[field]);
  const id = req.params.id;

  db.query(
    `UPDATE Route SET ${assignments} WHERE routeID = ?`,
    [...values, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Route updated successfully" });
    }
  );
};