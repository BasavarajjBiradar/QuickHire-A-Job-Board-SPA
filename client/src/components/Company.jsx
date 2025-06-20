import React, { useEffect, useState } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';

const Company = ({ isLoggedIn, setIsLoggedIn }) => {
    const [jobs, setJobs] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);

    useEffect(() => {
        // Simulated backend data fetch
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/jobs'); // change to your real backend endpoint
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
        setSelectedCompany(company);
        const filtered = jobs.filter(job => job.Company === company);
        setFilteredJobs(filtered);
    };

    return (
        <>
            <div className="container">
                <h2>Companies</h2>
                <div className="company-list">
                    {companies.map(company => (
                        <button
                            key={company}
                            className={`btn m-2 ${selectedCompany === company ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => handleCompanyClick(company)}
                        >
                            {company}
                        </button>
                    ))}
                </div>

                <h3 className="mt-4">{selectedCompany ? `${selectedCompany} Job Posts` : 'Select a Company'}</h3>
                <div className="job-list mt-3">
                    {filteredJobs.map(job => (
                        <div key={job._id} className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">{job.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{job.Location}</h6>
                                <p className="card-text">{job.Description}</p>
                                <small className="text-muted">Posted on: {new Date(job.createdAt).toLocaleDateString()}</small>
                            </div>
                        </div>
                    ))}
                    {selectedCompany && filteredJobs.length === 0 && <p>No jobs found for {selectedCompany}</p>}
                </div>
            </div>
        </>
    );
};

export default Company;
