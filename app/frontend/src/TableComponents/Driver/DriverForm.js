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
        // Populate form fields with selected driver's data
        setFormData({
          licenseNumber: selected.licenseNumber || "",
          driverName: selected.driverName || "",
          homeAddress: selected.homeAddress || "",
          yearsOfExperience: selected.yearsOfExperience || "",
          numberOfDeliveries: selected.numberOfDeliveries || "",
          email: selected.email || "",
          age: selected.age || "",
          salary: selected.salary || "",
          employmentDate: selected.employmentDate || "",
          workingStatus: selected.workingStatus || "",
          truckOwnedorAssigned: selected.truckOwnedorAssigned || "",
        });
      } else {
        console.error("Driver not found in list.");
      }
    } else {
      // Reset form if no driver is selected
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

    const url = selectedDriver
      ? `http://localhost:5001/api/driver/${selectedDriver}`
      : "http://localhost:5001/api/driver";
    const method = selectedDriver ? "PUT" : "POST";

    console.log("Request URL:", url);
    console.log("Request Method:", method);
    console.log("Form Data Sent:", formData);

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      console.log("Response Data:", responseData);

      if (response.ok) {
        alert("Driver saved successfully!");
        // Refresh driver list
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
    <form onSubmit={handleSubmit}>
      <select value={selectedDriver} onChange={handleDriverSelect}>
        <option value="">Select a Driver</option>
        {drivers.map((driver) => (
          <option key={driver.driverID} value={driver.driverID}>
            {driver.driverName}
          </option>
        ))}
      </select>

      <input
        name="licenseNumber"
        placeholder="License Number"
        value={formData.licenseNumber || ""}
        onChange={handleChange}
        required
      />
      <input
        name="driverName"
        placeholder="Driver Name"
        value={formData.driverName || ""}
        onChange={handleChange}
        required
      />
      <input
        name="homeAddress"
        placeholder="Home Address"
        value={formData.homeAddress || ""}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="yearsOfExperience"
        placeholder="Years of Experience"
        value={formData.yearsOfExperience || ""}
        onChange={handleChange}
      />
      <input
        type="number"
        name="numberOfDeliveries"
        placeholder="Number of Deliveries"
        value={formData.numberOfDeliveries || ""}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        type="email"
        value={formData.email || ""}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age || ""}
        onChange={handleChange}
      />
      <input
        type="number"
        name="salary"
        placeholder="Salary"
        value={formData.salary || ""}
        onChange={handleChange}
      />
      <input
        type="date"
        name="employmentDate"
        placeholder="Employment Date"
        value={formData.employmentDate || ""}
        onChange={handleChange}
      />
      <select
        name="workingStatus"
        value={formData.workingStatus || ""}
        onChange={handleChange}
      >
        <option value="">Select Working Status</option>
        <option value="ACTIVE">ACTIVE</option>
        <option value="INACTIVE">INACTIVE</option>
        <option value="ON LEAVE">ON LEAVE</option>
      </select>
      <select
        name="truckOwnedorAssigned"
        value={formData.truckOwnedorAssigned || ""}
        onChange={handleChange}
      >
        <option value="">Select Truck Ownership</option>
        <option value="OWNED">OWNED</option>
        <option value="ASSIGNED">ASSIGNED</option>
      </select>

      <button type="submit">{selectedDriver ? "Update Driver" : "Save Driver"}</button>
    </form>
  );
};

export default DriverForm;
