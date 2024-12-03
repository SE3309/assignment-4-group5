import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TruckDamageReportForm = () => {
  const [formData, setFormData] = useState({
    truckID: "",
    damageData: "",
    damageDescription: "",
  });

  const [truckIDs, setTruckIDs] = useState([]);

  // Fetch truck IDs
  useEffect(() => {
    const fetchTruckIDs = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/truck");
        const data = await response.json();
        setTruckIDs(data);
      } catch (error) {
        console.error("Error fetching truck IDs:", error);
      }
    };
    fetchTruckIDs();
  }, []);

  // Handle truck selection
  const handleTruckSelect = async (e) => {
    const truckID = e.target.value;
    setFormData((prevFormData) => ({ ...prevFormData, truckID }));
  
    if (truckID) {
      try {
        const response = await fetch(`http://localhost:5001/api/truck/${truckID}`);
        if (response.ok) {
          const truckData = await response.json();
          console.log("Fetched Truck Details:", truckData); // Debugging log
  
          // Map fields to damageData and damageDescription
          setFormData((prevFormData) => ({
            ...prevFormData,
            truckID: truckData.truckID || "",
            damageData: truckData.registration || "No registration data available", // Example mapping
            damageDescription: truckData.insurancePolicyNo
              ? `Insurance Policy: ${truckData.insurancePolicyNo}`
              : "No insurance policy data available", // Example mapping
          }));
        } else {
          console.error("Error fetching truck details.");
        }
      } catch (error) {
        console.error("Error fetching truck details:", error);
      }
    } else {
      // Reset form when no truck is selected
      setFormData({
        truckID: "",
        damageData: "",
        damageDescription: "",
      });
    }
  };
  

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/truckdamagereport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Truck Damage Report saved successfully!");
        setFormData({
          truckID: "",
          damageData: "",
          damageDescription: "",
        });
      } else {
        alert("Error saving truck damage report. Check the console for details.");
        console.error("Error Response:", await response.json());
      }
    } catch (error) {
      console.error("Error saving truck damage report:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow border-0">
        <div className="card-header bg-dark text-light text-center">
          <h3 className="card-title">Truck Damage Report Form</h3>
        </div>
        <div className="card-body bg-light">
          <form onSubmit={handleSubmit}>
            {/* Truck Dropdown */}
            <div className="mb-3">
              <label htmlFor="truckSelect" className="form-label text-primary">
                Select Truck
              </label>
              <select
                id="truckSelect"
                className="form-select border-primary"
                name="truckID"
                value={formData.truckID}
                onChange={handleTruckSelect}
                required
              >
                <option value="">-- Choose a Truck --</option>
                {truckIDs.map((item) => (
                  <option key={item.truckID} value={item.truckID}>
                    {item.name || `Truck ${item.truckID}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Form Inputs */}
            {[
              { name: "damageData", label: "Damage Data", placeholder: "Enter Damage Data" },
              {
                name: "damageDescription",
                label: "Damage Description",
                placeholder: "Enter Damage Description",
              },
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
                Save Truck Damage Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TruckDamageReportForm;
