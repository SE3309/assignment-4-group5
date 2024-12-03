import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const DriverForm = () => {
  const [formData, setFormData] = useState({
    licenseNumber: "",
    driverName: "",
    homeAddress: "",
    yearsOfExperience: "",
    numberOfDeliveries: "",
    email: "",
    age: "",
    salary: "",
    employmentDate: "",
    workingStatus: "",
    truckOwnedorAssigned: "",
  });
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState("");

  // Fetch all drivers to populate the dropdown
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/driver");
        const data = await response.json();
        setDrivers(data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };
    fetchDrivers();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle driver selection from the dropdown
  const handleDriverSelect = (e) => {
    const driverID = e.target.value;
    setSelectedDriver(driverID);
    if (driverID) {
      const selected = drivers.find((driver) => driver.driverID === parseInt(driverID));
      if (selected) {
        setFormData({
          licenseNumber: selected.licenseNumber || "",
          driverName: selected.driverName || "",
          homeAddress: selected.homeAddress || "",
          yearsOfExperience: selected.yearsOfExperience || "",
          numberOfDeliveries: selected.numberOfDeliveries || "",
          email: selected.email || "",
          age: selected.age || "",
          salary: selected.salary || "",
          employmentDate: selected.employmentDate
          ? new Date(selected.employmentDate).toISOString().split("T")[0]
          : "",
          workingStatus: selected.workingStatus || "",
          truckOwnedorAssigned: selected.truckOwnedorAssigned || "",
        });
      } else {
        console.error("Driver not found in list.");
      }
    } else {
      setFormData({
        licenseNumber: "",
        driverName: "",
        homeAddress: "",
        yearsOfExperience: "",
        numberOfDeliveries: "",
        email: "",
        age: "",
        salary: "",
        employmentDate: "",
        workingStatus: "",
        truckOwnedorAssigned: "",
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Format the employmentDate to 'YYYY-MM-DD'
    const formattedDate = formData.employmentDate
      ? new Date(formData.employmentDate).toISOString().split("T")[0]
      : "";
  
    // Prepare the payload with the formatted date
    const payload = { ...formData, employmentDate: formattedDate };
  
    const url = selectedDriver
      ? `http://localhost:5001/api/driver/${selectedDriver}`
      : "http://localhost:5001/api/driver";
    const method = selectedDriver ? "PUT" : "POST";
  
    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        alert("Driver saved successfully!");
        const fetchDrivers = async () => {
          const response = await fetch("http://localhost:5001/api/driver");
          const data = await response.json();
          setDrivers(data);
        };
        fetchDrivers();
      } else {
        alert("Error saving driver. Check the console for details.");
        console.error("Error Response:", responseData);
      }
    } catch (error) {
      console.error("Error saving driver:", error);
    }
  };
  
  return (
    <div className="container mt-5">
      <div className="card shadow border-0">
        <div className="card-header bg-dark text-light text-center">
          <h3 className="card-title">Driver Management Form</h3>
        </div>
        <div className="card-body bg-light">
          <form onSubmit={handleSubmit}>
            {/* Select Driver */}
            <div className="mb-3">
              <label htmlFor="driverSelect" className="form-label text-primary">
                Select Driver
              </label>
              <select
                id="driverSelect"
                className="form-select border-primary"
                value={selectedDriver}
                onChange={handleDriverSelect}
              >
                <option value="">-- Choose a Driver --</option>
                {drivers.map((driver) => (
                  <option key={driver.driverID} value={driver.driverID}>
                    {driver.driverName}
                  </option>
                ))}
              </select>
            </div>

            {/* Form Inputs */}
            {[
              { name: "licenseNumber", label: "License Number", placeholder: "Enter License Number" },
              { name: "driverName", label: "Driver Name", placeholder: "Enter Driver Name" },
              { name: "homeAddress", label: "Home Address", placeholder: "Enter Home Address" },
              { name: "yearsOfExperience", label: "Years of Experience", placeholder: "Enter Years of Experience" },
              { name: "numberOfDeliveries", label: "Number of Deliveries", placeholder: "Enter Number of Deliveries" },
              { name: "email", label: "Email", placeholder: "Enter Email Address" },
              { name: "age", label: "Age", placeholder: "Enter Age" },
              { name: "salary", label: "Salary", placeholder: "Enter Salary" },
              { name: "employmentDate", label: "Employment Date", placeholder: "" },
            ].map((field, index) => (
              <div className="mb-3" key={index}>
                <label htmlFor={field.name} className="form-label text-primary">
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.name === "email" ? "email" : field.name === "employmentDate" ? "date" : "text"}
                  className="form-control border-primary"
                  placeholder={field.placeholder}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  required={field.name !== "employmentDate"}
                />
              </div>
            ))}

            {/* Working Status */}
            <div className="mb-3">
              <label htmlFor="workingStatus" className="form-label text-primary">
                Working Status
              </label>
              <select
                id="workingStatus"
                name="workingStatus"
                className="form-select border-primary"
                value={formData.workingStatus || ""}
                onChange={handleChange}
              >
                <option value="">Select Working Status</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
                <option value="ON LEAVE">ON LEAVE</option>
              </select>
            </div>

            {/* Truck Ownership */}
            <div className="mb-3">
              <label htmlFor="truckOwnedorAssigned" className="form-label text-primary">
                Truck Ownership
              </label>
              <select
                id="truckOwnedorAssigned"
                name="truckOwnedorAssigned"
                className="form-select border-primary"
                value={formData.truckOwnedorAssigned || ""}
                onChange={handleChange}
              >
                <option value="">Select Truck Ownership</option>
                <option value="OWNED">OWNED</option>
                <option value="ASSIGNED">ASSIGNED</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-lg">
                {selectedDriver ? "Update Driver" : "Save Driver"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DriverForm;
