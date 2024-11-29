import React, { useState, useEffect } from "react";

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
    <form onSubmit={handleSubmit}>
      {/* Driver Dropdown */}
      <label htmlFor="driverID">Driver</label>
      <select
        name="driverID"
        id="driverID"
        value={formData.driverID}
        onChange={handleChange}
        required
      >
        <option value="">Select a Driver</option>
        {drivers.map((driver) => (
          <option key={driver.driverID} value={driver.driverID}>
            {driver.driverName} (ID: {driver.driverID})
          </option>
        ))}
      </select>

      {/* Transit Number */}
      <label htmlFor="transitNo">Transit Number</label>
      <input
        type="text"
        name="transitNo"
        id="transitNo"
        placeholder="Transit Number"
        value={formData.transitNo}
        onChange={handleChange}
        required
      />

      {/* Branch Number */}
      <label htmlFor="branchNo">Branch Number</label>
      <input
        type="text"
        name="branchNo"
        id="branchNo"
        placeholder="Branch Number"
        value={formData.branchNo}
        onChange={handleChange}
        required
      />

      {/* Account Number */}
      <label htmlFor="accountNo">Account Number</label>
      <input
        type="text"
        name="accountNo"
        id="accountNo"
        placeholder="Account Number"
        value={formData.accountNo}
        onChange={handleChange}
        required
      />

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Submit Button */}
      <button type="submit">Save</button>
    </form>
  );
};

export default BankInformationForm;
