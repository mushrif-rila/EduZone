import React from "react";
import "./HomePage.css";
import moto_image from './images/moto_image.png'
import { Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import ButtonComp from '../Components/Button';
import { Fade} from "react-awesome-reveal";


function Home() {
  return (
    <section className="moto">

      <div className="moto-content">
        <Typography
              variant="h1"
              color="black"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
              id="img-text"
            >
            <Fade duration={2000} direction="down">PLATFORM FOR PROVIDING QUALITY EDUCATION</Fade>
            </Typography>
            <Typography
              variant="h6"
              color="gray"
              className="mb-4 text-0.1xl md:text-0.5xl lg:text-xl"
              id="img-text-para"
            >
            
            <Fade duration={2000} direction="down">Education is the passport to the future, for tomorrow belongs to those who prepare for it today.</Fade>
            </Typography>

            <Fade duration={2000} direction="up">
  
            <div className="flex w-max gap-8" id="signlog">
              <ButtonComp to="/role">
                <Button variant="gradient" size="lg">SignUp</Button>
              </ButtonComp>
              <ButtonComp to="/Login">
                <Button variant="outlined" size="lg">Login</Button>
              </ButtonComp>
            </div>

            </Fade>


      </div>
      <Fade duration={3000}>
        <img src={moto_image} alt="moto" className="image hidden lg:block"/>
      </Fade>
      
      
        
    </section>
  );
}

export default Home;
