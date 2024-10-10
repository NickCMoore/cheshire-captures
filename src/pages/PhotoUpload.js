import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { axiosReq } from '../api/axiosDefaults';
import styles from '../styles/PhotoUpload.module.css';

const PhotoUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const history = useHistory();

  const handleImageChange = (event) => {
    if (event.target.files.length) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    try {
      await axiosReq.post('/api/photos/photos/', formData);
      history.push('/gallery');
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  return (
    <Container className={styles.uploadContainer}>
      <h2>Upload a New Photo</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} required />
        </Form.Group>

        <Button variant="primary" type="submit">
          Upload Photo
        </Button>
      </Form>
    </Container>
  );
};

export default PhotoUpload;
