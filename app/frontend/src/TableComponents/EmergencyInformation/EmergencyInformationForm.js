import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EmergencyInformationForm = () => {
  const [formData, setFormData] = useState({
    driverID: "",
    contactName: "",
    contactNumber: "",
  });

  const [driverIDs, setDriverIDs] = useState([]);
  const [selectedEmergencyInfo, setSelectedEmergencyInfo] = useState("");

  // Fetch all driver IDs
  useEffect(() => {
    const fetchDriverIDs = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/emergencyinformation");
        const data = await response.json();
        setDriverIDs(data);
      } catch (error) {
        console.error("Error fetching driver IDs:", error);
      }
    };
    fetchDriverIDs();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = selectedEmergencyInfo
      ? `http://localhost:5001/api/emergencyinformation/${selectedEmergencyInfo}`
      : "http://localhost:5001/api/emergencyinformation";
    const method = selectedEmergencyInfo ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        alert("Emergency information saved successfully!");
        setFormData({
          driverID: "",
          contactName: "",
          contactNumber: "",
        });
        setSelectedEmergencyInfo("");
      } else {
        alert("Error saving emergency information. Check the console for details.");
        console.error("Error Response:", responseData);
      }
    } catch (error) {
      console.error("Error saving emergency information:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow border-0">
        <div className="card-header bg-dark text-light text-center">
          <h3 className="card-title">Emergency Information Form</h3>
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
                name="driverID"
                value={formData.driverID}
                onChange={handleChange}
              >
                <option value="">-- Choose a Driver --</option>
                {driverIDs.map((item) => (
                  <option key={item.driverID} value={item.driverID}>
                    {item.name || `Driver ${item.driverID}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Form Inputs */}
            {[
              { name: "contactName", label: "Contact Name", placeholder: "Enter Contact Name" },
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
                {selectedEmergencyInfo ? "Update Emergency Info" : "Save Emergency Info"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmergencyInformationForm;
