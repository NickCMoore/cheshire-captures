import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import styles from "../styles/ProfileEdit.module.css";

const ProfileEdit = () => {
  const { id } = useParams();
  const history = useHistory();
  const [profileData, setProfileData] = useState({
    display_name: "",
    bio: "",
    location: "",
    website: "",
    instagram: "",
    twitter: "",
  });
  const [error, setError] = useState(null);

  const { display_name, bio, location, website, instagram, twitter } = profileData;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const { data } = await axios.get(`/api/photographers/photographers/${id}/`);
        setProfileData({
          display_name: data.display_name || "",
          bio: data.bio || "",
          location: data.location || "",
          website: data.website || "",
          instagram: data.instagram || "",
          twitter: data.twitter || "",
        });
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Unable to load profile data.");
      }
    };

    fetchProfileData();
  }, [id]);

  const handleChange = (e) => {
    console.log(`Updating field: ${e.target.name} with value: ${e.target.value}`);
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/photographers/photographers/${id}/`, 
        profileData
      );
      console.log("Profile updated successfully:", data);
      history.push(`/profile/${id}`); 
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    }
  };

  return (
    <Container className={styles.ProfileEdit}>
      <Row className="justify-content-center">
        <Col md={8}>
          <h2>Edit Profile</h2>
          {error && <p className={styles.Error}>{error}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="display_name">
              <Form.Label>Display Name</Form.Label>
              <Form.Control
                type="text"
                name="display_name"
                value={display_name}
                onChange={handleChange}
                placeholder="Enter display name"
                required
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
                placeholder="Write a short bio"
              />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={location}
                onChange={handleChange}
                placeholder="Enter your location"
              />
            </Form.Group>
            <Form.Group controlId="website">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="url"
                name="website"
                value={website}
                onChange={handleChange}
                placeholder="Enter website URL"
              />
            </Form.Group>
            <Form.Group controlId="instagram">
              <Form.Label>Instagram</Form.Label>
              <Form.Control
                type="url"
                name="instagram"
                value={instagram}
                onChange={handleChange}
                placeholder="Enter Instagram URL"
              />
            </Form.Group>
            <Form.Group controlId="twitter">
              <Form.Label>Twitter</Form.Label>
              <Form.Control
                type="url"
                name="twitter"
                value={twitter}
                onChange={handleChange}
                placeholder="Enter Twitter URL"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileEdit;
