import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const BankInformationForm = () => {
  const [formData, setFormData] = useState({
    driverID: "",
    transitNo: "",
    branchNo: "",
    accountNo: "",
  });

  const [drivers, setDrivers] = useState([]); // Store all drivers
  const [error, setError] = useState(null);

  // Fetch all drivers for the dropdown
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/driver"); // API to fetch all drivers
        if (!response.ok) {
          throw new Error("Failed to fetch drivers");
        }
        const data = await response.json();
        setDrivers(data); // Populate drivers
      } catch (err) {
        console.error("Error fetching drivers:", err);
        setError("Unable to load driver information. Please try again later.");
      }
    };

    fetchDrivers();
  }, []);

  // Fetch bank information for the selected driverID
  const fetchBankInformation = async (driverID) => {
    try {
      const response = await fetch(`http://localhost:5001/api/bankinformation/${driverID}`); // Fetch bank info by driverID
      if (!response.ok) {
        throw new Error("Failed to fetch bank information for the selected driver");
      }
      const data = await response.json();
      setFormData({
        driverID: data.driverID,
        transitNo: data.transitNo,
        branchNo: data.branchNo,
        accountNo: data.accountNo,
      });
    } catch (err) {
      console.error("Error fetching bank information:", err);
      setError("Unable to load bank information. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "driverID" && value) {
      fetchBankInformation(value); // Fetch bank information when a driver is selected
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/bankinformation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Bank information saved successfully!");
        setFormData({
          driverID: "",
          transitNo: "",
          branchNo: "",
          accountNo: "",
        });
      } else {
        const errorData = await response.json();
        alert(`Error saving bank information: ${errorData.message}`);
        console.error("Error saving bank information:", errorData);
      }
    } catch (error) {
      console.error("Error saving bank information:", error);
      alert("An error occurred while saving bank information. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow border-0">
        <div className="card-header bg-dark text-light text-center">
          <h3 className="card-title">Bank Information Form</h3>
        </div>
        <div className="card-body bg-light">
          <form onSubmit={handleSubmit}>
            {/* Driver Dropdown */}
            <div className="mb-3">
              <label htmlFor="driverID" className="form-label text-primary">
                Select Driver
              </label>
              <select
                name="driverID"
                id="driverID"
                className="form-select border-primary"
                value={formData.driverID}
                onChange={handleChange}
                required
              >
                <option value="">-- Choose a Driver --</option>
                {drivers.map((driver) => (
                  <option key={driver.driverID} value={driver.driverID}>
                    {driver.driverName} (ID: {driver.driverID})
                  </option>
                ))}
              </select>
            </div>

            {/* Transit Number */}
            <div className="mb-3">
              <label htmlFor="transitNo" className="form-label text-secondary">
                Transit Number
              </label>
              <input
                type="text"
                name="transitNo"
                id="transitNo"
                className="form-control border-secondary"
                placeholder="Enter Transit Number"
                value={formData.transitNo}
                onChange={handleChange}
                required
              />
            </div>

            {/* Branch Number */}
            <div className="mb-3">
              <label htmlFor="branchNo" className="form-label text-success">
                Branch Number
              </label>
              <input
                type="text"
                name="branchNo"
                id="branchNo"
                className="form-control border-success"
                placeholder="Enter Branch Number"
                value={formData.branchNo}
                onChange={handleChange}
                required
              />
            </div>

            {/* Account Number */}
            <div className="mb-3">
              <label htmlFor="accountNo" className="form-label text-danger">
                Account Number
              </label>
              <input
                type="text"
                name="accountNo"
                id="accountNo"
                className="form-control border-danger"
                placeholder="Enter Account Number"
                value={formData.accountNo}
                onChange={handleChange}
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="alert alert-danger text-center" role="alert">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center">
              <button type="submit" className="btn btn-dark btn-lg">
                Save Information
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BankInformationForm;
