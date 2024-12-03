const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

// Search endpoint
router.get("/", async (req, res) => {
  const { type, query } = req.query; // e.g., type='drivers', query='John'

  if (!type || !query) {
    return res.status(400).json({ message: "Type and query are required." });
  }

  try {
    let sqlQuery = "";
    let params = [`%${query}%`];

    // Determine the type of entity to search
    switch (type.toLowerCase()) {
      case "drivers":
        sqlQuery = `
          SELECT driverID, licenseNumber, driverName, homeAddress, yearsOfExperience, numberOfDeliveries
          FROM Driver
          WHERE driverName LIKE ? OR licenseNumber LIKE ?`;
        params.push(`%${query}%`);
        break;

      case "trucks":
        sqlQuery = `
          SELECT truckID, licencePlateNumber, VIN, makeModelYear, mileage, maxTowWeight
          FROM Truck
          WHERE licencePlateNumber LIKE ? OR VIN LIKE ?`;
        params.push(`%${query}%`);
        break;

      case "shipments":
        sqlQuery = `
          SELECT s.shipmentID, s.typeOfProduct, su.supplierName, c.customerName, s.loadWeight
          FROM Shipment s
          JOIN Supplier su ON s.supplierID = su.supplierID
          JOIN Customer c ON s.customerID = c.customerID
          WHERE s.typeOfProduct LIKE ? OR s.shipmentID LIKE ?`;
        params.push(`%${query}%`);
        break;

      case "suppliers":
        sqlQuery = `
          SELECT supplierID, supplierName, contactPerson, businessHours, supplierType
          FROM Supplier
          WHERE supplierName LIKE ?`;
        break;

      default:
        return res.status(400).json({ message: "Invalid search type." });
    }

    // Execute the query
    const [results] = await pool.query(sqlQuery, params);

    res.json({ type, results });
  } catch (error) {
    console.error("Error executing search:", error);
    res.status(500).json({ message: "Server error occurred while searching." });
  }
});

module.exports = router;
