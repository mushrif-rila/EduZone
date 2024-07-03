import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";

  import { useState } from "react";

  import { useNavigate } from "react-router-dom";
   
  function RoleSelector() {
    const navigate = useNavigate();
    // const [role, setRole] = useState("student");
    const handleTeacherClick = () => {
        localStorage.setItem('role', "teacher");
        console.log(localStorage.getItem('role'));
        navigate("/signup");
      };

    const handleStudentClick = () => { 
        localStorage.setItem('role', "student");
        console.log(localStorage.getItem('role'));
        navigate("/signup");
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen p-2">
      <Card className="w-full flex flex-col md:flex-row" id="card">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-full shrink-0 rounded-r-none lg:w-2/5"
        >
          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRlYWNoaW5nfGVufDB8fDB8fHww"
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h6" color="gray" className="mb-4 uppercase">
            Get Started
          </Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            The Future of Education: The Intersection of Technology and Education
          </Typography>
          <Typography color="gray" className="mb-8 font-normal">
          Welcome to EduZone, where the future of education is being redefined through the power of technology. As digital tools become an integral part of learning, we're committed to providing personalized, engaging, and accessible educational experiences for all. Join us at the forefront of this educational revolution and prepare for a brighter, more connected future.
          </Typography>
          <div className="inline-block">
            <Button variant="text" size="sm" color="blue-gray" onClick={handleStudentClick}>
              Student
            </Button>
            <Button variant="gradient" size="sm" onClick={handleTeacherClick}>
              Teacher
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
    );
  }

  export default RoleSelector;