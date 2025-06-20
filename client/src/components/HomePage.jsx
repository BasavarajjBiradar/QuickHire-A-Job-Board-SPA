import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const jobPosts = [
    { title: 'Frontend Developer', company: 'TechSoft', location: 'Remote' },
    { title: 'Backend Engineer', company: 'DataLink', location: 'Bangalore' },
    { title: 'Product Designer', company: 'CreateHub', location: 'Mumbai' },
  ];

  const navigate = useNavigate();

  const handlePostJob = () => {
    navigate('/job');
  };

  const handleSearchJobs = () => {
    navigate('/company');
  };

  return (
    <div className="homepage">
      {/* Carousel Section */}
      <section className="carousel">
        <div className="slide">Find Your Dream Job</div>
        <div className="slide">Hire Top Talent</div>
      </section>

      {/* Job Poster / Job Seeker Section */}
      <section className="user-section">
        <div className="job-poster">
          <h3>Are you a Job Poster?</h3>
          <p>Post jobs and connect with top candidates.</p>
          <button onClick={handlePostJob}>Post a Job</button>
        </div>
        <div className="job-seeker">
          <h3>Are you a Job Seeker?</h3>
          <p>Explore new opportunities tailored for you.</p>
          <button onClick={handleSearchJobs}>Search Jobs</button>
        </div>
      </section>

      {/* Job Cards Section */}
      <section className="job-cards">
        <h2>Latest Job Posts</h2>
        <div className="card-container">
          {jobPosts.map((job, index) => (
            <div className="card" key={index}>
              <h4>{job.title}</h4>
              <p><strong>{job.company}</strong></p>
              <p>{job.location}</p>
              <button>Apply Now</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;