import React, { useState, useEffect } from "react";

const bankInformationForm = () => {
  const [formData, setFormData] = useState({
    driverID: "",
    transitNo: "",
    branchNo: "",
    accountNo: ""
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
      const response = await fetch("http://localhost:5001/api/bankinformation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("bankInformation saved successfully!");
      } else {
        console.error("Error saving bankInformation");
      }
    } catch (error) {
      console.error("Error saving bankInformation", error);
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
        name="transitNo"
        placeholder="transitNo"
        value={formData.transitNo}
        onChange={handleChange}
      />
<input
        name="branchNo"
        placeholder="branchNo"
        value={formData.branchNo}
        onChange={handleChange}
      />
<input
        name="accountNo"
        placeholder="accountNo"
        value={formData.accountNo}
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

export default bankInformationForm;