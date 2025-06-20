import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import axios from 'axios';

const HomePage = () => {
  const [latestJobs, setLatestJobs] = useState([]);
  const navigate = useNavigate();
  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/jobs');
      const jobsArray = res.data.data || res.data; // depending on structure
      console.log('API response:', res.data);


      if (Array.isArray(jobsArray)) {
        const sorted = jobsArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setLatestJobs(sorted.slice(0, 3));
      } else {
        console.error('Unexpected response format:', res.data);
      }
    } catch (error) {
      console.error('Error fetching job posts:', error);
    }
  };


  useEffect(() => {
    fetchJobs();
  }, []);

  const handlePostJob = () => {
    navigate('/jobpost');
  };

  const handleSearchJobs = () => {
    navigate('/job');
  };

  const handleViewAll = () => {
    navigate('/job');
  };

  return (
    <div className="homepage">
      {/* Carousel Section */}
      <section className="carousel">
        <div className="slide">Find Your Dream Job</div>
        <div className="slide">Hire Top Talent</div>
      </section>

      {/* Job Poster / Seeker */}
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

      {/* Latest Jobs from DB */}
      <section className="job-cards">
        <h2>Latest Job Posts</h2>
        <div className="card-container">
          {latestJobs.map((job) => (
            <div className="card" key={job._id}>
              <h4>{job.title}</h4>
              <p><strong>{job.Company}</strong></p>
              <p>{job.Location}</p>
              <button onClick={() => navigate(`/job/${job._id}`)}>Apply Now</button>
            </div>
          ))}
        </div>
        <button className="view-all-btn" onClick={() => navigate('/job')}>
          View All Jobs
        </button>
      </section>

    </div>
  );
};

export default HomePage;
