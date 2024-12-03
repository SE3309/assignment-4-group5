import React, { useState } from "react";
import axios from "axios";

const TruckAssignmentComponent = () => {
    const [formData, setFormData] = useState({
        newDriverID: "",
        mileage: "",
        licensePlateNumber: "",
        VIN: "",
        makeModelYear: "",
        maxTowWeight: "",
        insurancePolicyNo: "",
        registration: ""
    });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {
            const response = await axios.post("http://localhost:5001/api/truck/assign-driver", formData);
            setSuccessMessage(response.data.message);
        } catch (error) {
            setErrorMessage(error.response?.data?.error || "Failed to assign truck");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Truck Assignment</h1>
            <div className="card shadow p-4">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="newDriverID">Driver ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="newDriverID"
                            name="newDriverID"
                            value={formData.newDriverID}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mileage">Mileage</label>
                        <input
                            type="number"
                            className="form-control"
                            id="mileage"
                            name="mileage"
                            value={formData.mileage}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="licensePlateNumber">License Plate Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="licensePlateNumber"
                            name="licensePlateNumber"
                            value={formData.licensePlateNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="VIN">VIN</label>
                        <input
                            type="text"
                            className="form-control"
                            id="VIN"
                            name="VIN"
                            value={formData.VIN}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="makeModelYear">Make/Model/Year</label>
                        <input
                            type="text"
                            className="form-control"
                            id="makeModelYear"
                            name="makeModelYear"
                            value={formData.makeModelYear}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="maxTowWeight">Max Tow Weight</label>
                        <input
                            type="number"
                            className="form-control"
                            id="maxTowWeight"
                            name="maxTowWeight"
                            value={formData.maxTowWeight}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="insurancePolicyNo">Insurance Policy Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="insurancePolicyNo"
                            name="insurancePolicyNo"
                            value={formData.insurancePolicyNo}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="registration">Registration</label>
                        <input
                            type="text"
                            className="form-control"
                            id="registration"
                            name="registration"
                            value={formData.registration}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-3" disabled={loading}>
                        {loading ? "Assigning..." : "Assign Truck"}
                    </button>
                </form>
                {successMessage && <p className="text-success mt-3">{successMessage}</p>}
                {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default TruckAssignmentComponent;