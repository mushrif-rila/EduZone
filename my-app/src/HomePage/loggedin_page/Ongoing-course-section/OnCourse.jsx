import React from "react";
import { Container, Row, Col } from "reactstrap";
import courseImg01 from "../images/web-development.png";
import courseImg02 from "../images/kids-learning.png";
import courseImg03 from "../images/seo.png";
import courseImg04 from "../images/ui-ux.png";
import OnCourseCard from "./OnCourseCard.jsx";
import axios from "axios";
import { useState, useEffect } from "react";
import EnrollButton from "./EnrollButton.js";

import "./On-course.css";

const freeCourseData = [
  {
    id: "01",
    title: "Basic Web Development Course",
    imgUrl: courseImg01,
    students: 5.3,
    rating: 1.7,
  },
  {
    id: "02",
    title: "Coding for Junior Basic Course",
    imgUrl: courseImg02,
    students: 5.3,
    rating: 1.7,
  },

  {
    id: "03",
    title: "Search Engine Optimization - Basic",
    imgUrl: courseImg03,
    students: 5.3,
    rating: 1.7,
  },

  {
    id: "04",
    title: "Basic UI/UX Design - Figma",
    imgUrl: courseImg04,
    students: 5.3,
    rating: 1.7,
  },
];

const headingStyles = {
  fontSize: '2rem',
  lineHeight: '50px',
  fontFamily: '"Poppins", sans-serif',
  color: '#0a2b1e',
  fontWeight: 600,
};

const OnCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const authTokens = localStorage.getItem('authTokens'); 
        const tokens = JSON.parse(authTokens);
        const token = tokens.access;
        const response = await axios.get('http://localhost:8000/api/courses/', 
          {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
        );
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching courses.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);
  return (
    <section style={{ marginTop: '100px' }}>
      <Container>
        <Row>
          <Col lg="12" className="text-center mb-5">
            <h2 style={headingStyles}>Ongoing Courses</h2>
          </Col>

          {courses.map((item) => (
            <Col lg="3" md="4" className="mb-4" key={item.id}>
              <OnCourseCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default OnCourse;
