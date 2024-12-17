import React, { useEffect, useState } from 'react';
import { getCompanyInfo } from '../services/companyInfoService';
import '../styles/DisplayJobsPage.css';

const JobDetails = ({ job, onClose }) => {
  const [companyInfo, setCompanyInfo] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      if (job.aboutLink) {
        setLoading(true);
        const info = await getCompanyInfo(job.aboutLink);
        setCompanyInfo(info);
        setLoading(false);
      }
    };

    fetchCompanyInfo();
  }, [job.aboutLink]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains('job-details-overlay')) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleApply = () => {
    if (job.applyLink) {
      window.open(job.applyLink, '_blank');
    }
  };

  return (
    <div className="job-details-overlay">
      <div className="job-details-container">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        
        <div className="job-header">
          <div className="company-info">
            <div className="company-logo">
              {job.companyName?.charAt(0) || 'C'}
            </div>
            <div className="company-details">
              <h2>{job.title}</h2>
              <p className="company-name">{job.companyName}</p>
            </div>
          </div>
        </div>

        <div className="job-meta">
          <div className="meta-item">
            <span className="meta-label">Location</span>
            <span className="meta-value">{job.location}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Employment Type</span>
            <span className="meta-value">{job.employmentType}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Work Type</span>
            <span className="meta-value">{job.workType}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Experience Level</span>
            <span className="meta-value">{job.userType}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Domain</span>
            <span className="meta-value">{job.domain}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Salary Range</span>
            <span className="meta-value">{job.salaryRange}</span>
          </div>
        </div>

        <div className="job-description">
          <h3>Job Description</h3>
          <p>{job.description}</p>
        </div>

        {job.aboutLink && (
          <div className="company-culture-section">
            <h3>Company Culture & Work Life</h3>
            {loading ? (
              <div className="loader"></div>
            ) : (
              <div className="company-culture-content">
                {companyInfo || "No information available"}
              </div>
            )}
          </div>
        )}

        <div className="job-footer">
          <p>Posted by: {job.createdBy || 'Anonymous'}</p>
          <button className="apply-button" onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;