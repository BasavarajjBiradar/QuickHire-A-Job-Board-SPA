import React, { useState } from 'react';
import './LoanList.css';

const LoanList = ({ loans, deleteLoan, setEditLoan }) => {
    const [filters, setFilters] = useState({ customer: '' });

    const filteredLoans = loans.filter((loan) => {
        return loan.customer.toLowerCase().includes(filters.customer.toLowerCase().trim());
    });

    const handleDelete = (id) => {
        deleteLoan(id);
    };

    const handleEdit = (loan) => {
        setEditLoan(loan);
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, customer: e.target.value });
    };

    return (
        <div className="loan-list-container">
            <div className="filter-group">
                <label htmlFor="customer">Filter by Customer</label>
                <input
                    id="customer"
                    type="text"
                    value={filters.customer}
                    onChange={handleFilterChange}
                    placeholder="Enter customer name"
                />
            </div>
            <ul className="loan-list">
                {filteredLoans.length > 0 ? (
                    filteredLoans.map((loan) => (
                        <li key={loan.id} className="loan-item">
                            <div className="loan-detail">
                                <strong>Customer:</strong> {loan.customer}
                            </div>
                            <div className="loan-detail">
                                <strong>Amount:</strong> ${parseFloat(loan.amount).toFixed(2)}
                            </div>
                            <div className="loan-detail">
                                <strong>Interest Rate:</strong> {parseFloat(loan.interestRate).toFixed(2)}%
                            </div>
                            <div className="loan-actions">
                                <button
                                    onClick={() => handleEdit(loan)}
                                    className="edit-button"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(loan.id)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="no-loans">
                        No loans found
                    </li>
                )}
            </ul>
        </div>
    );
};

export default LoanList;