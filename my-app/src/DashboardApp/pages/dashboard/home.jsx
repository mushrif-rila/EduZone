import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
  Textarea,
  Button,
  Input
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "../../widgets/cards/index";
import { StatisticsChart } from "../../widgets/charts/index";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "../../data/index";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import Ibm from "../../../img/ibm.png"
import { useState, useEffect } from 'react';
import axios from 'axios';
import CourseUploadForm from "./CourseUploadForm";
import CourseList from "./CourseList";

export function Home() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subheadings, setSubheadings] = useState([{ title: '' }]);
  const [message, setMessage] = useState('');
  const [profile, setProfile] = useState({});
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/courses/');
        setCourses(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  const toggleCourseDetails = (courseId) => {
    setSelectedCourseId(selectedCourseId === courseId ? null : courseId);
  };

  const handleSubheadingChange = (index, event) => {
    const newSubheadings = subheadings.slice();
    newSubheadings[index][event.target.name] = event.target.value;
    setSubheadings(newSubheadings);
  };

  const handleAddSubheading = () => {
    setSubheadings([...subheadings, { title: '' }]);
  };

  const handleRemoveSubheading = (index) => {
    const newSubheadings = subheadings.slice();
    newSubheadings.splice(index, 1);
    setSubheadings(newSubheadings);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const courseData = {
      title,
      description,
      subheadings,
    };

    try {
      const authTokens = localStorage.getItem('authTokens'); 
      const tokens = JSON.parse(authTokens);
      const token = tokens.access;
      const response = await axios.post('http://localhost:8000/api/courses/', courseData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      setMessage('Course created successfully!');
      setTitle('');
      setDescription('');
      setSubheadings([{ title: '' }]);
    } catch (error) {
      console.error('Error creating course:', error);
      setMessage('Failed to create course.');
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const authTokens = localStorage.getItem('authTokens'); 
      const tokens = JSON.parse(authTokens);
      const token = tokens.access;

      const response = await fetch('http://localhost:8000/api/profile/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setLoading(false);
      } else {
        console.error('Failed to fetch profile');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;




  return (
    <>
    
    
    <div className="mt-12">
      {profile.role === 'teacher' ? (
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-1 xl:grid-cols-1">

        <CourseUploadForm />
    
        {/* <form onSubmit={handleSubmit}>
  
        <Card>
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="m-0 p-4"
          >
            <Typography variant="h5" color="blue-gray">
              Create Course
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4 p-4">
          
            
            <Input
            label="Title"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required>
            </Input>
            <Textarea
            label="description"
             name="description"
             value={description}
             onChange={(e) => setDescription(e.target.value)}
             required>
  
            </Textarea>
  
            <Typography variant="h6" color="blue-gray">
              Subheadings
            </Typography>
  
            {subheadings.map((subheading, index) => (
              <div key={index}>
                <Input
                label="Subheading Title"
                type="text"
                name="title"
                value={subheading.title}
                onChange={(e) => handleSubheadingChange(index, e)}
                required>
                </Input>
                <br />
                <Button
                type="button" onClick={() => handleRemoveSubheading(index)}>
                  Remove
                </Button>
                
              </div>
            ))}
  
            <Button type="button" onClick={handleAddSubheading}>
              Add Subheading
            </Button>
  
            
            <br />
            <Button type="submit" >
               Create Course
            </Button>
          
          </CardBody>
        </Card>
  
        </form> */}
          
        </div>
        ) : null}

        
    
        
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-1 xl:grid-cols-2">
      
        {courses.map((course) => (
          <StatisticsCard
            key={course.id}
            value={course.title}  
            // {...rest}
            title={course.description}
            icon={<img src={course.images[0].image} className="w-12 h-12"></img>}
            // footer={
            //   <Typography className="font-normal text-blue-gray-600">
            //     <strong className="gray">{course.subheadings.length}</strong>
            //     &nbsp;subheadings
            //   </Typography>
            // }
          />
        ))}
      </div> 
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Projects
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <CheckCircleIcon strokeWidth={3} className="h-4 w-4 text-blue-gray-200" />
                <strong>3 done</strong> this month
              </Typography>
            </div>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"
                  />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["name", "contributors", "technologies", "completion"].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-6 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {projectsTableData.map(
                  ({ img, name, members, budget, completion }, key) => {
                    const className = `py-3 px-5 ${
                      key === projectsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avatar src={img} alt={name} size="sm" />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {name}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          {members.map(({ img, name }, key) => (
                            <Tooltip key={name} content={name}>
                              <Avatar
                                src={img}
                                alt={name}
                                size="xs"
                                variant="circular"
                                className={`cursor-pointer border-2 border-white ${
                                  key === 0 ? "" : "-ml-2.5"
                                }`}
                              />
                            </Tooltip>
                          ))}
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {budget}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="w-10/12">
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                            >
                              {completion}%
                            </Typography>
                            <Progress
                              value={completion}
                              variant="gradient"
                              color={completion === 100 ? "green" : "blue"}
                              className="h-1"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
        <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Projects Overview
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <ArrowUpIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-green-500"
              />
              <strong>24%</strong> this month
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            {ordersOverviewData.map(
              ({ icon, color, title, description }, key) => (
                <div key={title} className="flex items-start gap-4 py-3">
                  <div
                    className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                      key === ordersOverviewData.length - 1
                        ? "after:h-0"
                        : "after:h-4/6"
                    }`}
                  >
                    {React.createElement(icon, {
                      className: `!w-5 !h-5 ${color}`,
                    })}
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      {title}
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      {description}
                    </Typography>
                  </div>
                </div>
              )
            )}
          </CardBody>
        </Card>
      </div>
    </div>
    </>
  );
}

export default Home;
