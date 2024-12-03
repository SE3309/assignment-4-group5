import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const DriverPhoneForm = () => {
  const [formData, setFormData] = useState({
    driverID: "",
    phoneNumber: "",
    phoneType: "",
  });
  const [drivers, setDrivers] = useState([]);
  const [selectedDriverPhone, setSelectedDriverPhone] = useState("");

  // Fetch all drivers to populate the dropdown
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/driverphone");
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

  // Handle driver phone selection
  const handleDriverPhoneSelect = (e) => {
    const driverPhoneID = e.target.value;
    setSelectedDriverPhone(driverPhoneID);
    if (driverPhoneID) {
      const selected = drivers.find(
        (driver) => driver.driverID === parseInt(driverPhoneID)
      );
      if (selected) {
        setFormData({
          driverID: selected.driverID || "",
          phoneNumber: selected.phoneNumber || "",
          phoneType: selected.phoneType || "",
        });
      } else {
        console.error("Driver phone not found in list.");
      }
    } else {
      setFormData({
        driverID: "",
        phoneNumber: "",
        phoneType: "",
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = selectedDriverPhone
      ? `http://localhost:5001/api/driverphone/${selectedDriverPhone}`
      : "http://localhost:5001/api/driverphone";
    const method = selectedDriverPhone ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        alert("Driver phone saved successfully!");
        const fetchDrivers = async () => {
          const response = await fetch("http://localhost:5001/api/driverphone");
          const data = await response.json();
          setDrivers(data);
        };
        fetchDrivers();
      } else {
        alert("Error saving driver phone. Check the console for details.");
        console.error("Error Response:", responseData);
      }
    } catch (error) {
      console.error("Error saving driver phone:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow border-0">
        <div className="card-header bg-dark text-light text-center">
          <h3 className="card-title">Driver Phone Management Form</h3>
        </div>
        <div className="card-body bg-light">
          <form onSubmit={handleSubmit}>
            {/* Select Driver */}
            <div className="mb-3">
              <label htmlFor="driverSelect" className="form-label text-primary">
                Select Driver Phone
              </label>
              <select
                id="driverSelect"
                className="form-select border-primary"
                value={selectedDriverPhone}
                onChange={handleDriverPhoneSelect}
              >
                <option value="">-- Choose a Driver Phone --</option>
                {drivers.map((driver) => (
                  <option key={driver.driverID} value={driver.driverID}>
                    {driver.driverName || `Driver ${driver.driverID}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Form Inputs */}
            {[
              { name: "phoneNumber", label: "Phone Number", placeholder: "Enter Phone Number" },
              { name: "phoneType", label: "Phone Type", placeholder: "Enter Phone Type" },
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
                {selectedDriverPhone ? "Update Driver Phone" : "Save Driver Phone"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DriverPhoneForm;
