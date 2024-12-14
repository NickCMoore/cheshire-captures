import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import styles from '../styles/Profile.module.css';
import { useCurrentUser } from '../contexts/CurrentUserContext';

const ProfilePage = () => {
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const [photographer, setPhotographer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotographer = async () => {
      try {
        const { data } = await axios.get(`/api/photographers/photographers/${id}/`);
        setPhotographer(data);
      } catch (error) {
        console.error('Error fetching photographer:', error);
        setError('There was an issue loading the photographer details. Please try again later.');
      }
    };
    fetchPhotographer();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!photographer) return <p>Loading...</p>;

  return (
    <Container className={styles.profileContainer}>
      <Row className="justify-content-center my-5">
        <Col md={4} className="text-center">
          <Card className="p-4 shadow-sm">
            <Image
              src={photographer.profile_image}
              roundedCircle
              alt="Profile"
              className={`${styles.profileImage} mb-3`}
            />
            <h3>{photographer.display_name}</h3>
            <p>{photographer.bio ? photographer.bio : 'This photographer has not provided a bio.'}</p>
            <Button variant="primary" as={Link} to={`/profile/${currentUser?.photographer_id}/edit`}>
              Edit Profile
            </Button>
          </Card>
        </Col>
      </Row>

      {/* Additional section for photographer's social links */}
      <Row className="my-4">
        <Col>
          {photographer.website && (
            <p>
              <strong>Website: </strong>
              <a href={photographer.website} target="_blank" rel="noopener noreferrer">
                {photographer.website}
              </a>
            </p>
          )}
          {photographer.instagram && (
            <p>
              <strong>Instagram: </strong>
              <a href={photographer.instagram} target="_blank" rel="noopener noreferrer">
                {photographer.instagram}
              </a>
            </p>
          )}
          {photographer.twitter && (
            <p>
              <strong>Twitter: </strong>
              <a href={photographer.twitter} target="_blank" rel="noopener noreferrer">
                {photographer.twitter}
              </a>
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
