import React, { useState, useEffect } from "react";

const ShipmentForm = () => {
  const [formData, setFormData] = useState({
    supplierID: "",
    customerID: "",
    trailerID: "",
    loadWeight: "",
    typeOfProduct: "",
    deliveryType: ""
  });

  
  const [supplierIDs, setSupplierIDs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5001/api/supplierids")
      .then((res) => res.json())
      .then(setSupplierIDs)
      .catch(console.error);
  }, []);
  

  const [customerIDs, setCustomerIDs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5001/api/customerids")
      .then((res) => res.json())
      .then(setCustomerIDs)
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
      const response = await fetch("http://localhost:5001/api/shipment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Shipment saved successfully!");
      } else {
        console.error("Error saving Shipment");
      }
    } catch (error) {
      console.error("Error saving Shipment", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="supplierID"
        placeholder="supplierID"
        value={formData.supplierID}
        onChange={handleChange}
      />
<input
        name="customerID"
        placeholder="customerID"
        value={formData.customerID}
        onChange={handleChange}
      />
<input
        name="trailerID"
        placeholder="trailerID"
        value={formData.trailerID}
        onChange={handleChange}
      />
<input
        name="loadWeight"
        placeholder="loadWeight"
        value={formData.loadWeight}
        onChange={handleChange}
      />
<input
        name="typeOfProduct"
        placeholder="typeOfProduct"
        value={formData.typeOfProduct}
        onChange={handleChange}
      />
<input
        name="deliveryType"
        placeholder="deliveryType"
        value={formData.deliveryType}
        onChange={handleChange}
      />
      
      <select
        name="supplierID"
        value={formData.supplierID}
        onChange={handleChange}
      >
        <option value="">Select supplierID</option>
        {supplierIDs.map((item) => (
          <option key={item.supplierID} value={item.supplierID}>
            {item.name || item.id}
          </option>
        ))}
      </select>

      <select
        name="customerID"
        value={formData.customerID}
        onChange={handleChange}
      >
        <option value="">Select customerID</option>
        {customerIDs.map((item) => (
          <option key={item.customerID} value={item.customerID}>
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

export default ShipmentForm;