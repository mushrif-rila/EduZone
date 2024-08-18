import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody, Typography, Input, Textarea, Button } from '@material-tailwind/react';

const CourseUploadForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loading

    let formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);

    files.forEach(file => formData.append('files', file));
    images.forEach(image => formData.append('images', image));
    videos.forEach(video => formData.append('videos', video));

    for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

    try {
      const response = await axios.post('http://localhost:8000/api/courses/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Course uploaded:', response.data);
      setUploadStatus('Upload successful!');
    } catch (error) {
      console.error(error);
      setUploadStatus('Error uploading course.');
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
     <form onSubmit={handleSubmit}>
  
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
  
            {/* <Typography variant="h6" color="blue-gray">
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
            </Button> */}
            <Input
            label="Related Documents"
            type="file"
            name="douments"
            multiple
            onChange={(e) => setFiles([...e.target.files])}
            accept=".doc,.pdf,.ppt"
            >
            </Input>

            <Input
            label="Thubnail"
            type="file"
            name="images"
            multiple
            onChange={(e) => setImages([...e.target.files])}
            accept="image/*"
            >
            </Input>

            <Input
            label="Videos"
            type="file"
            name="videos"
            multiple
            onChange={(e) => setVideos([...e.target.files])}
            accept="video/*"
            >
            </Input>
  
            
            <br />
            <Button type="submit" disabled={loading}>
              {loading ? 'Uploading...' : 'Create Course'}
            </Button>

            {loading && <p>Uploading... Please wait.</p>}
            {uploadStatus && <p>{uploadStatus}</p>}
          
          </CardBody>
        </Card>
  
        </form> 
    // <form onSubmit={handleSubmit}>
    //   <input
    //     type="text"
    //     value={title}
    //     onChange={(e) => setTitle(e.target.value)}
    //     placeholder="Course Title"
    //     required
    //   />
    //   <textarea
    //     value={description}
    //     onChange={(e) => setDescription(e.target.value)}
    //     placeholder="Course Description"
    //     required
    //   />
    //   <input
    //     type="file"
    //     multiple
    //     onChange={(e) => setFiles([...e.target.files])}
    //     accept=".doc,.pdf,.ppt"
    //   />
    //   <input
    //     type="file"
    //     multiple
    //     onChange={(e) => setImages([...e.target.files])}
    //     accept="image/*"
    //   />
    //   <input
    //     type="file"
    //     multiple
    //     onChange={(e) => setVideos([...e.target.files])}
    //     accept="video/*"
    //   />
    //   <button type="submit" disabled={loading}>
    //     {loading ? 'Uploading...' : 'Upload Course'}
    //   </button>

    //   {/* Loading or Status Message */}
    //   {loading && <p>Uploading... Please wait.</p>}
    //   {uploadStatus && <p>{uploadStatus}</p>}
    // </form>
  );
};

export default CourseUploadForm;
