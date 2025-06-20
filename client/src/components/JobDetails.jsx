import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        if (res.data.success) {
          setJob(res.data.data);
        }
      } catch (err) {
        console.error(err);
        navigate('/'); // redirect if invalid job
      }
    };
    fetchJob();
  }, [id, navigate]);

  const handleApply = () => {
    setApplied(true);
    setTimeout(() => {
      alert("Application submitted successfully!");
    }, 500);
  };

  if (!job) return <div className="loading">Loading...</div>;

  return (
    <div className="job-details-container">
      <div className="job-details-card">
        <h1>{job.title}</h1>
        <h3>{job.Company}</h3>
        <p><strong>Location:</strong> {job.Location}</p>
        <p><strong>Description:</strong></p>
        <p className="desc-text">{job.Description}</p>

        <button
          className={`apply-button ${applied ? 'applied' : ''}`}
          onClick={handleApply}
          disabled={applied}
        >
          {applied ? '✅ Applied' : 'Apply Now'}
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
