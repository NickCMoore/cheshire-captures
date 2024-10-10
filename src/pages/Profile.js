import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';
import { Container, Form, Button, Image, Row, Col, Card } from 'react-bootstrap';
import styles from '../styles/Profile.module.css';

const Profile = () => {
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const [photographer, setPhotographer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');

  useEffect(() => {
    const fetchPhotographer = async () => {
      try {
        const { data } = await axios.get(`/api/photographers/photographers/${id}/`);
        setPhotographer(data);
        setDisplayName(data.display_name);
        setBio(data.bio);
        setWebsite(data.website);
        setInstagram(data.instagram);
        setTwitter(data.twitter);
      } catch (error) {
        console.error('Error fetching photographer data:', error);
      }
    };

    fetchPhotographer();
  }, [id]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleProfileImageChange = (event) => {
    if (event.target.files.length) {
      setNewProfileImage(event.target.files[0]);
    }
  };

  const handleProfileUpdate = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (newProfileImage) {
      formData.append('profile_image', newProfileImage);
    }
    formData.append('display_name', displayName);
    formData.append('bio', bio);
    formData.append('website', website);
    formData.append('instagram', instagram);
    formData.append('twitter', twitter);

    try {
      const { data } = await axios.put(`/api/photographers/photographers/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPhotographer(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!photographer) return <p>Loading...</p>;

  const isOwnProfile = currentUser && String(photographer.user) === String(currentUser.username);

  return (
    <Container className={`${styles.profileContainer} mt-5`} fluid="lg">
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <Card className="p-4 shadow-sm">
            <Image
              src={photographer.profile_image}
              roundedCircle
              className={`${styles.profileImage} mb-3`}
              alt="Profile"
            />
            <h2 className="mt-3">{photographer.display_name}</h2>
            <p className={`${styles.bio} mt-2`}>{photographer.bio || 'No bio provided'}</p>
            <p><strong>Website:</strong> {photographer.website || 'Not provided'}</p>
            <p><strong>Instagram:</strong> {photographer.instagram || 'Not provided'}</p>
            <p><strong>Twitter:</strong> {photographer.twitter || 'Not provided'}</p>
            {isOwnProfile && (
              <Button variant="primary" className="mt-2" onClick={handleEditToggle}>
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            )}
          </Card>
        </Col>
        {isOwnProfile && isEditing && (
          <Col md={8} className="mt-4">
            <Card className="p-4 shadow-sm mb-4">
              <h3>Edit Profile</h3>
              <Form onSubmit={handleProfileUpdate}>
                <Form.Group className="mb-3">
                  <Form.Label>Change Profile Picture</Form.Label>
                  <Form.Control type="file" onChange={handleProfileImageChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Display Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Website</Form.Label>
                  <Form.Control
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Instagram</Form.Label>
                  <Form.Control
                    type="url"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Twitter</Form.Label>
                  <Form.Control
                    type="url"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                </Form.Group>
                <Button type="submit" variant="success" className="mt-3">
                  Save Changes
                </Button>
              </Form>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Profile;
