import React, { useState, useEffect } from "react";

const BankInfoForm = () => {
  const [formData, setFormData] = useState({
    driverID: "",
    transitNo: "",
    branchNo: "",
    accountNo: "",
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
      const response = await fetch("http://localhost:5001/api/bank-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Bank information added successfully!");
        setFormData({ driverID: "", transitNo: "", branchNo: "", accountNo: "" });
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
        name="transitNo"
        placeholder="Transit Number"
        value={formData.transitNo}
        onChange={handleChange}
        required
      />
      <input
        name="branchNo"
        placeholder="Branch Number"
        value={formData.branchNo}
        onChange={handleChange}
        required
      />
      <input
        name="accountNo"
        placeholder="Account Number"
        value={formData.accountNo}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Bank Information</button>
    </form>
  );
};

export default BankInfoForm;
