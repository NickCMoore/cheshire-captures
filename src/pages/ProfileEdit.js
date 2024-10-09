import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { Form, Button, Container } from 'react-bootstrap';
import styles from '../styles/ProfileEdit.module.css';

const ProfileEdit = () => {
  const { id } = useParams(); // Get the photographer's ID from the URL
  const history = useHistory();
  const [photographerData, setPhotographerData] = useState({
    display_name: '',
    bio: '',
    location: '',
    website: '',
    instagram: '',
    twitter: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotographer = async () => {
      try {
        const { data } = await axiosReq.get(`/api/photographers/photographers/${id}/`);
        setPhotographerData(data);
      } catch (error) {
        console.error('Error fetching photographer data:', error);
        setError('Could not fetch photographer data.');
      }
    };

    fetchPhotographer();
  }, [id]);

  const handleChange = (event) => {
    setPhotographerData({
      ...photographerData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/api/photographers/photographers/${id}/`, photographerData);
      history.push(`/profile/${id}`); 
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Could not update profile.');
    }
  };

  return (
    <Container className={styles.profileEditContainer}>
      <h2>Edit Profile</h2>
      {error && <p className="text-danger">{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="display_name">
          <Form.Label>Display Name</Form.Label>
          <Form.Control
            type="text"
            name="display_name"
            value={photographerData.display_name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="bio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="bio"
            value={photographerData.bio}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={photographerData.location}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="website">
          <Form.Label>Website</Form.Label>
          <Form.Control
            type="url"
            name="website"
            value={photographerData.website}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="instagram">
          <Form.Label>Instagram</Form.Label>
          <Form.Control
            type="url"
            name="instagram"
            value={photographerData.instagram}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="twitter">
          <Form.Label>Twitter</Form.Label>
          <Form.Control
            type="url"
            name="twitter"
            value={photographerData.twitter}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default ProfileEdit;
