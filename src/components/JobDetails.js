import React, { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import '../styles/DisplayJobsPage.css';

const JobDetails = ({ job, onClose }) => {
  const [companyInfo, setCompanyInfo] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const processCompanyInfo = async () => {
      if (job.companyDescription) {
        setLoading(true);
        try {
          const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
          const model = genAI.getGenerativeModel({ model: "gemini-pro" });
          
          const prompt = `Summarize the following content about company culture and work environment in 200 words: ${job.companyDescription}`;
          const result = await model.generateContent(prompt);
          setCompanyInfo(result.response.text());
        } catch (error) {
          console.error('Error processing company info:', error);
          setCompanyInfo(job.companyDescription);
        }
        setLoading(false);
      }
    };

    processCompanyInfo();
  }, [job.companyDescription]);

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

        {job.companyDescription && (
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
          <p>Posted by: {job.userName}</p>
          <button className="apply-button" onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;