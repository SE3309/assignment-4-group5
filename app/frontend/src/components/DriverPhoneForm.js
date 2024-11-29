import React, { useState, useEffect } from "react";

const DriverPhoneForm = () => {
  const [formData, setFormData] = useState({
    driverID: "",
    phoneNumber: "",
    phoneType: "MOBILE",
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
      const response = await fetch("http://localhost:5001/api/driver-phones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Driver phone added successfully!");
        setFormData({ driverID: "", phoneNumber: "", phoneType: "MOBILE" });
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
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
      />
      <select
        name="phoneType"
        value={formData.phoneType}
        onChange={handleChange}
      >
        <option value="MOBILE">Mobile</option>
        <option value="HOME">Home</option>
      </select>
      <button type="submit">Add Phone</button>
    </form>
  );
};

export default DriverPhoneForm;
