import React, { useState, useEffect } from "react";

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
    registration: ""
  });

  
  const [supplierIDs, setSupplierIDs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5001/api/supplierids")
      .then((res) => res.json())
      .then(setSupplierIDs)
      .catch(console.error);
  }, []);
  

  const [truckIDs, setTruckIDs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5001/api/truckids")
      .then((res) => res.json())
      .then(setTruckIDs)
      .catch(console.error);
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
      } else {
        console.error("Error saving Trailer");
      }
    } catch (error) {
      console.error("Error saving Trailer", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="supplierID"
        placeholder="supplierID"
        value={formData.supplierID}
        onChange={handleChange}
      />
<input
        name="truckID"
        placeholder="truckID"
        value={formData.truckID}
        onChange={handleChange}
      />
<input
        name="trailerCapacity"
        placeholder="trailerCapacity"
        value={formData.trailerCapacity}
        onChange={handleChange}
      />
<input
        name="maxLoadWeight"
        placeholder="maxLoadWeight"
        value={formData.maxLoadWeight}
        onChange={handleChange}
      />
<input
        name="trailerLength"
        placeholder="trailerLength"
        value={formData.trailerLength}
        onChange={handleChange}
      />
<input
        name="trailerType"
        placeholder="trailerType"
        value={formData.trailerType}
        onChange={handleChange}
      />
<input
        name="licensePlateNumber"
        placeholder="licensePlateNumber"
        value={formData.licensePlateNumber}
        onChange={handleChange}
      />
<input
        name="VIN"
        placeholder="VIN"
        value={formData.VIN}
        onChange={handleChange}
      />
<input
        name="makeModelYear"
        placeholder="makeModelYear"
        value={formData.makeModelYear}
        onChange={handleChange}
      />
<input
        name="registration"
        placeholder="registration"
        value={formData.registration}
        onChange={handleChange}
      />
      
      <select
        name="supplierID"
        value={formData.supplierID}
        onChange={handleChange}
      >
        <option value="">Select supplierID</option>
        {supplierIDs.map((item) => (
          <option key={item.supplierID} value={item.supplierID}>
            {item.name || item.id}
          </option>
        ))}
      </select>

      <select
        name="truckID"
        value={formData.truckID}
        onChange={handleChange}
      >
        <option value="">Select truckID</option>
        {truckIDs.map((item) => (
          <option key={item.truckID} value={item.truckID}>
            {item.name || item.id}
          </option>
        ))}
      </select>
      <button type="submit">Save</button>
    </form>
  );
};

export default TrailerForm;