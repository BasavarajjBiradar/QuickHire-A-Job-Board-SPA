import React, { useState } from 'react';
import './JobPost.css';

function JobPost() {
  const [jobData, setJobData] = useState({
    organization: '',
    title: '',
    location: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Job posted successfully!");
    console.log(jobData);
    // Future: send this to backend with fetch or axios
  };

  return (
    <div className="jobpost-container">
      <h2>Post a Job</h2>
      <form className="jobpost-form" onSubmit={handleSubmit}>
        <label>Organization Name</label>
        <input name="organization" required onChange={handleChange} />

        <label>Job Title</label>
        <input name="title" required onChange={handleChange} />

        <label>Location</label>
        <input name="location" required onChange={handleChange} />

        <label>Description</label>
        <textarea name="description" rows="5" required onChange={handleChange} />

        <button type="submit">Post Job</button>
      </form>
    </div>
  );
}

export default JobPost;
