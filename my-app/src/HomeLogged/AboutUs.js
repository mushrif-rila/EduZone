import React from 'react';
import image1 from './images/man.png';
import { Typography } from "@material-tailwind/react";
import { Fade, Slide, Zoom } from "react-awesome-reveal";

function AboutUs() {
  return (
    <div className='aboutus'>
      <Fade direction='up' duration={2000}>
      <h1 className='heading'>About Us</h1>
      </Fade>
      <Fade duration={2000}>
      <div className='content'>
      
        <div className='content-para'>
            
            <Typography
              variant="h1"
              color="black"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
              id="img-text"
            >
              Our tutors have more than 10 years of experience.
            </Typography>
            
            
            <li>Lorem ipsum dolor sit amet consectetur. Sapien nulla id risus vestibulum facilisi tincidunt urna mattis eu. Rutrum in sem leo nulla larem vestibulum nulla. Et id purus nibh lectus.</li>
        </div>
        
        <img className='content-image' src={image1} alt="people discussing" />
        
      </div>
      </Fade>
      
    </div>
  );
}

export default AboutUs;
