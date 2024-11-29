import React, { useState, useEffect } from "react";

const FinanceForm = () => {
  const [formData, setFormData] = useState({
    truckID: "",
    expense: "",
    totalAmount: "",
    paymentMethod: "",
    paymentDate: ""
  });

  
  const [truckIDs, setTruckIDs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5001/api/truckids")
      .then((res) => res.json())
      .then(setTruckIDs)
      .catch(console.error);
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/finance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Finance saved successfully!");
      } else {
        console.error("Error saving Finance");
      }
    } catch (error) {
      console.error("Error saving Finance", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="truckID"
        placeholder="truckID"
        value={formData.truckID}
        onChange={handleChange}
      />
<input
        name="expense"
        placeholder="expense"
        value={formData.expense}
        onChange={handleChange}
      />
<input
        name="totalAmount"
        placeholder="totalAmount"
        value={formData.totalAmount}
        onChange={handleChange}
      />
<input
        name="paymentMethod"
        placeholder="paymentMethod"
        value={formData.paymentMethod}
        onChange={handleChange}
      />
<input
        name="paymentDate"
        placeholder="paymentDate"
        value={formData.paymentDate}
        onChange={handleChange}
      />
      
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
      <button type="submit">Save</button>
    </form>
  );
};

export default FinanceForm;