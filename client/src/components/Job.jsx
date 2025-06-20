import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';

// Reuse SearchBar, FilterGroup, JobCard as is

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search jobs by title, company, or skill..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

const FilterGroup = ({ label, options, onChange, value }) => (
  <div className="filter-group">
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">{`All ${label}`}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
    <i className="fas fa-chevron-down"></i>
  </div>
);

const JobCard = ({ job, index }) => (
  <div className="job-card" style={{ animationDelay: `${index * 0.1}s` }}>
    <h3>{job.title}</h3>
    <div className="company">{job.Company}</div>
    <div className="location"><i className="fas fa-map-marker-alt"></i> {job.Location}</div>
    <div className="description">{job.Description}</div>
    <div className="tags">
      {/* Optional: Generate tags from description/skills if available */}
      <span className="tag">{job.Location}</span>
    </div>
    <a href="#" className="apply-btn">Apply Now</a>
  </div>
);

const Job = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    experience: '',
    jobType: '',
    company: '',
    role: ''
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/jobs');
        if (res.data.success) {
          setAllJobs(res.data.data);
          setFilteredJobs(res.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (searchTerm) => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = allJobs.filter(job =>
      job.title.toLowerCase().includes(lowerSearch) ||
      job.Company.toLowerCase().includes(lowerSearch) ||
      job.Description.toLowerCase().includes(lowerSearch)
    );
    applyFilters(filtered);
  };

  const applyFilters = (jobs = allJobs) => {
    let result = jobs;
    if (filters.location) {
      result = result.filter(job => job.Location === filters.location);
    }
    if (filters.experience) {
      result = result.filter(job => job.experience === filters.experience);
    }
    if (filters.jobType) {
      result = result.filter(job => job.jobType === filters.jobType);
    }
    if (filters.company) {
      result = result.filter(job => job.Company === filters.company);
    }
    if (filters.role) {
      result = result.filter(job => job.title === filters.role);
    }
    setFilteredJobs(result);
  };


  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>
      <div className="container">
        <div className="filters">
          <FilterGroup
            label="Locations"
            options={[...new Set(allJobs.map(job => job.Location))].map(loc => ({ value: loc, label: loc }))}
            value={filters.location}
            onChange={(value) => handleFilterChange('location', value)}
          />
          <FilterGroup
            label="Companies"
            options={[...new Set(allJobs.map(job => job.Company))].map(comp => ({ value: comp, label: comp }))}
            value={filters.company}
            onChange={(value) => handleFilterChange('company', value)}
          />

          <FilterGroup
            label="Roles"
            options={[...new Set(allJobs.map(job => job.title))].map(role => ({ value: role, label: role }))}
            value={filters.role}
            onChange={(value) => handleFilterChange('role', value)}
          />

          {/* Optional: Add experience/jobType only if backend provides */}
        </div>
        <div className="job-listings">
          {filteredJobs.map((job, index) => (
            <JobCard key={job._id} job={job} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Job;
