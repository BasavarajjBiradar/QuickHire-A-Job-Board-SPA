import React, { useState, useEffect } from 'react';
import './Home.css';

const jobsData = [
  {
    title: "Software Engineer",
    company: "Tech Solutions Pvt. Ltd.",
    location: "Bangalore",
   
    description: "Develop and maintain web applications using React and Node.js. Collaborate with cross-functional teams to deliver high-quality software.",
    experience: "2-5",
    jobType: "Full-Time",
    tags: ["React", "Node.js", "Full-Time"]
  },
  {
    title: "Senior Product Manager",
    company: "Innovate Corp.",
    location: "Mumbai",
    
    description: "Lead product strategy and roadmap. Work with engineering and design teams to launch innovative products.",
    experience: "5+",
    jobType: "Full-Time",
    tags: ["Product Management", "Agile", "Full-Time"]
  },
  {
    title: "UI/UX Designer",
    company: "Creative Minds",
    location: "Remote",
   
    description: "Design user-friendly interfaces for web and mobile apps. Conduct user research and create wireframes.",
    experience: "0-2",
    jobType: "Part-Time",
    tags: ["UI/UX", "Figma", "Part-Time"]
  },
  {
    title: "Data Analyst",
    company: "Data Insights Ltd.",
    location: "Delhi",
   
    description: "Analyze large datasets to provide actionable insights. Proficiency in SQL and Python required.",
    experience: "2-5",
    jobType: "Contract",
    tags: ["SQL", "Python", "Contract"]
  }
];

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
    <div className="company">{job.company}</div>
    <div className="location"><i className="fas fa-map-marker-alt"></i> {job.location}</div>
    <div className="salary"><i className="fas fa-rupee-sign"></i> {job.salary}</div>
    <div className="description">{job.description}</div>
    <div className="tags">
      {job.tags.map((tag) => (
        <span key={tag} className="tag">{tag}</span>
      ))}
    </div>
    <a href="#" className="apply-btn">Apply Now</a>
  </div>
);

const Home = () => {
  const [filteredJobs, setFilteredJobs] = useState(jobsData);
  const [filters, setFilters] = useState({
    location: '',
    experience: '',
    jobType: ''
  });

  const handleSearch = (searchTerm) => {
    const lowerSearch = searchTerm.toLowerCase();
    applyFilters(jobsData.filter(job =>
      job.title.toLowerCase().includes(lowerSearch) ||
      job.company.toLowerCase().includes(lowerSearch) ||
      job.description.toLowerCase().includes(lowerSearch) ||
      job.tags.some(tag => tag.toLowerCase().includes(lowerSearch))
    ));
  };

  const applyFilters = (jobs = jobsData) => {
    let result = jobs;
    if (filters.location) {
      result = result.filter(job => job.location === filters.location);
    }
    if (filters.experience) {
      result = result.filter(job => job.experience === filters.experience);
    }
    if (filters.jobType) {
      result = result.filter(job => job.jobType === filters.jobType);
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
            options={[
              { value: "Bangalore", label: "Bangalore" },
              { value: "Mumbai", label: "Mumbai" },
              { value: "Delhi", label: "Delhi" },
              { value: "Remote", label: "Remote" }
            ]}
            value={filters.location}
            onChange={(value) => handleFilterChange('location', value)}
          />
          <FilterGroup
            label="Experience Levels"
            options={[
              { value: "0-2", label: "0-2 Years" },
              { value: "2-5", label: "2-5 Years" },
              { value: "5+", label: "5+ Years" }
            ]}
            value={filters.experience}
            onChange={(value) => handleFilterChange('experience', value)}
          />
          <FilterGroup
            label="Job Types"
            options={[
              { value: "Full-Time", label: "Full-Time" },
              { value: "Part-Time", label: "Part-Time" },
              { value: "Contract", label: "Contract" }
            ]}
            value={filters.jobType}
            onChange={(value) => handleFilterChange('jobType', value)}
          />
        </div>
        <div className="job-listings">
          {filteredJobs.map((job, index) => (
            <JobCard key={job.title + job.company} job={job} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;