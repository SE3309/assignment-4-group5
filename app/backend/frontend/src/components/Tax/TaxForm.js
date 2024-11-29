import React, { useState, useEffect } from "react";

const TaxForm = () => {
  const [formData, setFormData] = useState({
    entryID: "",
    amount: "",
    tax: "",
    taxRate: ""
  });

  
  const [entryIDs, setEntryIDs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5001/api/entryids")
      .then((res) => res.json())
      .then(setEntryIDs)
      .catch(console.error);
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/tax", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Tax saved successfully!");
      } else {
        console.error("Error saving Tax");
      }
    } catch (error) {
      console.error("Error saving Tax", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="entryID"
        placeholder="entryID"
        value={formData.entryID}
        onChange={handleChange}
      />
<input
        name="amount"
        placeholder="amount"
        value={formData.amount}
        onChange={handleChange}
      />
<input
        name="tax"
        placeholder="tax"
        value={formData.tax}
        onChange={handleChange}
      />
<input
        name="taxRate"
        placeholder="taxRate"
        value={formData.taxRate}
        onChange={handleChange}
      />
      
      <select
        name="entryID"
        value={formData.entryID}
        onChange={handleChange}
      >
        <option value="">Select entryID</option>
        {entryIDs.map((item) => (
          <option key={item.entryID} value={item.entryID}>
            {item.name || item.id}
          </option>
        ))}
      </select>
      <button type="submit">Save</button>
    </form>
  );
};

export default TaxForm;