import React, { useState, useEffect } from "react";

const EmergencyInformationForm = () => {
  const [formData, setFormData] = useState({
    driverID: "",
    contanctName: "",
    contactNumber: ""
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
      const response = await fetch("http://localhost:5001/api/emergencyinformation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("EmergencyInformation saved successfully!");
      } else {
        console.error("Error saving EmergencyInformation");
      }
    } catch (error) {
      console.error("Error saving EmergencyInformation", error);
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
        name="contanctName"
        placeholder="contanctName"
        value={formData.contanctName}
        onChange={handleChange}
      />
<input
        name="contactNumber"
        placeholder="contactNumber"
        value={formData.contactNumber}
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

export default EmergencyInformationForm;