import React, { useState, useEffect } from "react";

const SupplierContractForm = () => {
  const [formData, setFormData] = useState({
    supplierID: "",
    contractStart: "",
    contractEnd: "",
    productType: ""
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
      const response = await fetch("http://localhost:5001/api/suppliercontract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("SupplierContract saved successfully!");
      } else {
        console.error("Error saving SupplierContract");
      }
    } catch (error) {
      console.error("Error saving SupplierContract", error);
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
        name="contractStart"
        placeholder="contractStart"
        value={formData.contractStart}
        onChange={handleChange}
      />
<input
        name="contractEnd"
        placeholder="contractEnd"
        value={formData.contractEnd}
        onChange={handleChange}
      />
<input
        name="productType"
        placeholder="productType"
        value={formData.productType}
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

export default SupplierContractForm;