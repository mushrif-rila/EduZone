// src/components/CourseDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../context/axiosInstance';

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await axiosInstance.get(`/courses/${id}/`);
      setCourse(response.data);
    };
    fetchCourse();
  }, [id]);

  if (!course) return <div>Loading...</div>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <div>
        <h3>Subheadings</h3>
        {course.subheadings.map(subheading => (
          <div key={subheading.id}>
            <h4>{subheading.title}</h4>
            <div>
              <h5>Videos</h5>
              <ul>
                {subheading.videos.map(video => (
                  <li key={video.id}>{video.title}</li>
                ))}
              </ul>
              <h5>Documents</h5>
              <ul>
                {subheading.documents.map(document => (
                  <li key={document.id}>{document.title}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseDetail;
