import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Company.css';

const Company = () => {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/jobs');
        const json = await response.json();
        if (json.success) {
          setJobs(json.data);
          const uniqueCompanies = [...new Set(json.data.map(job => job.Company))];
          setCompanies(uniqueCompanies);
        } else {
          console.error('API response unsuccessful:', json);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
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
    Oracle: {
      logo: '/assets/oraclelogo.jpeg',
      description: 'Oracle Tech offers end-to-end IT and consulting services.'
    },
    Cognizant: {
      logo: '/assets/cognizantlogo.jpeg',
      description: 'Cognizant leads in AI, cloud, and digital transformation.'
    },
    Wipro: {
      logo: '/assets/wiprologo.jpeg',
      description: 'Wipro is a global leader in technology consulting and services.'
    },
    Google: {
      logo: '/assets/googlelogo.jpeg',
      description: 'Google is a global leader in technology consulting and services.'
    },
    TCS: {
      logo: '/assets/tcslogo.jpeg',
      description: 'TCS is a global leader in technology consulting and services.'
    },
    Accenture: {
      logo: '/assets/accenturelogo.jpeg',
      description: 'Accenture is a global leader in technology consulting and services.'
    },
    Meta: {
      logo: '/assets/metalogo.jpeg',
      description: 'Meta is a global leader in technology consulting and services.'
    },
    Amazon: {
      logo: '/assets/amazonlogo.png',
      description: 'Amazon innovates in e-commerce, cloud computing, and AI.'
    },
    Cisco: {
      logo: '/assets/Cisco.jpg',
      description: 'Cisco innovates in e-commerce, cloud computing, and AI.'
    }
  };

  return (
    <div className="company-container">
      <div className="heading-highlight">
        <h1 className="heading-title">
          🌟 Explore Jobs by <span>Top Companies</span>
        </h1>
        <p className="heading-subtitle">
          🔍 Discover opportunities at leading employers and take your career to new heights.
        </p>
      </div>

      <div className="company-grid">
        {companies.map(company => (
          companyDetails[company] ? (
            <div key={company} className="company-card">
              <img
                src={companyDetails[company].logo || '/assets/defaultlogo.png'}
                alt={`${company} logo`}
                className="company-logo"
                onError={(e) => {
                  e.target.src = '/assets/backrem.png'; // Fallback image on error
                }}
              />
              <h3 className="company-name">{company}</h3>
              <p className="company-desc">
                {companyDetails[company].description || 'This company provides excellent career opportunities.'}
              </p>
              <button
                className="view-jobs-btn"
                onClick={() => handleCompanyClick(company)}
              >
                View Jobs
              </button>
            </div>
          ) : null
        ))}
      </div>
    </div>
  );
};

export default Company;