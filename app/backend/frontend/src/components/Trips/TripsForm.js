import React, { useState, useEffect } from "react";

const TripsForm = () => {
  const [formData, setFormData] = useState({
    routeID: "",
    destinationLongitude: "",
    destinationLatitude: "",
    tripIndex: ""
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
      const response = await fetch("http://localhost:5001/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Trips saved successfully!");
      } else {
        console.error("Error saving Trips");
      }
    } catch (error) {
      console.error("Error saving Trips", error);
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
        name="destinationLongitude"
        placeholder="destinationLongitude"
        value={formData.destinationLongitude}
        onChange={handleChange}
      />
<input
        name="destinationLatitude"
        placeholder="destinationLatitude"
        value={formData.destinationLatitude}
        onChange={handleChange}
      />
<input
        name="tripIndex"
        placeholder="tripIndex"
        value={formData.tripIndex}
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

export default TripsForm;