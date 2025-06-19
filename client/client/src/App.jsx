import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoanForm from './components/LoanForm';
import LoanList from './components/LoanList';
import './App.css';

function App() {
  const [loans, setLoans] = useState([]);
  const [editLoan, setEditLoan] = useState(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get('http://localhost:4000/loans');
        setLoans(response.data);
      } catch (error) {
        console.error('Error fetching loans:', error);
      }
    };
    fetchLoans();
  }, []);

  const addLoan = async (loan) => {
    try {
      const addedLoan = await axios.post('http://localhost:4000/loans', loan);
      setLoans([...loans, addedLoan.data]);
    } catch (error) {
      console.error('Error adding loan:', error);
    }
  };

  const deleteLoan = async (loanId) => {
    try {
      await axios.delete(`http://localhost:4000/loans/${loanId}`);
      setLoans(loans.filter((loan) => loan.id !== loanId));
    } catch (error) {
      console.error('Error deleting loan:', error);
    }
  };

  const updateLoan = async (loan) => {
    try {
      await axios.put(`http://localhost:4000/loans/${loan.id}`, loan);
      setLoans(
        loans.map((l) => (l.id === loan.id ? { ...l, ...loan } : l))
      );
      setEditLoan(null);
    } catch (error) {
      console.error('Error updating loan:', error);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Loan Management System</h1>
      </header>
      <main className="app-main">
        <section className="section">
          <h2 className="section-title">Add New Loan</h2>
          <LoanForm addLoan={addLoan} editLoan={editLoan} updateLoan={updateLoan} />
        </section>
        <section className="section">
          <h2 className="section-title">Loan Records</h2>
          <LoanList
            loans={loans}
            deleteLoan={deleteLoan}
            setEditLoan={setEditLoan}
          />
        </section>
      </main>
    </div>
  );
}

export default App;