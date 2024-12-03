import React, { useState } from "react";
import axios from "axios";

const DriverFilterComponent = () => {
  const [filters, setFilters] = useState({
    workingStatus: "ACTIVE",
    deliveryTypes: "EXPEDITED,PRIORITY",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    limit: 5,
    offset: 0,
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const fetchResults = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:5001/api/driver/filtered-drivers", {
        params: filters,
      });
      setResults(response.data);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Driver Filter</h1>
      <div className="row">
        <div className="col-md-6">
          <label htmlFor="workingStatus" className="form-label">
            Working Status:
          </label>
          <input
            type="text"
            className="form-control"
            id="workingStatus"
            name="workingStatus"
            value={filters.workingStatus}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="deliveryTypes" className="form-label">
            Delivery Types (comma-separated):
          </label>
          <input
            type="text"
            className="form-control"
            id="deliveryTypes"
            name="deliveryTypes"
            value={filters.deliveryTypes}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 mt-3">
          <label htmlFor="startDate" className="form-label">
            Start Date:
          </label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            name="startDate"
            value={filters.startDate}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 mt-3">
          <label htmlFor="endDate" className="form-label">
            End Date:
          </label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            name="endDate"
            value={filters.endDate}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 mt-3">
          <label htmlFor="limit" className="form-label">
            Limit:
          </label>
          <input
            type="number"
            className="form-control"
            id="limit"
            name="limit"
            value={filters.limit}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 mt-3">
          <label htmlFor="offset" className="form-label">
            Offset:
          </label>
          <input
            type="number"
            className="form-control"
            id="offset"
            name="offset"
            value={filters.offset}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={fetchResults}>
          Fetch Results
        </button>
      </div>

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-danger text-center mt-4">{error}</p>}

      {results.length > 0 && (
        <div className="table-responsive mt-4">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Driver ID</th>
                <th>Driver Name</th>
                <th>Route ID</th>
                <th>Pickup Longitude</th>
                <th>Pickup Latitude</th>
                <th>Pickup Time</th>
                <th>Shipment ID</th>
                <th>Type of Product</th>
                <th>Delivery Type</th>
                <th>Load Weight</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{result.driverID}</td>
                  <td>{result.driverName}</td>
                  <td>{result.routeID}</td>
                  <td>{result.pickupLongitude}</td>
                  <td>{result.pickupLattitude}</td>
                  <td>{new Date(result.pickupTime).toLocaleString()}</td>
                  <td>{result.shipmentID}</td>
                  <td>{result.typeOfProduct}</td>
                  <td>{result.deliveryType}</td>
                  <td>{result.loadWeight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DriverFilterComponent;