const db = require("../db/connection");

// Fetch all records
exports.getAllCustomer = (req, res) => {
  db.query("SELECT * FROM Customer", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Fetch a single record by ID
exports.getCustomerById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Customer WHERE customerID = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Customer not found" });
    res.status(200).json(results[0]);
  });
};

// Create a new record
exports.createCustomer = (req, res) => {
  const fields = [
    "customerLongitude",
    "customerLatitude",
    "customerName",
    "typeOfStore",
    "deliveryInstructions",
  ];  
  const placeholders = fields.map(() => "?").join(", ");
  const values = fields.map((field) => req.body[field]);

  db.query(
    `INSERT INTO Customer (customerLongitude, customerLatitude, customerName, typeOfStore, deliveryInstructions) VALUES (${placeholders})`,
    values,
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Customer created successfully", id: result.insertId });
    }
  );
};

// Update an existing record
exports.updateCustomer = (req, res) => {
  const fields = [
    "customerLongitude",
    "customerLatitude",
    "customerName",
    "typeOfStore",
    "deliveryInstructions",
  ];
    
  const assignments = fields.map((field) => `${field} = ?`).join(", ");
  const values = fields.map((field) => req.body[field]);
  const id = req.params.id;

  db.query(
    `UPDATE Customer SET ${assignments} WHERE customerID = ?`,
    [...values, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Customer updated successfully" });
    }
  );
};