import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Company.css';

const Company = () => {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/api/jobs');
      const json = await response.json();
      if (json.success) {
        setJobs(json.data);
        const uniqueCompanies = [...new Set(json.data.map(job => job.Company))];
        setCompanies(uniqueCompanies);
      }
    };
    fetchData();
  }, []);

  const handleCompanyClick = (company) => {
    navigate(`/jobs?company=${encodeURIComponent(company)}`);
  };

  const companyDetails = {
    Techtrix: {
      logo: '/assets/techtrixlogo.png',
      description: 'Techtrix delivers scalable software solutions for modern enterprises.'
    },
    India: {
      logo: 'https://via.placeholder.com/150?text=India+Tech',
      description: 'India Tech offers end-to-end IT and consulting services.'
    },
    Technova: {
      logo: '/assets/technovalogo.png',
      description: 'Technova leads in AI, cloud, and digital transformation.'
    },
    Wipro: {
      logo: '/assets/wiprologo.png',
      description: 'Wipro is a global leader in technology consulting and services.'
    },
    Amazon: {
      logo: '/assets/amazonlogo.png',
      description: 'Amazon innovates in e-commerce, cloud computing, and AI.'
    }
  };

  return (
    <div className="company-container">
      <div className="heading-highlight">
        <h1 className="heading-title">🌟 Explore Jobs by <span>Top Companies</span></h1>
        <p className="heading-subtitle">🔍 Discover opportunities at leading employers and take your career to new heights.</p>
      </div>

      <div className="company-grid">
        {companies.map(company => (
          <div key={company} className="company-card">
            <img
              src={companyDetails[company]?.logo}
              alt={`${company} logo`}
              className="company-logo"
            />
            <h3 className="company-name">{company}</h3>
            <p className="company-desc">
              {companyDetails[company]?.description || 'This company provides excellent career opportunities.'}
            </p>
            <button className="view-jobs-btn" onClick={() => handleCompanyClick(company)}>
              View Jobs
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Company;
