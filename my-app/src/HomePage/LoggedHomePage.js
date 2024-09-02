import React, {useContext, useState, useEffect} from 'react';
import './HomePage.css';
import Header from './Header';
import Footer from './Footer';
import Block1 from './loggedin_page/Block1';
import Faqs4 from './loggedin_page/FAQ.js';
import Courses from './loggedin_page/Courses-section/Courses.jsx';
import OnCourse from './loggedin_page/Ongoing-course-section/OnCourse.jsx';
import Category from './loggedin_page/Category.jsx';
import Projects from './loggedin_page/Projects.jsx';
import CreateCourse from './course_management/courseCreate.js';
import Enrollment from './course_management/enrolment.js';
import axiosInstance from '../context/axiosInstance.js';
import Home from './Home.js';
import TeacherHome from './TeacherHome.js';
import CarouselCard from './Caroseal.js';


function LoggedHomePage() {

  const [profile, setProfile] = useState({
    full_name: '',
    bio: '',
    verified: false,
    role: '',
    institute: '',
    profile_username: '',
    profile_email: '',
    profile_img: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/api/profile/');
        setProfile(response.data);
        localStorage.setItem('role', profile.role);
        
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const role = profile.role;

  
  return (
    <div className="homepage">
      {role === 'teacher' && <CarouselCard/>}
      {/* {profile.profile_img.profile_img ? (<Header profile_img={profile.profile_img.profile_img }/>) : (<Header profile_img="https://docs.material-tailwind.com/img/face-2.jpg"/>)} */}
      {profile.profile_img !== null && <Header profile_img={profile.profile_img.profile_img }/>}
      {profile.profile_img === null && <Header profile_img="https://docs.material-tailwind.com/img/face-2.jpg"/>}
      {/* {role === 'teacher' && <TeacherHome/>} */}
      {role !== 'teacher' && <OnCourse/>}
      {/* {role === 'teacher' && <CreateCourse />}
      {role === 'student' && <Enrollment />} */}
      {role !== 'teacher' && <Courses/>}
      {/* <Category/> */}
      {/* <Projects/> */}
      <Block1/>
      <Faqs4/>
      <Footer />
      
    </div>
    
  );
}

export default LoggedHomePage;
