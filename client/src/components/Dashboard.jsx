import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const jobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Google',
      description: 'Build and maintain UI components for Google Search.',
      appliedDate: '2025-06-15',
    },
    {
      id: 2,
      title: 'Backend Engineer',
      company: 'Netflix',
      description: 'Design microservices and scale APIs.',
      appliedDate: '2025-06-10',
    },
    {
      id: 3,
      title: 'Product Designer',
      company: 'Figma',
      description: 'Work on collaborative design features.',
      appliedDate: '2025-06-05',
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome to Dashboard</h1>
      </div>

      <div className="dashboard-content">
        <h2 className="dashboard-subtitle">Your Applied Jobs</h2>
        <div className="job-table-wrapper">
          <table className="job-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company Name</th>
                <th>Description</th>
                <th>Applied Date</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.company}</td>
                  <td>{job.description}</td>
                  <td>{new Date(job.appliedDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
