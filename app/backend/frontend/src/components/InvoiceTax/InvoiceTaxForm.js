import React, { useState, useEffect } from "react";

const InvoiceTaxForm = () => {
  const [formData, setFormData] = useState({
    invoiceID: "",
    totalAmount: "",
    taxedAmount: "",
    currency: "",
    paymentTerms: ""
  });

  
  const [invoiceIDs, setInvoiceIDs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5001/api/invoiceids")
      .then((res) => res.json())
      .then(setInvoiceIDs)
      .catch(console.error);
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/invoicetax", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("InvoiceTax saved successfully!");
      } else {
        console.error("Error saving InvoiceTax");
      }
    } catch (error) {
      console.error("Error saving InvoiceTax", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="invoiceID"
        placeholder="invoiceID"
        value={formData.invoiceID}
        onChange={handleChange}
      />
<input
        name="totalAmount"
        placeholder="totalAmount"
        value={formData.totalAmount}
        onChange={handleChange}
      />
<input
        name="taxedAmount"
        placeholder="taxedAmount"
        value={formData.taxedAmount}
        onChange={handleChange}
      />
<input
        name="currency"
        placeholder="currency"
        value={formData.currency}
        onChange={handleChange}
      />
<input
        name="paymentTerms"
        placeholder="paymentTerms"
        value={formData.paymentTerms}
        onChange={handleChange}
      />
      
      <select
        name="invoiceID"
        value={formData.invoiceID}
        onChange={handleChange}
      >
        <option value="">Select invoiceID</option>
        {invoiceIDs.map((item) => (
          <option key={item.invoiceID} value={item.invoiceID}>
            {item.name || item.id}
          </option>
        ))}
      </select>
      <button type="submit">Save</button>
    </form>
  );
};

export default InvoiceTaxForm;