import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TrailerForm = () => {
  const [formData, setFormData] = useState({
    supplierID: "",
    truckID: "",
    trailerCapacity: "",
    maxLoadWeight: "",
    trailerLength: "",
    trailerType: "",
    licensePlateNumber: "",
    VIN: "",
    makeModelYear: "",
    registration: "",
  });

  const [supplierIDs, setSupplierIDs] = useState([]);
  const [truckIDs, setTruckIDs] = useState([]);
  const [isTruckLocked, setIsTruckLocked] = useState(false);
  const [isSupplierLocked, setIsSupplierLocked] = useState(false);

  // Fetch supplier IDs
  useEffect(() => {
    const fetchSupplierIDs = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/supplier");
        const data = await response.json();
        setSupplierIDs(data);
      } catch (error) {
        console.error("Error fetching supplier IDs:", error);
      }
    };
    fetchSupplierIDs();
  }, []);

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

  // Handle Supplier Selection
  const handleSupplierSelect = async (e) => {
    const supplierID = e.target.value;
    setFormData((prevFormData) => ({ ...prevFormData, supplierID }));

    if (supplierID) {
      try {
        const response = await fetch(`http://localhost:5001/api/supplier/${supplierID}/truck`);
        if (response.ok) {
          const data = await response.json();
          console.log("Supplier Selection Response:", data);
          setFormData((prevFormData) => ({
            ...prevFormData,
            supplierID,
            truckID: data.truckID || "",
            trailerCapacity: data.trailerCapacity || "",
            maxLoadWeight: data.maxLoadWeight || "",
            trailerLength: data.trailerLength || "",
            trailerType: data.trailerType || "",
            licensePlateNumber: data.licensePlateNumber || "",
            VIN: data.VIN || "",
            makeModelYear: data.makeModelYear || "",
            registration: data.registration || "",
          }));
          setIsTruckLocked(true); // Lock truck dropdown
        } else {
          console.error("Failed to fetch truck data for supplier:", supplierID);
        }
      } catch (error) {
        console.error("Error fetching related truck:", error);
      }
    } else {
      setIsTruckLocked(false);
    }
  };

  // Handle Truck Selection
  const handleTruckSelect = async (e) => {
    const truckID = e.target.value;
    setFormData((prevFormData) => ({ ...prevFormData, truckID }));

    if (truckID) {
      try {
        const response = await fetch(`http://localhost:5001/api/truck/${truckID}/supplier`);
        if (response.ok) {
          const data = await response.json();
          console.log("Truck Selection Response:", data);
          setFormData((prevFormData) => ({
            ...prevFormData,
            supplierID: data.supplierID || "",
            truckID,
            trailerCapacity: data.trailerCapacity || "",
            maxLoadWeight: data.maxLoadWeight || "",
            trailerLength: data.trailerLength || "",
            trailerType: data.trailerType || "",
            licensePlateNumber: data.licensePlateNumber || "",
            VIN: data.VIN || "",
            makeModelYear: data.makeModelYear || "",
            registration: data.registration || "",
          }));
          setIsSupplierLocked(true); // Lock supplier dropdown
        } else {
          console.error("Failed to fetch supplier data for truck:", truckID);
        }
      } catch (error) {
        console.error("Error fetching related supplier:", error);
      }
    } else {
      setIsSupplierLocked(false);
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
      const response = await fetch("http://localhost:5001/api/trailer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Trailer saved successfully!");
        setFormData({
          supplierID: "",
          truckID: "",
          trailerCapacity: "",
          maxLoadWeight: "",
          trailerLength: "",
          trailerType: "",
          licensePlateNumber: "",
          VIN: "",
          makeModelYear: "",
          registration: "",
        });
        setIsTruckLocked(false);
        setIsSupplierLocked(false);
      } else {
        alert("Error saving trailer. Check the console for details.");
        console.error("Error Response:", await response.json());
      }
    } catch (error) {
      console.error("Error saving trailer:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow border-0">
        <div className="card-header bg-dark text-light text-center">
          <h3 className="card-title">Trailer Form</h3>
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
                disabled={isSupplierLocked}
                required
              >
                <option value="">-- Choose a Supplier --</option>
                {supplierIDs.map((item) => (
                  <option key={item.supplierID} value={item.supplierID}>
                    {item.name || `Supplier ${item.supplierID}`}
                  </option>
                ))}
              </select>
            </div>

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
                disabled={isTruckLocked}
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
              { name: "trailerCapacity", label: "Trailer Capacity", placeholder: "Enter Trailer Capacity" },
              { name: "maxLoadWeight", label: "Max Load Weight", placeholder: "Enter Max Load Weight" },
              { name: "trailerLength", label: "Trailer Length", placeholder: "Enter Trailer Length" },
              { name: "trailerType", label: "Trailer Type", placeholder: "Enter Trailer Type" },
              { name: "licensePlateNumber", label: "License Plate Number", placeholder: "Enter License Plate Number" },
              { name: "VIN", label: "VIN", placeholder: "Enter VIN" },
              { name: "makeModelYear", label: "Make/Model/Year", placeholder: "Enter Make/Model/Year" },
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
                Save Trailer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TrailerForm;
