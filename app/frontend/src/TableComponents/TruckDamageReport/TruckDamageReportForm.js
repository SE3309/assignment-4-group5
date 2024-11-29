import React, { useState, useEffect } from "react";

const TruckDamageReportForm = () => {
  const [formData, setFormData] = useState({
    truckID: "",
    damageData: "",
    damageDescription: ""
  });

  
  const [truckIDs, setTruckIDs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5001/api/truckids")
      .then((res) => res.json())
      .then(setTruckIDs)
      .catch(console.error);
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/truckdamagereport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("TruckDamageReport saved successfully!");
      } else {
        console.error("Error saving TruckDamageReport");
      }
    } catch (error) {
      console.error("Error saving TruckDamageReport", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="truckID"
        placeholder="truckID"
        value={formData.truckID}
        onChange={handleChange}
      />
<input
        name="damageData"
        placeholder="damageData"
        value={formData.damageData}
        onChange={handleChange}
      />
<input
        name="damageDescription"
        placeholder="damageDescription"
        value={formData.damageDescription}
        onChange={handleChange}
      />
      
      <select
        name="truckID"
        value={formData.truckID}
        onChange={handleChange}
      >
        <option value="">Select truckID</option>
        {truckIDs.map((item) => (
          <option key={item.truckID} value={item.truckID}>
            {item.name || item.id}
          </option>
        ))}
      </select>
      <button type="submit">Save</button>
    </form>
  );
};

export default TruckDamageReportForm;