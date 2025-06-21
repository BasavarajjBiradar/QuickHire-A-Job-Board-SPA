import React, { useState } from 'react';
import './JobPost.css';
import { useSelector } from 'react-redux';


function JobPost() {
  const [jobData, setJobData] = useState({
    organization: '',
    title: '',
    location: '',
    description: '',
  });
  const user = useSelector((state) => state.auth.user);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  //   const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const token = localStorage.getItem('token'); // or wherever you store JWT

  //   const jobPayload = {
  //     Company: jobData.organization,
  //     title: jobData.title,
  //     Location: jobData.location,
  //     Description: jobData.description,
  //   };

  //   try {
  //     const response = await fetch('http://localhost:5000/api/jobs', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(jobPayload),
  //     });

  //     const result = await response.json();
  //     if (response.ok) {
  //       alert("Job posted successfully!");
  //       console.log(result.data);
  //     } else {
  //       alert("PLease login as recruiter");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("Error posting job");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!user || !user.roles || !user.roles.includes('recruiter')) {
      alert('You are not authorized to post a job. Please login as a recruiter.');
      return;
    }

    const jobPayload = {
      Company: jobData.organization,
      title: jobData.title,
      Location: jobData.location,
      Description: jobData.description,
    };

    try {
      const response = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobPayload),
      });

      const result = await response.json();
      if (response.ok) {
        alert(" Job posted successfully!");
        console.log(result.data);
      } else {
        alert(result.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error posting job");
    }
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
