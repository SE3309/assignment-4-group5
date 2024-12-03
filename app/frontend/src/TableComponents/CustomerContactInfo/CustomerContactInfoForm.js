import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomerContactInfoForm = () => {
  const [formData, setFormData] = useState({
    customerID: "",
    contactPerson: "",
    contactNumber: "",
  });

  const [customers, setCustomers] = useState([]);
  const [selectedCustomerContact, setSelectedCustomerContact] = useState("");

  // Fetch all customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/customercontactinfo");
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle customer selection from dropdown
  const handleCustomerSelect = (e) => {
    const customerID = e.target.value;
    setSelectedCustomerContact(customerID);
    if (customerID) {
      const selected = customers.find(
        (customer) => customer.customerID === parseInt(customerID)
      );
      if (selected) {
        setFormData({
          customerID: selected.customerID || "",
          contactPerson: selected.contactPerson || "",
          contactNumber: selected.contactNumber || "",
        });
      } else {
        console.error("Customer contact info not found.");
      }
    } else {
      setFormData({
        customerID: "",
        contactPerson: "",
        contactNumber: "",
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = selectedCustomerContact
      ? `http://localhost:5001/api/customercontactinfo/${selectedCustomerContact}`
      : "http://localhost:5001/api/customercontactinfo";
    const method = selectedCustomerContact ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Customer contact info saved successfully!");
        setFormData({
          customerID: "",
          contactPerson: "",
          contactNumber: "",
        });
        setSelectedCustomerContact("");
      } else {
        alert("Error saving customer contact info. Check the console for details.");
        console.error("Error Response:", await response.json());
      }
    } catch (error) {
      console.error("Error saving customer contact info:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow border-0">
        <div className="card-header bg-dark text-light text-center">
          <h3 className="card-title">Customer Contact Info Form</h3>
        </div>
        <div className="card-body bg-light">
          <form onSubmit={handleSubmit}>
            {/* Customer Dropdown */}
            <div className="mb-3">
              <label htmlFor="customerSelect" className="form-label text-primary">
                Select Customer
              </label>
              <select
                id="customerSelect"
                className="form-select border-primary"
                name="customerID"
                value={formData.customerID}
                onChange={handleCustomerSelect}
              >
                <option value="">-- Choose a Customer --</option>
                {customers.map((customer) => (
                  <option key={customer.customerID} value={customer.customerID}>
                    {customer.name || `Customer ${customer.customerID}`}
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
                {selectedCustomerContact ? "Update Contact Info" : "Save Contact Info"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerContactInfoForm;
