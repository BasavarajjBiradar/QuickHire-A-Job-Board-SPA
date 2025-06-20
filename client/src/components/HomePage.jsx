import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import axios from 'axios';

const HomePage = () => {
  const [latestJobs, setLatestJobs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      text: "Find Your Dream Job",
      img: "/assets/slides/slider-1.jpg"
    },
    {
      text: "Hire Top Talent",
      img: "/assets/slides/slider-2.jpg"
    },
    {
      text: "Apply Anywhere, Anytime",
      img: "/assets/slides/slider-3.jpg"
    },
    {
      text: "Be a Employed Person",
      img: "/assets/slides/slider-4.jpg"
    }
  ];

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/jobs');
      const jobsArray = res.data.data || res.data;
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

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const handlePostJob = () => navigate('/jobpost');
  const handleSearchJobs = () => navigate('/jobs');
  const handleViewAll = () => navigate('/jobs');

  return (
    <div className="homepage">
      {/* ✅ Carousel Section */}
      <section className="carousel">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            <div className="overlay">
              <h2>{slide.text}</h2>
            </div>
          </div>
        ))}
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

      {/* Latest Jobs */}
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
        <button className="view-all-btn" onClick={handleViewAll}>
          View All Jobs
        </button>
      </section>
    </div>
  );
};

export default HomePage;
