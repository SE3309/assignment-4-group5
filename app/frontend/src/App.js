import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import FormComponent from './TableComponents/FormComponent'; // Adjust this path if needed
import SearchComponent from './components/SearchComponent'; // Adjust this path if needed
import DriverMetricComponent from './components/driverMetricsComponent'; // Correct import for the Driver Metrics component

// FrontPage Component
function FrontPage() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4">Truck Management App</h1>
        <p className="lead">Select a feature to proceed</p>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-md-4 mb-3">
          <button
            className="btn btn-primary btn-lg w-100"
            onClick={() => navigate('/create-tables')}
          >
            Creating Tables
          </button>
        </div>
        <div className="col-md-4 mb-3">
          <button
            className="btn btn-secondary btn-lg w-100"
            onClick={() => navigate('/invoice-generator')}
          >
            Invoice Generator
          </button>
        </div>
        <div className="col-md-4 mb-3">
          <button
            className="btn btn-success btn-lg w-100"
            onClick={() => navigate('/search')}
          >
            Search
          </button>
        </div>
        <div className="col-md-4 mb-3">
          <button
            className="btn btn-danger btn-lg w-100"
            onClick={() => navigate('/driver-metrics')}
          >
            Driver Performance Metrics
          </button>
        </div>
        <div className="col-md-4 mb-3">
          <button
            className="btn btn-warning btn-lg w-100"
            onClick={() => navigate('/finance-report')}
          >
            Finance Report
          </button>
        </div>
        <div className="col-md-4 mb-3">
          <button
            className="btn btn-info btn-lg w-100"
            onClick={() => navigate('/feature6')}
          >
            Feature 6
          </button>
        </div>
      </div>
    </div>
  );
}

// Main App Component with Router
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/create-tables" element={<FormComponent />} />
        <Route path="/search" element={<SearchComponent />} />
        <Route path="/driver-metrics" element={<DriverMetricComponent />} />
        <Route
          path="/feature5"
          element={
            <div className="container mt-5 text-center">
              <h1>Feature 5 Coming Soon</h1>
            </div>
          }
        />
        <Route
          path="/feature6"
          element={
            <div className="container mt-5 text-center">
              <h1>Feature 6 Coming Soon</h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;