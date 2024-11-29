import React, { useState, useEffect } from "react";

const CustomerContactInfoForm = () => {
  const [formData, setFormData] = useState({
    customerID: "",
    contactPerson: "",
    contactNumber: ""
  });

  
  const [customerIDs, setCustomerIDs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5001/api/customerids")
      .then((res) => res.json())
      .then(setCustomerIDs)
      .catch(console.error);
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/customercontactinfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("CustomerContactInfo saved successfully!");
      } else {
        console.error("Error saving CustomerContactInfo");
      }
    } catch (error) {
      console.error("Error saving CustomerContactInfo", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="customerID"
        placeholder="customerID"
        value={formData.customerID}
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
      <button type="submit">Save</button>
    </form>
  );
};

export default CustomerContactInfoForm;