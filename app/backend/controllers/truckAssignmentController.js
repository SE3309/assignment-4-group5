const db = require("../db/connection");

exports.assignTruckToDriver = (req, res) => {
    const {
        newDriverID,
        mileage,
        licensePlateNumber,
        VIN,
        makeModelYear,
        maxTowWeight,
        insurancePolicyNo,
        registration
    } = req.body;

    const validateDriverQuery = `
        SELECT truckOwnedorAssigned
        FROM Driver
        WHERE driverID = ? AND truckOwnedorAssigned = 'UNASSIGNED'
    `;

    const assignTruckQuery = `
        INSERT INTO Truck (driverID, mileage, licensePlateNumber, VIN, makeModelYear, maxTowWeight, insurancePolicyNo, registration)
        SELECT ?, ?, ?, ?, ?, ?, ?, ?
        WHERE NOT EXISTS (
            SELECT 1
            FROM Truck t
            JOIN Driver d ON t.driverID = d.driverID
            WHERE t.licensePlateNumber = ?
              AND d.workingStatus = 'Active'
        );
    `;

    const updateDriverStatusQuery = `
        UPDATE Driver
        SET truckOwnedorAssigned = 'ASSIGNED'
        WHERE driverID = ?
    `;

    db.query(validateDriverQuery, [newDriverID], (validateErr, validateResult) => {
        if (validateErr) {
            console.error("Error validating driver:", validateErr);
            return res.status(500).json({ error: "Database error during driver validation" });
        }

        if (validateResult.length === 0) {
            return res.status(400).json({ error: "Driver is not UNASSIGNED or does not exist" });
        }

        const values = [
            newDriverID, mileage, licensePlateNumber, VIN, makeModelYear, maxTowWeight, insurancePolicyNo, registration,
            licensePlateNumber
        ];

        db.query(assignTruckQuery, values, (assignErr, assignResult) => {
            if (assignErr) {
                console.error("Error assigning truck:", assignErr);
                return res.status(500).json({ error: "Database error during truck assignment" });
            }

            if (assignResult.affectedRows === 0) {
                return res.status(400).json({ error: "Truck is already assigned to an active driver" });
            }

            db.query(updateDriverStatusQuery, [newDriverID], (updateErr) => {
                if (updateErr) {
                    console.error("Error updating driver status:", updateErr);
                    return res.status(500).json({ error: "Database error during driver status update" });
                }

                res.status(200).json({ message: "Truck assigned successfully and driver status updated to ASSIGNED" });
            });
        });
    });
};
