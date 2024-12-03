import React, { useState } from "react";
import axios from "axios";

const SearchComponent = () => {
  const [entityType, setEntityType] = useState("drivers");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5001/api/search`,
        {
          params: { type: entityType, query },
        }
      );
      setResults(response.data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Search Entities</h1>
      <div className="row mb-4">
        <div className="col-md-4">
          <select
            className="form-select"
            value={entityType}
            onChange={(e) => setEntityType(e.target.value)}
          >
            <option value="drivers">Drivers</option>
            <option value="trucks">Trucks</option>
            <option value="shipments">Shipments</option>
            <option value="suppliers">Suppliers</option>
          </select>
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Enter search query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button
            className="btn btn-primary w-100"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      {/* Results Table */}
      {results.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                {Object.keys(results[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  {Object.values(result).map((value, idx) => (
                    <td key={idx}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {results.length === 0 && !loading && query && (
        <p className="text-center text-muted">No results found.</p>
      )}
    </div>
  );
};

export default SearchComponent;
