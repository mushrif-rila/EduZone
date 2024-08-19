import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@material-tailwind/react';

const EnrollButton = ({ courseId }) => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to check enrollment status
  const checkEnrollment = async () => {
    try {
      const authTokens = localStorage.getItem('authTokens');
      const tokens = JSON.parse(authTokens);
      const token = tokens.access;

      const response = await axios.get(`http://localhost:8000/api/courses/${courseId}/`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      setIsEnrolled(response.data.is_enrolled);
      setLoading(false);
    } catch (error) {
      console.error('Error checking enrollment status:', error);
      setError('Failed to check enrollment status');
      setLoading(false);
    }
  };

  // Function to handle enrollment
  const handleEnroll = async () => {
    try {
      const authTokens = localStorage.getItem('authTokens');
      const tokens = JSON.parse(authTokens);
      const token = tokens.access;

      await axios.post(`http://localhost:8000/api/courses/${courseId}/enroll/`, {}, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      setIsEnrolled(true);
    } catch (error) {
      console.error('Error enrolling in course:', error);
      setError('Failed to enroll in the course');
    }
  };

  useEffect(() => {
    checkEnrollment();
  }, [courseId]);

  if (loading) {
    return <button>Loading...</button>;
  }

  return (
    <div>
      {isEnrolled ? (
        <Button>Continue</Button>
      ) : (
        <Button onClick={handleEnroll}>Enroll</Button>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default EnrollButton;
