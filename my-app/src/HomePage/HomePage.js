import React, {useContext, useState} from 'react';
import './HomePage.css';
import Header from './Header';
import Home from './Home';
import Whyedu from './Whyedu'; 
import AboutUs from './AboutUs';
import Footer from './Footer';





function LogoutHomePage() {
  
  return (
    
    <div className="homepage">
      
      <Header />
      <Home />
      <Whyedu/>
      <AboutUs />
      <Footer />
    </div>
    
  );
}

export default LogoutHomePage;
