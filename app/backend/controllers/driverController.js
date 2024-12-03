const db = require("../db/connection");

// Fetch all drivers
exports.getAllDrivers = (req, res) => {
  db.query("SELECT * FROM Driver", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Fetch a single driver by ID
exports.getDriverById = (req, res) => {
  const driverID = req.params.id;
  db.query("SELECT * FROM Driver WHERE driverID = ?", [driverID], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Driver not found" });
    res.status(200).json(results[0]);
  });
};

// Create a new driver
exports.createDriver = (req, res) => {
  const fields = [
    "licenseNumber",
    "driverName",
    "homeAddress",
    "yearsOfExperience",
    "numberOfDeliveries",
    "email",
    "age",
    "salary",
    "employmentDate",
    "workingStatus",
    "truckOwnedorAssigned",
  ];

  const placeholders = fields.map(() => "?").join(", ");
  const values = fields.map((field) => req.body[field]);

  db.query(
    `INSERT INTO Driver (${fields.join(", ")}) VALUES (${placeholders})`,
    values,
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Driver created successfully", id: result.insertId });
    }
  );
};

// Update an existing driver
exports.updateDriver = (req, res) => {
  const fields = [
    "licenseNumber",
    "driverName",
    "homeAddress",
    "yearsOfExperience",
    "numberOfDeliveries",
    "email",
    "age",
    "salary",
    "employmentDate",
    "workingStatus",
    "truckOwnedorAssigned",
  ];

  const assignments = fields.map((field) => `${field} = ?`).join(", ");
  const values = fields.map((field) => req.body[field]);
  const driverID = req.params.id;

  db.query(
    `UPDATE Driver SET ${assignments} WHERE driverID = ?`,
    [...values, driverID],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Driver updated successfully" });
    }
  );
};

// Fetch top-performing drivers
exports.getTopPerformingDrivers = (req, res) => {
  const query = `
  SELECT d.driverID, d.driverName, d.numberOfDeliveries 
  FROM Driver d 
  ORDER BY d.numberOfDeliveries DESC 
  LIMIT 10;
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: "This is what's not working" });
    res.status(200).json(results);
  });
};

// Fetch average deliveries per driver
exports.getAverageDeliveries = (req, res) => {
  const query = `
  SELECT AVG(numberOfDeliveries) AS averageDeliveries 
  FROM Driver;
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results[0]); // Send the first row which contains the result
  });
};