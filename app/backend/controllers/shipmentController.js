const db = require("../db/connection");

// Fetch all records
exports.getAllShipment = (req, res) => {
  db.query("SELECT * FROM Shipment", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Fetch a single record by ID
exports.getShipmentById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Shipment WHERE shipmentID = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Shipment not found" });
    res.status(200).json(results[0]);
  });
};

// Create a new record
exports.createShipment = (req, res) => {
  const fields = [
    "supplierID",
    "customerID",
    "trailerID",
    "loadWeight",
    "typeOfProduct",
    "deliveryType",
  ]; // Define fields explicitly
  const placeholders = fields.map(() => "?").join(", ");
  const values = fields.map((field) => req.body[field]);

  db.query(
    `INSERT INTO Shipment (supplierID, customerID, trailerID, loadWeight, typeOfProduct, deliveryType) VALUES (${placeholders})`,
    values,
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Shipment created successfully", id: result.insertId });
    }
  );
};

// Update an existing record
exports.updateShipment = (req, res) => {
  const fields = [
    "supplierID",
    "customerID",
    "trailerID",
    "loadWeight",
    "typeOfProduct",
    "deliveryType",
  ]; // Define fields explicitly
  const assignments = fields.map((field) => `${field} = ?`).join(", ");
  const values = fields.map((field) => req.body[field]);
  const id = req.params.id;

  db.query(
    `UPDATE Shipment SET ${assignments} WHERE shipmentID = ?`,
    [...values, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Shipment updated successfully" });
    }
  );
};