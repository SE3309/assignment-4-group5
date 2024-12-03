import React, { useState, useEffect } from "react";
import axios from "axios";

const FinanceReportComponent = () => {
    const [month, setMonth] = useState(1); // Default: January
    const [year, setYear] = useState(2023); // Default: 2023
    const [totalExpenses, setTotalExpenses] = useState([]);
    const [expenseBreakdown, setExpenseBreakdown] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch finance data
    const fetchFinanceData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch total expenses per truck
            const totalExpensesResponse = await axios.get(
                `http://localhost:5001/api/finance/total-expenses?month=${month}&year=${year}`
            );
            setTotalExpenses(totalExpensesResponse.data);

            // Fetch expense breakdown
            const expenseBreakdownResponse = await axios.get(
                `http://localhost:5001/api/finance/expense-breakdown?month=${month}&year=${year}`
            );
            setExpenseBreakdown(expenseBreakdownResponse.data);

            setLoading(false);
        } catch (err) {
            setError("Failed to fetch data. Please try again.");
            setLoading(false);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchFinanceData();
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Monthly Finance Report</h1>

            {/* Input Form */}
            <form className="my-4" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="month">Month</label>
                        <input
                            type="number"
                            id="month"
                            className="form-control"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            min="1"
                            max="12"
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="year">Year</label>
                        <input
                            type="number"
                            id="year"
                            className="form-control"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-100">
                    Generate Report
                </button>
            </form>

            {/* Loading Indicator */}
            {loading && <p className="text-center">Loading...</p>}

            {/* Error Message */}
            {error && <p className="text-danger text-center">{error}</p>}

            {/* Total Expenses Table */}
            {totalExpenses.length > 0 && (
                <div className="mt-5">
                    <h3>Total Expenses Per Truck</h3>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Truck ID</th>
                                <th>Licence Plate Number</th>
                                <th>Total Expenses</th>
                            </tr>
                        </thead>
                        <tbody>
                            {totalExpenses.map((expense) => (
                                <tr key={expense.truckID}>
                                    <td>{expense.truckID}</td>
                                    <td>{expense.licencePlateNumber}</td>
                                    <td>{expense.totalExpenses}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Expense Breakdown Table */}
            {expenseBreakdown.length > 0 && (
                <div className="mt-5">
                    <h3>Expense Breakdown by Type</h3>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Truck ID</th>
                                <th>Expense Type</th>
                                <th>Expense Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenseBreakdown.map((expense) => (
                                <tr key={`${expense.truckID}-${expense.expense}`}>
                                    <td>{expense.truckID}</td>
                                    <td>{expense.expense}</td>
                                    <td>{expense.expenseTotal}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default FinanceReportComponent;
