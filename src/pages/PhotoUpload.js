import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import { axiosReq } from '../api/axiosDefaults';
import styles from '../styles/PhotoUpload.module.css';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const PhotoUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(''); // State for category
  const [image, setImage] = useState({ file: null, previewUrl: '' });
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
        setImage({ file: null, previewUrl: '' }); // Reset image state if file is invalid
        return;
      }

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        setError('File size exceeds 10 MB. Please choose a smaller file.');
        setImage({ file: null, previewUrl: '' }); // Reset image state if file is too large
        return;
      }

      // Clear previous errors and update image preview
      setError('');
      setImage({
        file,
        previewUrl: URL.createObjectURL(file), // Set preview URL for the selected file
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
    formData.append('category', category); // Append category to form data

    if (image.file) {
      formData.append('image', image.file);
    }

    setIsLoading(true);
    setError(''); // Reset errors before submitting

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

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              disabled={isLoading}
            >
              <option value="">Select a category</option>
              <option value="Nature">Nature</option>
              <option value="Urban">Urban</option>
              <option value="Portrait">Portrait</option>
              <option value="Event">Event</option>
              <option value="Landscape">Landscape</option>
            </Form.Control>
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
              {image.previewUrl ? 'Change Image' : 'Choose an Image'}
            </Button>
            {image.previewUrl && (
              <div className="mb-3">
                <img
                  src={image.previewUrl}
                  alt="Selected"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  className="mb-2"
                />
                <p className="text-muted">{image.file.name}</p>
              </div>
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
