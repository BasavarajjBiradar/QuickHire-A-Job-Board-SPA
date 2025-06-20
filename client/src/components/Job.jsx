import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import { useSearchParams, useNavigate, Link } from 'react-router-dom'; // Added Link

// SearchBar component
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
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

// FilterGroup component
const FilterGroup = ({ label, options, onChange, value }) => (
  <div className="filter-group">
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">{`All ${label}`}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <i className="fas fa-chevron-down"></i>
  </div>
);

// JobCard component
const JobCard = ({ job, index }) => (
  <div className="job-card" style={{ animationDelay: `${index * 0.1}s` }}>
    <h3>{job.title}</h3>
    <div className="company">{job.Company}</div>
    <div className="location">
      <i className="fas fa-map-marker-alt"></i> {job.Location}
    </div>
    <div className="description">{job.Description}</div>
    <div className="tags">
      <span className="tag">{job.Location}</span>
    </div>
    <Link to={`/job/${job._id}`} className="apply-btn">Apply Now</Link>
  </div>
);

// Main Job Component
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

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Fetch jobs on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/jobs');
        if (res.data.success) {
          const jobs = res.data.data;
          setAllJobs(jobs);
          console.log('Fetched jobs:', jobs);

          // Get URL filters
          const newFilters = {
            company: searchParams.get('company') || '',
            location: searchParams.get('location') || '',
            experience: searchParams.get('experience') || '',
            jobType: searchParams.get('jobType') || '',
            role: searchParams.get('role') || ''
          };
          setFilters(newFilters);
          applyFilters(jobs, newFilters);
        }
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchJobs();
  }, []); // only on mount

  // Apply filters when filters change
  useEffect(() => {
    applyFilters(allJobs, filters);
    updateURLParams(filters);
  }, [filters]);

  // Search handler
  const handleSearch = (searchTerm) => {
    const lowerSearch = searchTerm.toLowerCase();
    const searched = allJobs.filter((job) =>
      job.title.toLowerCase().includes(lowerSearch) ||
      job.Company.toLowerCase().includes(lowerSearch) ||
      job.Description.toLowerCase().includes(lowerSearch)
    );
    applyFilters(searched, filters);
  };

  // Apply filters
  const applyFilters = (jobs, activeFilters) => {
    let result = [...jobs];

    if (activeFilters.location) {
      result = result.filter(job => job.Location === activeFilters.location);
    }
    if (activeFilters.experience) {
      result = result.filter(job => job.experience === activeFilters.experience);
    }
    if (activeFilters.jobType) {
      result = result.filter(job => job.jobType === activeFilters.jobType);
    }
    if (activeFilters.company) {
      result = result.filter(job => job.Company === activeFilters.company);
    }
    if (activeFilters.role) {
      result = result.filter(job => job.title === activeFilters.role);
    }

    setFilteredJobs(result);
  };

  // Update state + URL when filter dropdown changes
  const handleFilterChange = (filterName, value) => {
    const updatedFilters = { ...filters, [filterName]: value };
    setFilters(updatedFilters);
  };

  // Update the URL query string
  const updateURLParams = (filtersObj) => {
    const params = new URLSearchParams();
    Object.entries(filtersObj).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    navigate(`/jobs?${params.toString()}`);
  };

  // Get unique values for filter dropdowns
  const getUniqueOptions = (key) => {
    const options = [...new Set(allJobs.map(job => job[key]))];
    return options.filter(Boolean).map(item => ({ value: item, label: item }));
  };

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
            options={getUniqueOptions('Location')}
            value={filters.location}
            onChange={(val) => handleFilterChange('location', val)}
          />
          <FilterGroup
            label="Companies"
            options={getUniqueOptions('Company')}
            value={filters.company}
            onChange={(val) => handleFilterChange('company', val)}
          />
          <FilterGroup
            label="Roles"
            options={getUniqueOptions('title')}
            value={filters.role}
            onChange={(val) => handleFilterChange('role', val)}
          />
        </div>

        <div className="job-listings">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <JobCard key={job._id} job={job} index={index} />
            ))
          ) : (
            <div className="no-results">No jobs match your selected filters.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Job;
