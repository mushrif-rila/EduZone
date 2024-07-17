// src/components/Enrollment.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../context/axiosInstance';

function Enrollment() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await axiosInstance.get('/courses/');
      setCourses(response.data);
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      await axiosInstance.post('/enrollments/', { course: courseId });
      const response = await axiosInstance.get('/enrollments/');
      setEnrolledCourses(response.data);
    } catch (error) {
      console.error('Error enrolling in course', error);
    }
  };

  return (
    <div>
      <h2>Available Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            {course.title}
            <button onClick={() => handleEnroll(course.id)}>Enroll</button>
          </li>
        ))}
      </ul>
      <h2>Enrolled Courses</h2>
      <ul>
        {enrolledCourses.map(course => (
          <li key={course.id}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Enrollment;
