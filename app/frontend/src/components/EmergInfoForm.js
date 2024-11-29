import React, { useState, useEffect } from "react";

const EmergencyInfoForm = () => {
  const [formData, setFormData] = useState({
    driverID: "",
    contactName: "",
    contactNumber: "",
  });

  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    // Fetch driver data for the dropdown
    fetch("http://localhost:5001/api/drivers")
      .then((response) => response.json())
      .then((data) => setDrivers(data))
      .catch((error) => console.error("Error fetching drivers:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/emergency-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Emergency contact added successfully!");
        setFormData({ driverID: "", contactName: "", contactNumber: "" });
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        name="driverID"
        value={formData.driverID}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Select Driver
        </option>
        {drivers.map((driver) => (
          <option key={driver.driverID} value={driver.driverID}>
            {driver.driverName}
          </option>
        ))}
      </select>
      <input
        name="contactName"
        placeholder="Contact Name"
        value={formData.contactName}
        onChange={handleChange}
        required
      />
      <input
        name="contactNumber"
        placeholder="Contact Number"
        value={formData.contactNumber}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Emergency Contact</button>
    </form>
  );
};

export default EmergencyInfoForm;
