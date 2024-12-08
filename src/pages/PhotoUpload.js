import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import { axiosReq } from '../api/axiosDefaults';
import styles from '../styles/PhotoUpload.module.css';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

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
      const file = event.target.files[0];
      const validTypes = ['image/jpeg', 'image/png'];

      // Check file type
      if (!validTypes.includes(file.type)) {
        setError('Please upload a valid image file (JPEG or PNG).');
        setImage(null); // Reset the image state if file is invalid
        return;
      }

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        setError('File size exceeds 10 MB. Please choose a smaller file.');
        setImage(null); // Reset the image state if file is too large
        return;
      }

      // Clear previous errors and update image preview
      setError('');
      setImage({
        ...image,
        image: URL.createObjectURL(file),
      });
    }
  };

  const handleChooseImage = () => {
    imageInput.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);

    if (imageInput?.current?.files[0]) {
      formData.append('image', imageInput.current.files[0]);
    }

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
            <input
              type="file"
              accept="image/*"
              ref={imageInput}
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <Button
              variant="secondary"
              onClick={handleChooseImage}
              disabled={isLoading}
              className="mb-3"
            >
              {image ? 'Change Image' : 'Choose an Image'}
            </Button>
            {image && (
              <p className="text-muted">{imageInput.current?.files[0]?.name}</p>
            )}
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
