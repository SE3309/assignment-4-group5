import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    customerLongitude: "",
    customerLatitude: "",
    customerName: "",
    typeOfStore: "",
    deliveryInstructions: "",
  });

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");

  // Fetch all customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/customer");
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
    setSelectedCustomer(customerID);
    if (customerID) {
      const selected = customers.find(
        (customer) => customer.customerID === parseInt(customerID)
      );
      if (selected) {
        setFormData({
          customerLongitude: selected.customerLongitude || "",
          customerLatitude: selected.customerLatitude || "",
          customerName: selected.customerName || "",
          typeOfStore: selected.typeOfStore || "",
          deliveryInstructions: selected.deliveryInstructions || "",
        });
      } else {
        console.error("Customer not found.");
      }
    } else {
      setFormData({
        customerLongitude: "",
        customerLatitude: "",
        customerName: "",
        typeOfStore: "",
        deliveryInstructions: "",
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = selectedCustomer
      ? `http://localhost:5001/api/customer/${selectedCustomer}`
      : "http://localhost:5001/api/customer";
    const method = selectedCustomer ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Customer saved successfully!");
        setFormData({
          customerLongitude: "",
          customerLatitude: "",
          customerName: "",
          typeOfStore: "",
          deliveryInstructions: "",
        });
        setSelectedCustomer("");
      } else {
        alert("Error saving customer. Check the console for details.");
        console.error("Error Response:", await response.json());
      }
    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow border-0">
        <div className="card-header bg-dark text-light text-center">
          <h3 className="card-title">Customer Form</h3>
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
                value={selectedCustomer}
                onChange={handleCustomerSelect}
              >
                <option value="">-- Choose a Customer --</option>
                {customers.map((customer) => (
                  <option key={customer.customerID} value={customer.customerID}>
                    {customer.customerName || `Customer ${customer.customerID}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Form Inputs */}
            {[
              { name: "customerLongitude", label: "Customer Longitude", placeholder: "Enter Longitude" },
              { name: "customerLatitude", label: "Customer Latitude", placeholder: "Enter Latitude" },
              { name: "customerName", label: "Customer Name", placeholder: "Enter Customer Name" },
              { name: "typeOfStore", label: "Type of Store", placeholder: "Enter Type of Store" },
              { name: "deliveryInstructions", label: "Delivery Instructions", placeholder: "Enter Delivery Instructions" },
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
                {selectedCustomer ? "Update Customer" : "Save Customer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
