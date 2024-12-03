import React from "react";
import { useNavigate } from "react-router-dom";

const FrontPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      <h1 className="display-4">Welcome to the Truck Management Application</h1>
      <p className="lead">Select a feature to proceed</p>
      <div className="d-grid gap-3 col-6 mx-auto">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/create-tables")}
        >
          Creating Tables
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/invoice-generator")}
        >
          Invoice Generator
        </button>
        <button
          className="btn btn-success"
          onClick={() => navigate("/feature3")}
        >
          Search
        </button>
        <button
          className="btn btn-danger"
          onClick={() => navigate("/feature4")}
        >
          Feature 4
        </button>
        <button
          className="btn btn-warning"
          onClick={() => navigate("/feature5")}
        >
          Feature 5
        </button>
        <button
          className="btn btn-info"
          onClick={() => navigate("/feature6")}
        >
          Feature 6
        </button>
      </div>
    </div>
  );
};

export default FrontPage;
