import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TruckForm = () => {
  const [formData, setFormData] = useState({
    driverID: "",
    mileage: "",
    licencePlateNumber: "",
    VIN: "",
    makeModelYear: "",
    maxTowWeight: "",
    insurancePolicyNo: "",
    registration: "",
  });

  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState("");

  // Fetch drivers
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

  // Fetch truck details when a driver is selected
  const handleDriverSelect = async (e) => {
    const driverID = e.target.value;
    setSelectedDriver(driverID);

    if (driverID) {
      try {
        const response = await fetch(`http://localhost:5001/api/truck/${driverID}`);
        if (response.ok) {
          const truckData = await response.json();
          setFormData({
            driverID: truckData.driverID || driverID,
            mileage: truckData.mileage || "",
            licencePlateNumber: truckData.licencePlateNumber || "",
            VIN: truckData.VIN || "",
            makeModelYear: truckData.makeModelYear || "",
            maxTowWeight: truckData.maxTowWeight || "",
            insurancePolicyNo: truckData.insurancePolicyNo || "",
            registration: truckData.registration || "",
          });
        } else {
          console.error("Error fetching truck details");
          setFormData({
            driverID: driverID,
            mileage: "",
            licencePlateNumber: "",
            VIN: "",
            makeModelYear: "",
            maxTowWeight: "",
            insurancePolicyNo: "",
            registration: "",
          });
        }
      } catch (error) {
        console.error("Error fetching truck details:", error);
      }
    } else {
      // Reset form data if no driver is selected
      setFormData({
        driverID: "",
        mileage: "",
        licencePlateNumber: "",
        VIN: "",
        makeModelYear: "",
        maxTowWeight: "",
        insurancePolicyNo: "",
        registration: "",
      });
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = selectedDriver
      ? `http://localhost:5001/api/truck/${selectedDriver}`
      : "http://localhost:5001/api/truck";
    const method = selectedDriver ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Truck saved successfully!");
        setFormData({
          driverID: "",
          mileage: "",
          licencePlateNumber: "",
          VIN: "",
          makeModelYear: "",
          maxTowWeight: "",
          insurancePolicyNo: "",
          registration: "",
        });
        setSelectedDriver("");
      } else {
        alert("Error saving truck. Check the console for details.");
        console.error("Error Response:", await response.json());
      }
    } catch (error) {
      console.error("Error saving truck:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow border-0">
        <div className="card-header bg-dark text-light text-center">
          <h3 className="card-title">Truck Form</h3>
        </div>
        <div className="card-body bg-light">
          <form onSubmit={handleSubmit}>
            {/* Driver Dropdown */}
            <div className="mb-3">
              <label htmlFor="driverSelect" className="form-label text-primary">
                Select Driver
              </label>
              <select
                id="driverSelect"
                className="form-select border-primary"
                name="driverID"
                value={formData.driverID}
                onChange={handleDriverSelect}
              >
                <option value="">-- Choose a Driver --</option>
                {drivers.map((driver) => (
                  <option key={driver.driverID} value={driver.driverID}>
                    {driver.name || `Driver ${driver.driverID}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Form Inputs */}
            {[
              { name: "mileage", label: "Mileage", placeholder: "Enter Mileage" },
              { name: "licencePlateNumber", label: "License Plate Number", placeholder: "Enter License Plate Number" },
              { name: "VIN", label: "VIN", placeholder: "Enter VIN" },
              { name: "makeModelYear", label: "Make/Model/Year", placeholder: "Enter Make/Model/Year" },
              { name: "maxTowWeight", label: "Max Tow Weight", placeholder: "Enter Max Tow Weight" },
              { name: "insurancePolicyNo", label: "Insurance Policy Number", placeholder: "Enter Insurance Policy Number" },
              { name: "registration", label: "Registration", placeholder: "Enter Registration" },
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
                {selectedDriver ? "Update Truck" : "Save Truck"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TruckForm;
