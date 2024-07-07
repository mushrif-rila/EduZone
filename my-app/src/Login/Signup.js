import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import './login-signup.css';
import AuthContext from "../context/AuthContext"

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [full_name, setFull_name] = useState("")
  const [username, setUsername] = useState("")
  const [password2, setPassword2] = useState("")
  const [institute, setInstitute] = useState("")
  const {registerUser} = useContext(AuthContext)

  const [isTeacher, setIsTeacher] = useState(false)

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'teacher') {
      setIsTeacher(true);
    }
  }, []);

  const role = localStorage.getItem('role');
  const instituteValue = isTeacher ? institute : 'not given';

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(full_name)
    console.log(email)
    console.log(username)
    console.log(instituteValue)

    registerUser(full_name, email, username, password, password2, role, instituteValue)
    localStorage.removeItem('role')
  }

  return (
    
      <form action="#" className="mx-auto max-w-[24rem] text-left" onSubmit={handleSubmit} id="card">
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              EduZone
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Full Name" size="lg" name='full_name' onChange={(e) => setFull_name(e.target.value)} />
            <Input label="Email" size="lg" name='email' onChange={(e) => setEmail(e.target.value)} />
            {isTeacher && <Input label="Institute Name" size="lg" name='institute' onChange={(e) => setInstitute(e.target.value)} />}
            <Input label="Username" size="lg" name='username' onChange={(e) => setUsername(e.target.value)} />
            <Input label="Password" type="password" size="lg" name='password' onChange={(e) => setPassword(e.target.value)} />
            <Input label="Confirm Password" type="password" size="lg" name='password2' onChange={(e) => setPassword2(e.target.value)} />
            
          </CardBody>
          <CardFooter className="pt-0 flex flex-col gap-4">
           
            <Button variant="gradient" fullWidth type="submit">
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                onClick={() => navigate('/login')}
              >
                Sign in
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </form>
   
  );
}

export default Signup;
