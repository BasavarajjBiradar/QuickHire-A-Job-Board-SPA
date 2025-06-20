import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';
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
      description: 'Techtrix is an innovative software solutions company delivering scalable tech for modern businesses.'
    },
    India: {
      logo: 'https://via.placeholder.com/150?text=India+Tech',
      description: 'India Tech is a rising tech hub providing end-to-end IT and consulting services across industries.'
    },
    Technova: {
      logo: '/assets/technovalogo.png',
      description: 'Technova focuses on digital transformation, offering smart solutions in AI, cloud, and enterprise tech.'
    },
    Wipro: {
      logo: '/assets/wiprologo.png',
      description: 'Wipro is a globally recognized technology services and consulting company, delivering innovation-led strategies and business solutions across industries.'
    },
    Amazon: {
      logo: '/assets/amazonlogo.png',
      description: 'Amazon is a global tech giant specializing in e-commerce, cloud computing, digital streaming, and AI.'
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="page-heading">Explore Jobs by Top Companies</h1>
        <p className="lead text-muted">Select a company to view its job opportunities</p>
      </div>

      <div className="row g-3 mb-5">
        {companies.map(company => (
          <div key={company} className="col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow company-card">
              <img
                src={companyDetails[company]?.logo}
                alt={`${company} logo`}
                className="card-img-top"
              />
              <div className="card-body d-flex flex-column">
                <h6 className="card-title">{company}</h6>
                <p className="card-text text-muted" style={{ fontSize: '0.85rem', minHeight: '60px' }}>
                  {companyDetails[company]?.description || 'This company provides excellent career opportunities.'}
                </p>
                <button
                  className="view-jobs-btn mt-auto"
                  onClick={() => handleCompanyClick(company)}
                >
                  View Jobs
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Company;
