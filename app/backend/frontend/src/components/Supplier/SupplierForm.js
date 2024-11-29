import React, { useState, useEffect } from "react";

const SupplierForm = () => {
  const [formData, setFormData] = useState({
    supplierName: "",
    contactPerson: "",
    contactName: "",
    supplierLongitude: "",
    supplierLatitude: "",
    supplierType: "",
    businessHours: ""
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/supplier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Supplier saved successfully!");
      } else {
        console.error("Error saving Supplier");
      }
    } catch (error) {
      console.error("Error saving Supplier", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="supplierName"
        placeholder="supplierName"
        value={formData.supplierName}
        onChange={handleChange}
      />
<input
        name="contactPerson"
        placeholder="contactPerson"
        value={formData.contactPerson}
        onChange={handleChange}
      />
<input
        name="contactName"
        placeholder="contactName"
        value={formData.contactName}
        onChange={handleChange}
      />
<input
        name="supplierLongitude"
        placeholder="supplierLongitude"
        value={formData.supplierLongitude}
        onChange={handleChange}
      />
<input
        name="supplierLatitude"
        placeholder="supplierLatitude"
        value={formData.supplierLatitude}
        onChange={handleChange}
      />
<input
        name="supplierType"
        placeholder="supplierType"
        value={formData.supplierType}
        onChange={handleChange}
      />
<input
        name="businessHours"
        placeholder="businessHours"
        value={formData.businessHours}
        onChange={handleChange}
      />
      
      <button type="submit">Save</button>
    </form>
  );
};

export default SupplierForm;