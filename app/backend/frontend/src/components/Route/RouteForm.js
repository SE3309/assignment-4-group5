import React, { useState, useEffect } from "react";

const RouteForm = () => {
  const [formData, setFormData] = useState({
    driverID: "",
    shipmentID: "",
    truckID: "",
    trailerID: "",
    pickupLongitude: "",
    pickupLattitude: "",
    pickupTime: ""
  });

  
  const [driverIDs, setDriverIDs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5001/api/driverids")
      .then((res) => res.json())
      .then(setDriverIDs)
      .catch(console.error);
  }, []);
  

  const [shipmentIDs, setShipmentIDs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5001/api/shipmentids")
      .then((res) => res.json())
      .then(setShipmentIDs)
      .catch(console.error);
  }, []);
  

  const [truckIDs, setTruckIDs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5001/api/truckids")
      .then((res) => res.json())
      .then(setTruckIDs)
      .catch(console.error);
  }, []);
  

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
      const response = await fetch("http://localhost:5001/api/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Route saved successfully!");
      } else {
        console.error("Error saving Route");
      }
    } catch (error) {
      console.error("Error saving Route", error);
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
        name="shipmentID"
        placeholder="shipmentID"
        value={formData.shipmentID}
        onChange={handleChange}
      />
<input
        name="truckID"
        placeholder="truckID"
        value={formData.truckID}
        onChange={handleChange}
      />
<input
        name="trailerID"
        placeholder="trailerID"
        value={formData.trailerID}
        onChange={handleChange}
      />
<input
        name="pickupLongitude"
        placeholder="pickupLongitude"
        value={formData.pickupLongitude}
        onChange={handleChange}
      />
<input
        name="pickupLattitude"
        placeholder="pickupLattitude"
        value={formData.pickupLattitude}
        onChange={handleChange}
      />
<input
        name="pickupTime"
        placeholder="pickupTime"
        value={formData.pickupTime}
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

      <select
        name="shipmentID"
        value={formData.shipmentID}
        onChange={handleChange}
      >
        <option value="">Select shipmentID</option>
        {shipmentIDs.map((item) => (
          <option key={item.shipmentID} value={item.shipmentID}>
            {item.name || item.id}
          </option>
        ))}
      </select>

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

export default RouteForm;