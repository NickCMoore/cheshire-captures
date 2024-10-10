import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';
import { Container, Form, Button, Image, Row, Col, Card } from 'react-bootstrap';
import styles from '../styles/Profile.module.css';

const ProfileEdit = () => {
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const [photographer, setPhotographer] = useState(null);
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

    if (currentUser) {
      fetchPhotographer();
    }
  }, [id, currentUser]);

  const handleProfileImageChange = (event) => {
    if (event.target.files.length) {
      setNewProfileImage(event.target.files[0]);
      console.log('Selected file:', event.target.files[0]); 
    }
  };

  const handleProfileImageUpload = async () => {
    if (!newProfileImage) {
      console.error('No image selected for upload.');
      return;
    }

    const formData = new FormData();
    formData.append('profile_image', newProfileImage);

    try {
      const { data } = await axios.put(`/api/photographers/photographers/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPhotographer(data);
      setNewProfileImage(null);
      console.log('Profile image updated successfully.');
    } catch (error) {
      console.error('Error uploading profile image:', error);
    }
  };

  const handleProfileUpdate = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.put(`/api/photographers/photographers/${id}/`, {
        display_name: displayName,
        bio,
        website,
        instagram,
        twitter,
      });
      setPhotographer(data);
      console.log('Profile updated successfully.');
    } catch (error) {
      console.error('Error updating profile details:', error);
    }
  };

  if (!photographer) return <p>Loading...</p>;

  return (
    <Container className={`${styles.profileEditContainer} mt-5`}>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className={`p-4 shadow ${styles.profileCard}`}>
            <h2 className="text-center mb-4">Edit Profile</h2>
            <Form onSubmit={handleProfileUpdate}>
              <div className="text-center">
                <Image
                  src={photographer.profile_image}
                  roundedCircle
                  className={`${styles.profileImage} mb-3`}
                  alt="Profile"
                />
                <Form.Group className="mb-3">
                  <Form.Label className={styles.formLabel}>Change Profile Picture</Form.Label>
                  <Form.Control type="file" onChange={handleProfileImageChange} />
                  <Button
                    variant="primary"
                    className="mt-2"
                    onClick={handleProfileImageUpload}
                    disabled={!newProfileImage}
                  >
                    Upload New Picture
                  </Button>
                </Form.Group>
              </div>

              <Form.Group controlId="displayName" className="mb-3">
                <Form.Label className={styles.formLabel}>Display Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter display name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="bio" className="mb-3">
                <Form.Label className={styles.formLabel}>Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Tell us about yourself"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="website" className="mb-3">
                <Form.Label className={styles.formLabel}>Website</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="https://example.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="instagram" className="mb-3">
                <Form.Label className={styles.formLabel}>Instagram</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="https://instagram.com/yourusername"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="twitter" className="mb-3">
                <Form.Label className={styles.formLabel}>Twitter</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="https://twitter.com/yourusername"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
              </Form.Group>

              <Button variant="success" type="submit" className="w-100 mt-4">
                Save Changes
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileEdit;
