import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SupplierContractForm = () => {
  const [formData, setFormData] = useState({
    supplierID: "",
    contractStart: "",
    contractEnd: "",
    productType: "",
  });

  const [supplierIDs, setSupplierIDs] = useState([]);
  const [selectedContract, setSelectedContract] = useState("");

  // Fetch all supplier IDs
  useEffect(() => {
    const fetchSupplierIDs = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/suppliercontract");
        const data = await response.json();
        setSupplierIDs(data);
      } catch (error) {
        console.error("Error fetching supplier IDs:", error);
      }
    };
    fetchSupplierIDs();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle supplier selection
  const handleSupplierSelect = (e) => {
    const supplierID = e.target.value;
    setSelectedContract(supplierID);
    if (supplierID) {
      const selected = supplierIDs.find(
        (supplier) => supplier.supplierID === parseInt(supplierID)
      );
      if (selected) {
        setFormData({
          supplierID: selected.supplierID || "",
          contractStart: selected.contractStart
            ? new Date(selected.contractStart).toISOString().split("T")[0]
            : "",
          contractEnd: selected.contractEnd
            ? new Date(selected.contractEnd).toISOString().split("T")[0]
            : "",
          productType: selected.productType || "",
        });
        
      } else {
        console.error("Supplier contract info not found.");
      }
    } else {
      setFormData({
        supplierID: "",
        contractStart: "",
        contractEnd: "",
        productType: "",
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = selectedContract
      ? `http://localhost:5001/api/suppliercontract/${selectedContract}`
      : "http://localhost:5001/api/suppliercontract";
    const method = selectedContract ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Supplier contract saved successfully!");
        setFormData({
          supplierID: "",
          contractStart: "",
          contractEnd: "",
          productType: "",
        });
        setSelectedContract("");
      } else {
        alert("Error saving supplier contract. Check the console for details.");
        console.error("Error Response:", await response.json());
      }
    } catch (error) {
      console.error("Error saving supplier contract:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow border-0">
        <div className="card-header bg-dark text-light text-center">
          <h3 className="card-title">Supplier Contract Form</h3>
        </div>
        <div className="card-body bg-light">
          <form onSubmit={handleSubmit}>
            {/* Supplier Dropdown */}
            <div className="mb-3">
              <label htmlFor="supplierSelect" className="form-label text-primary">
                Select Supplier
              </label>
              <select
                id="supplierSelect"
                className="form-select border-primary"
                name="supplierID"
                value={formData.supplierID}
                onChange={handleSupplierSelect}
              >
                <option value="">-- Choose a Supplier --</option>
                {supplierIDs.map((item) => (
                  <option key={item.supplierID} value={item.supplierID}>
                    {item.name || `Supplier ${item.supplierID}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Form Inputs */}
            {[
              { name: "contractStart", label: "Contract Start Date", placeholder: "", type: "date" },
              { name: "contractEnd", label: "Contract End Date", placeholder: "", type: "date" },
              { name: "productType", label: "Product Type", placeholder: "Enter Product Type" },
            ].map((field, index) => (
              <div className="mb-3" key={index}>
                <label htmlFor={field.name} className="form-label text-primary">
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type || "text"}
                  className="form-control border-primary"
                  placeholder={field.placeholder}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            {/* Submit Button */}
            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-lg">
                {selectedContract ? "Update Supplier Contract" : "Save Supplier Contract"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupplierContractForm;
