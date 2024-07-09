import React, {useContext, useState} from 'react';
import './HomePage.css';
import Header from './Header';
import Footer from './Footer';
import Block1 from './loggedin_page/Block1';
import Faqs4 from './loggedin_page/FAQ.js';
import Courses from './loggedin_page/Courses-section/Courses.jsx';
import OnCourse from './loggedin_page/Ongoing-course-section/OnCourse.jsx';
import Category from './loggedin_page/Category.jsx';
import Projects from './loggedin_page/Projects.jsx';


function LoggedHomePage() {
  
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

export default LoggedHomePage;
