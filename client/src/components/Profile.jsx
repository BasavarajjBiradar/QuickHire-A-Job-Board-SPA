import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './Navbar.css';
import './Profile.css';
function Profile() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
      return;
    }

    const fetchAppliedJobs = async () => {
      try {
        const userId = user?._id || user?.id;
        const res = await axios.get(`http://localhost:5000/api/applications/user/${userId}`);
        setAppliedJobs(res.data); // Adjust this based on backend response shape
        setLoading(false);
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [isLoggedIn, user, navigate]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">Welcome, {user?.name || 'User'}!</h1>
      </div>

      <div className="applied-jobs-section">
        <h2 className="section-title">Applied Jobs</h2>
        {appliedJobs.length === 0 ? (
          <p className="no-jobs">You have not applied to any jobs yet.</p>
        ) : (
          <div className="job-cards-wrapper">
            {appliedJobs.map((jobApp) => (
              <div key={jobApp._id} className="job-card">
                <h3 className="job-title">{jobApp.jobid?.title}</h3>
                <p className="job-company">{jobApp.jobid?.Company}</p>
                <p className="job-desc">{jobApp.jobid?.Description?.substring(0, 100)}...</p>
                <p className="job-date">
                  Applied on: {new Date(jobApp.appliedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;