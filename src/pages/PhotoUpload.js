import React, { useRef, useState } from 'react';
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

  const imageInput = useRef(null);


  const handleImageChange = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setImage({
        ...image,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', imageInput.current.files[0]);

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
            <Form.Label className="d-none">Choose an Image</Form.Label>
              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleImageChange}
                ref={imageInput}
                className="w-100 mb-3"
              disabled={isLoading}
              />
              {/* {image ? image.name : 'Choose an Image'} */}
          </Form.Group>

          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" /> Saving...
              </>
            ) : (
              'Save Photo'
            )}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default PhotoUpload;
