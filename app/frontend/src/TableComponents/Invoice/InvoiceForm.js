import React, { useState, useEffect } from "react";

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    supplierID: "",
    shipmentID: "",
    invoiceNumber: "",
    invoiceDate: "",
    paymentDate: ""
  });

  
  const [supplierIDs, setSupplierIDs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5001/api/supplierids")
      .then((res) => res.json())
      .then(setSupplierIDs)
      .catch(console.error);
  }, []);
  

  const [shipmentIDs, setShipmentIDs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5001/api/shipmentids")
      .then((res) => res.json())
      .then(setShipmentIDs)
      .catch(console.error);
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Invoice saved successfully!");
      } else {
        console.error("Error saving Invoice");
      }
    } catch (error) {
      console.error("Error saving Invoice", error);
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
        name="shipmentID"
        placeholder="shipmentID"
        value={formData.shipmentID}
        onChange={handleChange}
      />
<input
        name="invoiceNumber"
        placeholder="invoiceNumber"
        value={formData.invoiceNumber}
        onChange={handleChange}
      />
<input
        name="invoiceDate"
        placeholder="invoiceDate"
        value={formData.invoiceDate}
        onChange={handleChange}
      />
<input
        name="paymentDate"
        placeholder="paymentDate"
        value={formData.paymentDate}
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
      <button type="submit">Save</button>
    </form>
  );
};

export default InvoiceForm;