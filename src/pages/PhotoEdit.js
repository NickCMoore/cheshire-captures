import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import styles from '../styles/PhotoEdit.module.css';

const PhotoEdit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const history = useHistory();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const { data } = await axiosReq.get(`/api/photos/photos/${id}/`);
        setTitle(data.title);
        setDescription(data.description);
        setImageUrl(data.image_url);
      } catch (error) {
        console.error('Error fetching photo:', error);
        setError('Unable to fetch photo details. Please try again later.');
      }
    };

    fetchPhoto();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosReq.put(`/api/photos/photos/${id}/`, {
        title,
        description,
      });
      history.push(`/photos/${id}`);
    } catch (error) {
      console.error('Error updating photo:', error);
      setError('Failed to update photo. Please try again.');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this photo?');
    if (!confirmDelete) return;

    try {
      await axiosRes.delete(`/api/photos/photos/${id}/`);
      history.push('/my-photos');
    } catch (error) {
      console.error('Error deleting photo:', error);
      setError('Failed to delete photo. Please try again.');
    }
  };

  return (
    <Container fluid className="d-flex vh-100 justify-content-center align-items-center">
      <div className={`${styles.editContainer} p-5 shadow-lg`}>
        <h2 className="mb-4">Edit Photo</h2>
        {error && <p className={styles.error}>{error}</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mb-3"
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
              className="mb-3"
            />
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Current Image</Form.Label>
            <div className={styles.imageWrapper}>
              <img src={imageUrl} alt={title} className={styles.imagePreview} />
            </div>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-3">
            Save Changes
          </Button>

          <Button variant="danger" className="w-100" onClick={handleDelete}>
            Delete Photo
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default PhotoEdit;
