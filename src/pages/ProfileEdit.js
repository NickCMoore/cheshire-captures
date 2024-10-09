import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import styles from '../styles/ProfileEdit.module.css';

const ProfileEdit = () => {
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const history = useHistory();
  const [profileData, setProfileData] = useState({
    display_name: '',
    bio: '',
    website: '',
    instagram: '',
    twitter: '',
  });
  const [error, setError] = useState(null);

  const { display_name, bio, website, instagram, twitter } = profileData;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosReq.get(`/api/photographers/photographers/${id}/`);
        setProfileData({
          display_name: data.display_name || '',
          bio: data.bio || '',
          website: data.website || '',
          instagram: data.instagram || '',
          twitter: data.twitter || '',
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError('Error loading profile data');
      }
    };

    if (currentUser) {
      fetchProfile();
    }
  }, [id, currentUser]);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosRes.put(`/api/photographers/photographers/${id}/`, profileData);
      history.push(`/profile/${id}`);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Error updating profile');
    }
  };

  if (!currentUser) {
    return <p>You must be logged in to edit your profile.</p>;
  }

  return (
    <Container className={styles.profileEditContainer}>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>Edit Profile</h2>
          {error && <p className="text-danger">{error}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="display_name">
              <Form.Label>Display Name</Form.Label>
              <Form.Control
                type="text"
                name="display_name"
                value={display_name}
                onChange={handleChange}
                placeholder="Enter your display name"
              />
            </Form.Group>

            <Form.Group controlId="bio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="bio"
                value={bio}
                onChange={handleChange}
                placeholder="Write something about yourself"
              />
            </Form.Group>

            <Form.Group controlId="website">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                name="website"
                value={website}
                onChange={handleChange}
                placeholder="https://example.com"
              />
            </Form.Group>

            <Form.Group controlId="instagram">
              <Form.Label>Instagram</Form.Label>
              <Form.Control
                type="text"
                name="instagram"
                value={instagram}
                onChange={handleChange}
                placeholder="Instagram profile link"
              />
            </Form.Group>

            <Form.Group controlId="twitter">
              <Form.Label>Twitter</Form.Label>
              <Form.Control
                type="text"
                name="twitter"
                value={twitter}
                onChange={handleChange}
                placeholder="Twitter profile link"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Save Changes
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileEdit;
