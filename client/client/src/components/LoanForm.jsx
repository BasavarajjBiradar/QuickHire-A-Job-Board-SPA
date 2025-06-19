import React, { useState, useEffect } from 'react';
import './LoanForm.css';

const LoanForm = ({ addLoan, editLoan, updateLoan }) => {
    const [loan, setLoan] = useState({
        customer: '',
        amount: '',
        interestRate: '',
    });

    useEffect(() => {
        if (editLoan) {
            setLoan({ ...editLoan });
        } else {
            setLoan({
                customer: '',
                amount: '',
                interestRate: '',
            });
        }
    }, [editLoan]);

    const isEditForm = !!editLoan;
    const isFormIncomplete = !loan.customer || 
                           !loan.amount || 
                           !loan.interestRate || 
                           loan.amount <= 0 || 
                           loan.interestRate <= 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormIncomplete) return;
        
        const loanData = {
            ...loan,
            amount: parseFloat(loan.amount),
            interestRate: parseFloat(loan.interestRate)
        };

        if (isEditForm) {
            updateLoan(loanData);
        } else {
            addLoan(loanData);
        }
        setLoan({ customer: '', amount: '', interestRate: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoan(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="loan-form-container">
            <h2 className="loan-form-title">
                {isEditForm ? 'Edit Loan' : 'Add Loan'}
            </h2>
            <div className="loan-form">
                <div className="form-group">
                    <label htmlFor="customer">Customer Name</label>
                    <input
                        id="customer"
                        name="customer"
                        type="text"
                        value={loan.customer}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter customer name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Loan Amount ($)</label>
                    <input
                        id="amount"
                        name="amount"
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={loan.amount}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter loan amount"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="interestRate">Interest Rate (%)</label>
                    <input
                        id="interestRate"
                        name="interestRate"
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={loan.interestRate}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter interest rate"
                    />
                </div>
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isFormIncomplete}
                    className="submit-button"
                >
                    {isEditForm ? 'Update Loan' : 'Add Loan'}
                </button>
            </div>
        </div>
    );
};

export default LoanForm;