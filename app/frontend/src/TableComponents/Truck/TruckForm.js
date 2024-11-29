import React, { useState, useEffect } from "react";

const TruckForm = () => {
  const [formData, setFormData] = useState({
    driverID: "",
    mileage: "",
    licencePlateNumber: "",
    VIN: "",
    makeModelYear: "",
    maxTowWeight: "",
    insurancePolicyNo: "",
    registration: ""
  });

  
  const [driverIDs, setDriverIDs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5001/api/driverids")
      .then((res) => res.json())
      .then(setDriverIDs)
      .catch(console.error);
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/truck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Truck saved successfully!");
      } else {
        console.error("Error saving Truck");
      }
    } catch (error) {
      console.error("Error saving Truck", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="driverID"
        placeholder="driverID"
        value={formData.driverID}
        onChange={handleChange}
      />
<input
        name="mileage"
        placeholder="mileage"
        value={formData.mileage}
        onChange={handleChange}
      />
<input
        name="licencePlateNumber"
        placeholder="licencePlateNumber"
        value={formData.licencePlateNumber}
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
        name="maxTowWeight"
        placeholder="maxTowWeight"
        value={formData.maxTowWeight}
        onChange={handleChange}
      />
<input
        name="insurancePolicyNo"
        placeholder="insurancePolicyNo"
        value={formData.insurancePolicyNo}
        onChange={handleChange}
      />
<input
        name="registration"
        placeholder="registration"
        value={formData.registration}
        onChange={handleChange}
      />
      
      <select
        name="driverID"
        value={formData.driverID}
        onChange={handleChange}
      >
        <option value="">Select driverID</option>
        {driverIDs.map((item) => (
          <option key={item.driverID} value={item.driverID}>
            {item.name || item.id}
          </option>
        ))}
      </select>
      <button type="submit">Save</button>
    </form>
  );
};

export default TruckForm;