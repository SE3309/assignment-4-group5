import React, { useState, useEffect } from "react";
import axios from "axios";

const DriverMetricComponent = () => {
    const [topDrivers, setTopDrivers] = useState([]);
    const [averageDeliveries, setAverageDeliveries] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const BASE_URL = "http://localhost:5001"; // Replace with your backend's base URL

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                setLoading(true);

                // Fetch top-performing drivers
                const topDriversResponse = await axios.get(`${BASE_URL}/api/driver/top-performers`);
                setTopDrivers(topDriversResponse.data);

                // Fetch average deliveries
                const avgDeliveriesResponse = await axios.get(`${BASE_URL}/api/driver/average-deliveries`);
                setAverageDeliveries(avgDeliveriesResponse.data.averageDeliveries);

                setLoading(false);
            } catch (err) {
                setError(err.message || "Failed to fetch data");
                setLoading(false);
            }
        };

        fetchMetrics();
    }, []);


    // Display loading or error
    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (error) {
        return (
            <div className="text-center mt-5 text-danger">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">Driver Performance Metrics</h1>

            {/* Average Deliveries */}
            <div className="my-4 text-center">
                <h3>Average Deliveries Per Driver</h3>
                <p className="lead">{averageDeliveries || 0}</p>
            </div>

            {/* Top-Performing Drivers */}
            <div>
                <h3>Top Performing Drivers</h3>
                {topDrivers.length > 0 ? (
                    <table className="table table-striped mt-3">
                        <thead>
                            <tr>
                                <th>Driver ID</th>
                                <th>Name</th>
                                <th>Number of Deliveries</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topDrivers.map((driver) => (
                                <tr key={driver.driverID}>
                                    <td>{driver.driverID}</td>
                                    <td>{driver.driverName}</td>
                                    <td>{driver.numberOfDeliveries}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center">No top drivers to display.</p>
                )}
            </div>
        </div>
    );
};

export default DriverMetricComponent;