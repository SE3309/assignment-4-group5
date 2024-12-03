import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TrailerDamageReportForm = () => {
  const [formData, setFormData] = useState({
    trailerID: "",
    damageData: "",
    damageDescription: "",
  });

  const [trailerIDs, setTrailerIDs] = useState([]);

  // Fetch trailer IDs on component mount
  useEffect(() => {
    const fetchTrailerIDs = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/trailer");
        const data = await response.json();
        setTrailerIDs(data);
      } catch (error) {
        console.error("Error fetching trailer IDs:", error);
      }
    };
    fetchTrailerIDs();
  }, []);

  // Fetch trailer details by ID
  const fetchTrailerDetails = async (trailerID) => {
    try {
      const response = await fetch(`http://localhost:5001/api/trailer/${trailerID}`);
      if (response.ok) {
        const data = await response.json();
        setFormData((prevFormData) => ({
          ...prevFormData,
          trailerID,
          damageData: data.damageData || "",
          damageDescription: data.damageDescription || "",
        }));
      } else {
        console.error("Failed to fetch trailer details.");
      }
    } catch (error) {
      console.error("Error fetching trailer details:", error);
    }
  };

  // Handle dropdown selection change
  const handleTrailerSelect = (e) => {
    const selectedTrailerID = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      trailerID: selectedTrailerID,
    }));

    if (selectedTrailerID) {
      fetchTrailerDetails(selectedTrailerID); // Fetch details for selected trailer
    } else {
      setFormData({
        trailerID: "",
        damageData: "",
        damageDescription: "",
      });
    }
  };

  // Handle other form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/trailerdamagereport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Trailer Damage Report saved successfully!");
        setFormData({
          trailerID: "",
          damageData: "",
          damageDescription: "",
        });
      } else {
        alert("Error saving trailer damage report. Check console for details.");
        console.error("Error Response:", await response.json());
      }
    } catch (error) {
      console.error("Error saving trailer damage report:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow border-0">
        <div className="card-header bg-dark text-light text-center">
          <h3 className="card-title">Trailer Damage Report Form</h3>
        </div>
        <div className="card-body bg-light">
          <form onSubmit={handleSubmit}>
            {/* Trailer Dropdown */}
            <div className="mb-3">
              <label htmlFor="trailerSelect" className="form-label text-primary">
                Select Trailer
              </label>
              <select
                id="trailerSelect"
                className="form-select border-primary"
                name="trailerID"
                value={formData.trailerID}
                onChange={handleTrailerSelect}
                required
              >
                <option value="">-- Choose a Trailer --</option>
                {trailerIDs.map((item) => (
                  <option key={item.trailerID} value={item.trailerID}>
                    {item.name || `Trailer ${item.trailerID}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Damage Data */}
            <div className="mb-3">
              <label htmlFor="damageData" className="form-label text-primary">
                Damage Data
              </label>
              <input
                id="damageData"
                name="damageData"
                type="text"
                className="form-control border-primary"
                placeholder="Enter Damage Data"
                value={formData.damageData || ""}
                onChange={handleChange}
                required
              />
            </div>

            {/* Damage Description */}
            <div className="mb-3">
              <label htmlFor="damageDescription" className="form-label text-primary">
                Damage Description
              </label>
              <textarea
                id="damageDescription"
                name="damageDescription"
                className="form-control border-primary"
                placeholder="Enter Damage Description"
                value={formData.damageDescription || ""}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-lg">
                Save Damage Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TrailerDamageReportForm;
