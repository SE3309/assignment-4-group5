const db = require("../db/connection");

// Fetch all records
exports.getAllTruck = (req, res) => {
  db.query("SELECT * FROM Truck", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Fetch a single record by ID
exports.getTruckById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Truck WHERE truckID = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Truck not found" });
    res.status(200).json(results[0]);
  });
};


exports.createTruck = (req, res) => {
  // Define fields for the Truck table
  const fields = [
    "driverID",
    "mileage",
    "licencePlateNumber",
    "VIN",
    "makeModelYear",
    "maxTowWeight",
    "insurancePolicyNo",
    "registration",
  ];

  const placeholders = fields.map(() => "?").join(", ");
  const values = fields.map((field) => req.body[field]);

  db.query(
    `INSERT INTO Truck (${fields.join(", ")}) VALUES (${placeholders})`,
    values,
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Truck created successfully", id: result.insertId });
    }
  );
};

// Update an existing record
exports.updateTruck = (req, res) => {
  const fields = [
    "driverID",
    "mileage",
    "licencePlateNumber",
    "VIN",
    "makeModelYear",
    "maxTowWeight",
    "insurancePolicyNo",
    "registration",
  ]; // Define fields explicitly
  
  const assignments = fields.map((field) => `${field} = ?`).join(", ");
  const values = fields.map((field) => req.body[field]);
  const truckID = req.params.id; // Extract truckID from request parameters

  db.query(
    `UPDATE Truck SET ${assignments} WHERE truckID = ?`,
    [...values, truckID],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Truck updated successfully" });
    }
  );
};

exports.getSupplierByTruck = (req, res) => {
  const truckID = req.params.id;
  db.query(
    "SELECT supplierID FROM Trailer WHERE truckID = ?",
    [truckID],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ error: "No supplier found for this truck" });
      res.status(200).json(results[0]); // Return the supplierID
    }
  );
};
