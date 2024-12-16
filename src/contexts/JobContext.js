import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobsCollection = collection(db, 'jobs');
      const jobSnapshot = await getDocs(jobsCollection);
      const jobList = jobSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJobs(jobList);
    };

    fetchJobs();
  }, []);

  const addJob = async (newJob) => {
    try {
      const docRef = await addDoc(collection(db, 'jobs'), {
        ...newJob,
        createdAt: new Date().toISOString()
      });
      setJobs(prev => [...prev, { id: docRef.id, ...newJob }]);
    } catch (error) {
      console.error('Error adding job: ', error);
    }
  };

  return (
    <JobContext.Provider value={{ jobs, addJob }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

export default JobContext;