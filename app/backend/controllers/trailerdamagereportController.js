const db = require("../db/connection");

// Fetch all trailer damage reports
exports.getAllTrailerDamageReports = (req, res) => {
  db.query("SELECT * FROM TrailerDamageReport", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

// Fetch a single trailer damage report by ID
exports.getTrailerDamageReportById = (req, res) => {
  const reportID = req.params.id;
  db.query(
    "SELECT * FROM TrailerDamageReport WHERE damageReportID = ?",
    [reportID],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ error: "Trailer damage report not found" });
      res.status(200).json(results[0]);
    }
  );
};

// Create a new trailer damage report
exports.createTrailerDamageReport = (req, res) => {
  const fields = ["trailerID", "damageData", "damageDescription"];
  const placeholders = fields.map(() => "?").join(", ");
  const values = fields.map((field) => req.body[field]);

  db.query(
    `INSERT INTO TrailerDamageReport (${fields.join(", ")}) VALUES (${placeholders})`,
    values,
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(201)
        .json({
          message: "Trailer damage report created successfully",
          id: result.insertId,
        });
    }
  );
};

// Update an existing trailer damage report
exports.updateTrailerDamageReport = (req, res) => {
  const fields = ["trailerID", "damageData", "damageDescription"];
  const assignments = fields.map((field) => `${field} = ?`).join(", ");
  const values = fields.map((field) => req.body[field]);
  const reportID = req.params.id;

  db.query(
    `UPDATE TrailerDamageReport SET ${assignments} WHERE trailerDamageReportID = ?`,
    [...values, reportID],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(200)
        .json({ message: "Trailer damage report updated successfully" });
    }
  );
};
