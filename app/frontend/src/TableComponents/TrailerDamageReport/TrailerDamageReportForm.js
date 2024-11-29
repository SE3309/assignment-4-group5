import React, { useState, useEffect } from "react";

const TrailerDamageReportForm = () => {
  const [formData, setFormData] = useState({
    trailerID: "",
    damageData: "",
    damageDescription: ""
  });

  
  const [trailerIDs, setTrailerIDs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5001/api/trailerids")
      .then((res) => res.json())
      .then(setTrailerIDs)
      .catch(console.error);
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/trailerdamagereport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("TrailerDamageReport saved successfully!");
      } else {
        console.error("Error saving TrailerDamageReport");
      }
    } catch (error) {
      console.error("Error saving TrailerDamageReport", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="trailerID"
        placeholder="trailerID"
        value={formData.trailerID}
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
        name="trailerID"
        value={formData.trailerID}
        onChange={handleChange}
      >
        <option value="">Select trailerID</option>
        {trailerIDs.map((item) => (
          <option key={item.trailerID} value={item.trailerID}>
            {item.name || item.id}
          </option>
        ))}
      </select>
      <button type="submit">Save</button>
    </form>
  );
};

export default TrailerDamageReportForm;