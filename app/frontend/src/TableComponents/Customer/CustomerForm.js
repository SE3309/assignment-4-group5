import React, { useState, useEffect } from "react";

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    customerLongitude: "",
    customerLatitude: "",
    customerName: "",
    typeOfStore: "",
    deliveryInstructions: ""
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Customer saved successfully!");
      } else {
        console.error("Error saving Customer");
      }
    } catch (error) {
      console.error("Error saving Customer", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="customerLongitude"
        placeholder="customerLongitude"
        value={formData.customerLongitude}
        onChange={handleChange}
      />
<input
        name="customerLatitude"
        placeholder="customerLatitude"
        value={formData.customerLatitude}
        onChange={handleChange}
      />
<input
        name="customerName"
        placeholder="customerName"
        value={formData.customerName}
        onChange={handleChange}
      />
<input
        name="typeOfStore"
        placeholder="typeOfStore"
        value={formData.typeOfStore}
        onChange={handleChange}
      />
<input
        name="deliveryInstructions"
        placeholder="deliveryInstructions"
        value={formData.deliveryInstructions}
        onChange={handleChange}
      />
      
      <button type="submit">Save</button>
    </form>
  );
};

export default CustomerForm;