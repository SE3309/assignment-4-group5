import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SupplierContactInfoForm = () => {
  const [formData, setFormData] = useState({
    supplierID: "",
    contactPerson: "",
    contactNumber: "",
  });

  const [supplierIDs, setSupplierIDs] = useState([]);
  const [selectedSupplierContact, setSelectedSupplierContact] = useState("");

  // Fetch all supplier IDs
  useEffect(() => {
    const fetchSupplierIDs = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/suppliercontactinfo");
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
    setSelectedSupplierContact(supplierID);
    if (supplierID) {
      const selected = supplierIDs.find(
        (supplier) => supplier.supplierID === parseInt(supplierID)
      );
      if (selected) {
        setFormData({
          supplierID: selected.supplierID || "",
          contactPerson: selected.contactPerson || "",
          contactNumber: selected.contactNumber || "",
        });
      } else {
        console.error("Supplier contact info not found.");
      }
    } else {
      setFormData({
        supplierID: "",
        contactPerson: "",
        contactNumber: "",
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = selectedSupplierContact
      ? `http://localhost:5001/api/suppliercontactinfo/${selectedSupplierContact}`
      : "http://localhost:5001/api/suppliercontactinfo";
    const method = selectedSupplierContact ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Supplier contact info saved successfully!");
        setFormData({
          supplierID: "",
          contactPerson: "",
          contactNumber: "",
        });
        setSelectedSupplierContact("");
      } else {
        alert("Error saving supplier contact info. Check the console for details.");
        console.error("Error Response:", await response.json());
      }
    } catch (error) {
      console.error("Error saving supplier contact info:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow border-0">
        <div className="card-header bg-dark text-light text-center">
          <h3 className="card-title">Supplier Contact Info Form</h3>
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
              { name: "contactPerson", label: "Contact Person", placeholder: "Enter Contact Person" },
              { name: "contactNumber", label: "Contact Number", placeholder: "Enter Contact Number" },
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
                  required
                />
              </div>
            ))}

            {/* Submit Button */}
            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-lg">
                {selectedSupplierContact ? "Update Supplier Contact" : "Save Supplier Contact"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupplierContactInfoForm;
