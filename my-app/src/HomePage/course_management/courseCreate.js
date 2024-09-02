// src/components/CreateCourse.js
import React, { useState } from 'react';
import axiosInstance from '../../context/axiosInstance';

function CreateCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subheadings, setSubheadings] = useState([{ title: '', videos: null, documents: null }]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that all subheadings have a non-empty title
    if (subheadings.some(subheading => !subheading.title.trim())) {
      setError({ subheadings: [{ title: ['Title cannot be empty.'] }] });
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);

    subheadings.forEach((subheading, index) => {
      formData.append(`subheadings[${index}][title]`, subheading.title.trim());
      if (subheading.videos) {
        formData.append(`subheadings[${index}][videos]`, subheading.videos);
      }
      if (subheading.documents) {
        formData.append(`subheadings[${index}][documents]`, subheading.documents);
      }
    });

    try {
      const response = await axiosInstance.post('api/courses/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Course created successfully', response.data);
    } catch (error) {
      console.error('Error creating course', error.response.data);
      setError(error.response.data); // Capture and display the error message from the backend
    }
  };

  const handleSubheadingChange = (index, field, value) => {
    const newSubheadings = [...subheadings];
    newSubheadings[index][field] = value;
    setSubheadings(newSubheadings);
  };

  const addSubheading = () => {
    setSubheadings([...subheadings, { title: '', videos: null, documents: null }]);
  };

  const removeSubheading = (index) => {
    const newSubheadings = [...subheadings];
    newSubheadings.splice(index, 1);
    setSubheadings(newSubheadings);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Course</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      ></textarea>

      <h3>Subheadings</h3>
      {subheadings.map((subheading, index) => (
        <div key={index}>
          <input
            type="text"
            value={subheading.title}
            onChange={(e) => handleSubheadingChange(index, 'title', e.target.value)}
            placeholder="Subheading Title"
            required
          />
          <input
            type="file"
            onChange={(e) => handleSubheadingChange(index, 'videos', e.target.files[0])}
            placeholder="Videos"
          />
          <input
            type="file"
            onChange={(e) => handleSubheadingChange(index, 'documents', e.target.files[0])}
            placeholder="Documents"
          />
          {index > 0 && <button type="button" onClick={() => removeSubheading(index)}>Remove</button>}
        </div>
      ))}
      <button type="button" onClick={addSubheading}>Add Subheading</button>
      <button type="submit">Create Course</button>
      {error && error.subheadings && (
        <div>
          {error.subheadings.map((subheadingError, index) => (
            <p key={index}>Subheading {index + 1}: {subheadingError.title.join(', ')}</p>
          ))}
        </div>
      )}
    </form>
  );
}

export default CreateCourse;
