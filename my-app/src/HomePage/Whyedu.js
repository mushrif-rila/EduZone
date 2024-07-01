import { Carousel, Typography} from "@material-tailwind/react";
import './HomePage.css';
import image1 from './images/self-learning.png';
import image2 from './images/skills.png';
import image3 from './images/grade.png';
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import { toBeDisabled } from "@testing-library/jest-dom/matchers";
 
function Whyedu() {
  return (
    <div className="Whyedu">
    <Fade direction="up" duration={2000}>
    <h1 className="heading">Why eduZone</h1>
    </Fade>
    <Zoom duration={2000}>
    <Carousel className="rounded-xl" id="slide" autoplay="True" loop="True">
      <div className="h-full w-full">
        <img
          src={image1}
          alt="self learning"
          className="h-full w-full object-cover"
        />
        <div className="inset-0 grid h-full w-full place-items-center bg-transparent">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="black"
              className="mb-4 text-3xl md:text-4xl lg:text-1xl"
              id="img-text"
            >
              For self Learning
            </Typography>
            <Typography
              variant="lead"
              color="black"
              className="mb-12 opacity-80"
              id="text"
            >
              <li>This institute offer unparalleled flexibility in terms of when and where you can study.</li> <br></br>
              <li>Typically give vast area of courses under variety of fields.</li> <br></br>
              <li>If you get a course once you can access any time.</li>
            </Typography>
            {/* <div className="flex justify-center gap-2">
              <Button size="lg" color="white">
                Explore
              </Button>
              <Button size="lg" color="white" variant="text">
                Gallery
              </Button>
            </div> */}
          </div>
        </div>
      </div>
      <div className="top h-full w-full">
        <img
          src={image2}
          alt="imrove skills"
          className="h-full w-full object-cover"
        />
        <div className="inset-0 grid h-full w-full place-items-center bg-transparent">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="black"
              className="mb-4 text-3xl md:text-4xl lg:text-1xl"
              id="img-text"
            >
              Improve skills
            </Typography>
            <Typography
              variant="lead"
              color="black"
              className="mb-12 opacity-80"
              id="text"
            >
              <li>This institute offer unparalleled flexibility in terms of when and where you can study.</li> <br></br>
              <li>Typically give vast area of courses under variety of fields.</li> <br></br>
              <li>If you get a course once you can access any time.</li>
            </Typography>
            {/* <div className="flex justify-center gap-2">
              <Button size="lg" color="white">
                Explore
              </Button>
              <Button size="lg" color="white" variant="text">
                Gallery
              </Button>
            </div> */}
          </div>
        </div>
      </div>
      <div className="top h-full w-full">
        <img
          src={image3}
          alt="achieve high grades"
          className="h-full w-full object-cover"
        />
        <div className="inset-0 grid h-full w-full place-items-center bg-transparent">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="black"
              className="mb-4 text-3xl md:text-4xl lg:text-1xl"
              id="img-text"
            >
              Achieve high grades
            </Typography>
            <Typography
              variant="lead"
              color="black"
              className="mb-12 opacity-80"
              id="text"
            >
              <li>This institute offer unparalleled flexibility in terms of when and where you can study.</li> <br></br>
              <li>Typically give vast area of courses under variety of fields.</li> <br></br>
              <li>If you get a course once you can access any time.</li>
            </Typography>
            {/* <div className="flex justify-center gap-2">
              <Button size="lg" color="white">
                Explore
              </Button>
              <Button size="lg" color="white" variant="text">
                Gallery
              </Button>
            </div> */}
          </div>
        </div>
      </div>
      
    </Carousel>
    </Zoom>
    </div>
  );
}

export default Whyedu;