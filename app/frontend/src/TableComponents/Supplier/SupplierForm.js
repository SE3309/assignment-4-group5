import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SupplierForm = () => {
  const [formData, setFormData] = useState({
    supplierName: "",
    contactPerson: "",
    contactName: "",
    supplierLongitude: "",
    supplierLatitude: "",
    supplierType: "",
    businessHours: "",
  });
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");

  // Fetch all suppliers
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/supplier");
        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };
    fetchSuppliers();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle supplier selection from dropdown
  const handleSupplierSelect = (e) => {
    const supplierID = e.target.value;
    setSelectedSupplier(supplierID);
    if (supplierID) {
      const selected = suppliers.find(
        (supplier) => supplier.supplierID === parseInt(supplierID)
      );
      if (selected) {
        setFormData({
          supplierName: selected.supplierName || "",
          contactPerson: selected.contactPerson || "",
          contactName: selected.contactName || "",
          supplierLongitude: selected.supplierLongitude || "",
          supplierLatitude: selected.supplierLatitude || "",
          supplierType: selected.supplierType || "",
          businessHours: selected.businessHours || "",
        });
      } else {
        console.error("Supplier not found in list.");
      }
    } else {
      setFormData({
        supplierName: "",
        contactPerson: "",
        contactName: "",
        supplierLongitude: "",
        supplierLatitude: "",
        supplierType: "",
        businessHours: "",
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = selectedSupplier
      ? `http://localhost:5001/api/supplier/${selectedSupplier}`
      : "http://localhost:5001/api/supplier";
    const method = selectedSupplier ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Supplier saved successfully!");
        setFormData({
          supplierName: "",
          contactPerson: "",
          contactName: "",
          supplierLongitude: "",
          supplierLatitude: "",
          supplierType: "",
          businessHours: "",
        });
        setSelectedSupplier("");
      } else {
        console.error("Error saving supplier:", await response.json());
        alert("Error saving supplier.");
      }
    } catch (error) {
      console.error("Error saving supplier:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow border-0">
        <div className="card-header bg-dark text-light text-center">
          <h3 className="card-title">Supplier Management Form</h3>
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
                value={selectedSupplier}
                onChange={handleSupplierSelect}
              >
                <option value="">-- Choose a Supplier --</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.supplierID} value={supplier.supplierID}>
                    {supplier.supplierName}
                  </option>
                ))}
              </select>
            </div>

            {/* Form Inputs */}
            {[
              { name: "supplierName", label: "Supplier Name", placeholder: "Enter Supplier Name" },
              { name: "contactPerson", label: "Contact Person", placeholder: "Enter Contact Person" },
              { name: "contactName", label: "Contact Name", placeholder: "Enter Contact Name" },
              { name: "supplierLongitude", label: "Longitude", placeholder: "Enter Longitude" },
              { name: "supplierLatitude", label: "Latitude", placeholder: "Enter Latitude" },
              { name: "supplierType", label: "Supplier Type", placeholder: "Enter Supplier Type" },
              { name: "businessHours", label: "Business Hours", placeholder: "Enter Business Hours" },
            ].map((field, index) => (
              <div className="mb-3" key={index}>
                <label htmlFor={field.name} className="form-label text-primary">
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type="text"
                  className="form-control border-primary"
                  placeholder={field.placeholder}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  required={field.name !== "businessHours"}
                />
              </div>
            ))}

            {/* Submit Button */}
            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-lg">
                {selectedSupplier ? "Update Supplier" : "Save Supplier"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupplierForm;
