import React, { useState, useEffect } from "react";

const SupplierContactInfoForm = () => {
  const [formData, setFormData] = useState({
    supplierID: "",
    contactPerson: "",
    contactNumber: ""
  });

  
  const [supplierIDs, setSupplierIDs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5001/api/supplierids")
      .then((res) => res.json())
      .then(setSupplierIDs)
      .catch(console.error);
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/suppliercontactinfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("SupplierContactInfo saved successfully!");
      } else {
        console.error("Error saving SupplierContactInfo");
      }
    } catch (error) {
      console.error("Error saving SupplierContactInfo", error);
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
        name="contactPerson"
        placeholder="contactPerson"
        value={formData.contactPerson}
        onChange={handleChange}
      />
<input
        name="contactNumber"
        placeholder="contactNumber"
        value={formData.contactNumber}
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
      <button type="submit">Save</button>
    </form>
  );
};

export default SupplierContactInfoForm;