import React, { useState, useEffect } from "react";

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
    truckOwnedorAssigned: ""
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/driver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Driver saved successfully!");
      } else {
        console.error("Error saving Driver");
      }
    } catch (error) {
      console.error("Error saving Driver", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="licenseNumber"
        placeholder="licenseNumber"
        value={formData.licenseNumber}
        onChange={handleChange}
      />
<input
        name="driverName"
        placeholder="driverName"
        value={formData.driverName}
        onChange={handleChange}
      />
<input
        name="homeAddress"
        placeholder="homeAddress"
        value={formData.homeAddress}
        onChange={handleChange}
      />
<input
        name="yearsOfExperience"
        placeholder="yearsOfExperience"
        value={formData.yearsOfExperience}
        onChange={handleChange}
      />
<input
        name="numberOfDeliveries"
        placeholder="numberOfDeliveries"
        value={formData.numberOfDeliveries}
        onChange={handleChange}
      />
<input
        name="email"
        placeholder="email"
        value={formData.email}
        onChange={handleChange}
      />
<input
        name="age"
        placeholder="age"
        value={formData.age}
        onChange={handleChange}
      />
<input
        name="salary"
        placeholder="salary"
        value={formData.salary}
        onChange={handleChange}
      />
<input
        name="employmentDate"
        placeholder="employmentDate"
        value={formData.employmentDate}
        onChange={handleChange}
      />
<input
        name="workingStatus"
        placeholder="workingStatus"
        value={formData.workingStatus}
        onChange={handleChange}
      />
<input
        name="truckOwnedorAssigned"
        placeholder="truckOwnedorAssigned"
        value={formData.truckOwnedorAssigned}
        onChange={handleChange}
      />
      
      <button type="submit">Save</button>
    </form>
  );
};

export default DriverForm;