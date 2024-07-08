import React, {useContext, useState} from 'react';
import './HomePage.css';
import Header from './Header';
import Footer from './Footer';
import Block1 from './Block1';
import Faqs4 from './FAQ.js';
import Courses from './Courses-section/Courses.jsx';
import OnCourse from './Ongoing-course-section/OnCourse.jsx';
import Category from './Category.jsx';
import Projects from './Projects.jsx';


function HomePage() {
  
  return (
    
    <div className="homepage">
      
      <Header />
      <OnCourse/>
      <Courses/>
      <Category/>
      <Projects/>
      <Block1/>
      <Faqs4/>
      <Footer />
    </div>
    
  );
}

export default HomePage;
