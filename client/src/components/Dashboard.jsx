// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Dashboard.css';

// function Dashboard() {
//   const navigate = useNavigate();
//   const { isLoggedIn, user } = useSelector((state) => state.auth);
//   const [jobs, setJobs] = useState([]);
//   const [selectedJobId, setSelectedJobId] = useState(null);
//   const [applicants, setApplicants] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // 1. Check login
//   useEffect(() => {
//     if (!isLoggedIn || !user?.roles?.includes('recruiter')) {
//       navigate('/');
//     }
//   }, [isLoggedIn, user, navigate]);

//   // 2. Fetch jobs posted by recruiter
//   useEffect(() => {
//     const fetchPostedJobs = async () => {
//       try {
//         const recruiterId = user?._id || user?.id;
//         const res = await axios.get(`http://localhost:5000/api/jobs/recruiter/${recruiterId}`);
//         setJobs(res.data.data);
//       } catch (error) {
//         console.error("Error fetching recruiter jobs:", error);
//       }
//     };
//     fetchPostedJobs();
//   }, [user]);

//   // 3. Fetch applicants for a job
//   const fetchApplicants = async (jobId) => {
//     try {
//       setSelectedJobId(jobId);
//       const res = await axios.get(`http://localhost:5000/api/applications/job/${jobId}`);
//       setApplicants(res.data.data);
//     } catch (error) {
//       console.error("Error fetching applicants:", error);
//       setApplicants([]);
//     }
//   };

//   // 4. Update application status
//   const handleStatusChange = async (appId, newStatus) => {
//     try {
//       await axios.put(`http://localhost:5000/api/applications/${appId}/status`, {
//         status: newStatus,
//       });
//       fetchApplicants(selectedJobId); // Refresh list
//     } catch (err) {
//       console.error("Error updating status:", err);
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-header">
//         <h1 className="dashboard-title">Recruiter Dashboard</h1>
//       </div>

//       <div className="dashboard-content">
//         <h2 className="dashboard-subtitle">Your Posted Jobs</h2>
//         {jobs.length === 0 ? (
//           <p className="no-jobs">You haven't posted any jobs yet.</p>
//         ) : (
//           <div className="job-table-wrapper">
//             <table className="job-table">
//               <thead>
//                 <tr>
//                   <th>Title</th>
//                   <th>Company</th>
//                   <th>Location</th>
//                   <th>Description</th>
//                   <th>Posted On</th>
//                   <th>Applicants</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {jobs.map((job) => (
//                   <tr key={job._id}>
//                     <td>{job.title}</td>
//                     <td>{job.Company}</td>
//                     <td>{job.Location}</td>
//                     <td>{job.Description.slice(0, 40)}...</td>
//                     <td>{new Date(job.createdAt).toLocaleDateString()}</td>
//                     <td>
//                       <button onClick={() => fetchApplicants(job._id)}>View</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {selectedJobId && (
//           <>
//             <h3 className="dashboard-subtitle">Applicants for Selected Job</h3>
//             {applicants.length === 0 ? (
//               <p>No applicants for this job.</p>
//             ) : (
//               <table className="job-table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Status</th>
//                     <th>Applied At</th>
//                     <th>Update Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {applicants.map((app) => (
//                     <tr key={app._id}>
//                       <td>{app.userid.name}</td>
//                       <td>{app.userid.email}</td>
//                       <td>
//                         <span
//                           className={`status-badge ${app.status}`}
//                           style={{
//                             color:
//                               app.status === 'accepted'
//                                 ? 'green'
//                                 : app.status === 'rejected'
//                                 ? 'red'
//                                 : 'orange',
//                             fontWeight: 'bold',
//                           }}
//                         >
//                           {app.status}
//                         </span>
//                       </td>
//                       <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
//                       <td>
//                         <select
//                           value={app.status}
//                           onChange={(e) => handleStatusChange(app._id, e.target.value)}
//                         >
//                           <option value="pending">Pending</option>
//                           <option value="accepted">Accepted</option>
//                           <option value="rejected">Rejected</option>
//                         </select>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. Check if logged in and recruiter
  useEffect(() => {
    if (!isLoggedIn || !user?.roles?.includes('recruiter')) {
      navigate('/');
    }
  }, [isLoggedIn, user, navigate]);

  // 2. Fetch jobs posted by this recruiter
  useEffect(() => {
    const fetchPostedJobs = async () => {
      try {
        const recruiterId = user?._id || user?.id;
        const res = await axios.get(`http://localhost:5000/api/jobs/recruiter/${recruiterId}`);
        setJobs(res.data.data);
      } catch (error) {
        console.error("Error fetching recruiter jobs:", error);
      }
    };
    fetchPostedJobs();
  }, [user]);

  // 3. Fetch all applications by recruiter and filter by job
  const fetchApplicants = async (jobId) => {
    try {
      setLoading(true);
      setSelectedJobId(jobId);
      const recruiterId = user._id || user.id;
      const res = await axios.get(`http://localhost:5000/api/applications/recruiter/${recruiterId}`);
      const allApplications = res.data.data;
      const filtered = allApplications.filter(app => app.jobid._id === jobId);
      setApplicants(filtered);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching applicants:", error);
      setApplicants([]);
      setLoading(false);
    }
  };

  // 4. Update application status
  const handleStatusChange = async (appId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/applications/${appId}/status`, {
        status: newStatus,
        recruiterId: user._id || user.id,
      });
      fetchApplicants(selectedJobId); // Refresh applicants
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Recruiter Dashboard</h1>
      </div>

      <div className="dashboard-content">
        <h2 className="dashboard-subtitle">Your Posted Jobs</h2>
        {jobs.length === 0 ? (
          <p className="no-jobs">You haven't posted any jobs yet.</p>
        ) : (
          <div className="job-table-wrapper">
            <table className="job-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Description</th>
                  <th>Posted On</th>
                  <th>Applicants</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id}>
                    <td>{job.title}</td>
                    <td>{job.Company}</td>
                    <td>{job.Location}</td>
                    <td>{job.Description.slice(0, 40)}...</td>
                    <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => fetchApplicants(job._id)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedJobId && (
          <>
            <h3 className="dashboard-subtitle">Applicants for Selected Job</h3>
            {loading ? (
              <p>Loading applicants...</p>
            ) : applicants.length === 0 ? (
              <p>No applicants for this job.</p>
            ) : (
              <table className="job-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Applied At</th>
                    <th>Update Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applicants.map((app) => (
                    <tr key={app._id}>
                      <td>{app.userid.name}</td>
                      <td>{app.userid.email}</td>
                      <td>
                        <span
                          className={`status-badge ${app.status}`}
                          style={{
                            color:
                              app.status === 'accepted'
                                ? 'green'
                                : app.status === 'rejected'
                                  ? 'red'
                                  : 'orange',
                            fontWeight: 'bold',
                          }}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                      <td>
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusChange(app._id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="accepted">Accepted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;






