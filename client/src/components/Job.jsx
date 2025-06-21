import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // 🔥 Get user from Redux

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => onSearch(searchTerm);

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

// 🔥 Updated JobCard with onApply prop
const JobCard = ({ job, index, onApply }) => (
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
    <button className="apply-btn" onClick={() => onApply(job._id)}>
      Apply Now
    </button>
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
  const [darkMode, setDarkMode] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // 🔥 Get user from Redux

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/jobs');
        if (res.data.success) {
          const jobs = res.data.data;
          setAllJobs(jobs);

          const urlFilters = {
            company: searchParams.get('company') || '',
            location: searchParams.get('location') || '',
            experience: searchParams.get('experience') || '',
            jobType: searchParams.get('jobType') || '',
            role: searchParams.get('role') || ''
          };
          setFilters(urlFilters);
          applyFilters(jobs, urlFilters);
        }
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    applyFilters(allJobs, filters);
    updateURLParams(filters);
  }, [filters]);

  const handleSearch = (searchTerm) => {
    const lower = searchTerm.toLowerCase();
    const matched = allJobs.filter((job) =>
      job.title.toLowerCase().includes(lower) ||
      job.Company.toLowerCase().includes(lower) ||
      job.Description.toLowerCase().includes(lower)
    );
    applyFilters(matched, filters);
  };

  const applyFilters = (jobs, activeFilters) => {
    let result = [...jobs];

    if (activeFilters.location) result = result.filter(j => j.Location === activeFilters.location);
    if (activeFilters.experience) result = result.filter(j => j.experience === activeFilters.experience);
    if (activeFilters.jobType) result = result.filter(j => j.jobType === activeFilters.jobType);
    if (activeFilters.company) result = result.filter(j => j.Company === activeFilters.company);
    if (activeFilters.role) result = result.filter(j => j.title === activeFilters.role);

    setFilteredJobs(result);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const updateURLParams = (filtersObj) => {
    const params = new URLSearchParams();
    Object.entries(filtersObj).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    navigate(`/jobs?${params.toString()}`);
  };

  const getUniqueOptions = (key) => {
    const options = [...new Set(allJobs.map(job => job[key]))];
    return options.filter(Boolean).map(item => ({ value: item, label: item }));
  };

  // 🔥 Apply Now Handler
  const handleApply = (jobId) => {
    if (!user) {
      alert("Please login to apply for this job.");
      navigate('/Login');
      return;
    }

    navigate(`/job/${jobId}`);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
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
              <JobCard key={job._id} job={job} index={index} onApply={handleApply} />
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
