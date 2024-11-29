import React, { useState, useEffect } from "react";

const ProofOfDeliveryForm = () => {
  const [formData, setFormData] = useState({
    routeID: "",
    proofOfDelivery: "",
    PODNo: ""
  });

  
  const [routeIDs, setRouteIDs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5001/api/routeids")
      .then((res) => res.json())
      .then(setRouteIDs)
      .catch(console.error);
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/proofofdelivery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("ProofOfDelivery saved successfully!");
      } else {
        console.error("Error saving ProofOfDelivery");
      }
    } catch (error) {
      console.error("Error saving ProofOfDelivery", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="routeID"
        placeholder="routeID"
        value={formData.routeID}
        onChange={handleChange}
      />
<input
        name="proofOfDelivery"
        placeholder="proofOfDelivery"
        value={formData.proofOfDelivery}
        onChange={handleChange}
      />
<input
        name="PODNo"
        placeholder="PODNo"
        value={formData.PODNo}
        onChange={handleChange}
      />
      
      <select
        name="routeID"
        value={formData.routeID}
        onChange={handleChange}
      >
        <option value="">Select routeID</option>
        {routeIDs.map((item) => (
          <option key={item.routeID} value={item.routeID}>
            {item.name || item.id}
          </option>
        ))}
      </select>
      <button type="submit">Save</button>
    </form>
  );
};

export default ProofOfDeliveryForm;