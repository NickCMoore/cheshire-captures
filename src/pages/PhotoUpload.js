import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import { axiosReq } from '../api/axiosDefaults';
import styles from '../styles/PhotoUpload.module.css';

const PhotoUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);
    setError('');

    try {
      await axiosReq.post('/api/photos/photos/', formData);
      history.push('/gallery');
    } catch (error) {
      setError('Error uploading photo. Please try again.');
      console.error('Error uploading photo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className={styles.uploadContainer}>
      <h2 className={styles.blueHeading}>Upload a New Photo</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} required disabled={isLoading} />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" /> Uploading...
              </>
            ) : (
              'Upload Photo'
            )}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default PhotoUpload;
