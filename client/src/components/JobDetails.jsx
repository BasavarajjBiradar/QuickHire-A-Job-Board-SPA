import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './JobDetails.css';

const JobDetails = () => {
  const { id } = useParams(); // job id
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);

  // Get user ID from Redux
  const user = useSelector((state) => state.auth.user);

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
    console.log(id, user.id)
    fetchJob();
  }, [id, navigate]);

  const handleApply = async () => {
    const userId = user.id;

    if (!userId) {
      alert("You must be logged in to apply.");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/applications', {
        userid: userId,
        jobid: id,

      });
      console.log(res);
      console.log("djcndcn", userId, id);

      if (res.status === 201) {
        setApplied(true);
        setTimeout(() => {
          alert("✅ Application submitted successfully!");
        }, 500);
      }
    } catch (error) {
      if (error.response?.data?.error) {
        alert("❗ " + error.response.data.error);
        console.log(error.response.data.error);
      } else {
        console.error(error);
        alert("Something went wrong while applying.");
      }
    }
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
