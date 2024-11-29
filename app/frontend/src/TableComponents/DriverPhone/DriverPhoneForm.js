import React, { useState, useEffect } from "react";

const DriverPhoneForm = () => {
  const [formData, setFormData] = useState({
    driverID: "",
    phoneNumber: "",
    phoneType: ""
  });

  
  const [driverIDs, setDriverIDs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5001/api/driverids")
      .then((res) => res.json())
      .then(setDriverIDs)
      .catch(console.error);
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/driverphone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("DriverPhone saved successfully!");
      } else {
        console.error("Error saving DriverPhone");
      }
    } catch (error) {
      console.error("Error saving DriverPhone", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="driverID"
        placeholder="driverID"
        value={formData.driverID}
        onChange={handleChange}
      />
<input
        name="phoneNumber"
        placeholder="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
      />
<input
        name="phoneType"
        placeholder="phoneType"
        value={formData.phoneType}
        onChange={handleChange}
      />
      
      <select
        name="driverID"
        value={formData.driverID}
        onChange={handleChange}
      >
        <option value="">Select driverID</option>
        {driverIDs.map((item) => (
          <option key={item.driverID} value={item.driverID}>
            {item.name || item.id}
          </option>
        ))}
      </select>
      <button type="submit">Save</button>
    </form>
  );
};

export default DriverPhoneForm;