import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';
import { Container, Form, Button, Image, Row, Col, Card, Alert } from 'react-bootstrap';
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
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

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
        setErrorMessage('Error fetching photographer data.');
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
    }
  };

  const handleProfileImageUpload = async () => {
    if (!newProfileImage) {
      setErrorMessage('No image selected for upload.');
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
      setSuccessMessage('Profile image updated successfully.');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error uploading profile image.');
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
      setSuccessMessage('Profile updated successfully.');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error updating profile details.');
      console.error('Error updating profile details:', error);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setErrorMessage('New passwords do not match.');
      return;
    }

    try {
      await axios.post('/dj-rest-auth/password/change/', {
        old_password: currentPassword,
        new_password1: newPassword,
        new_password2: confirmNewPassword,
      });
      setSuccessMessage('Password changed successfully.');
      setErrorMessage('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      setErrorMessage('Error changing password.');
      console.error('Error changing password:', error);
    }
  };

  if (!photographer) return <p>Loading...</p>;

  return (
    <Container className={`${styles.profileEditContainer} mt-5`}>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className={`p-4 shadow ${styles.profileCard}`}>
            <h2 className="text-center mb-4">Edit Profile</h2>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
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
                  required
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
        <Col md={6}>
          <Card className={`p-4 shadow ${styles.profileCard}`}>
            <h3 className="text-center mb-4">Change Password</h3>
            <Form onSubmit={handleChangePassword}>
              <Form.Group controlId="currentPassword" className="mb-3">
                <Form.Label className={styles.formLabel}>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="newPassword" className="mb-3">
                <Form.Label className={styles.formLabel}>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="confirmNewPassword" className="mb-3">
                <Form.Label className={styles.formLabel}>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Change Password
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileEdit;
