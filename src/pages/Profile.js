import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import styles from '../styles/Profile.module.css';

const ProfilePage = () => {
  const { id } = useParams();
  const [photographer, setPhotographer] = useState(null);
  const [isBioLong, setIsBioLong] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);

  useEffect(() => {
    const fetchPhotographer = async () => {
      try {
        const { data } = await axios.get(`/api/photographers/photographers/${id}/`); // No prepending
        setPhotographer(data);
        setIsBioLong(data.bio.length > 150); // Check if bio is long
      } catch (error) {
        console.error('Error fetching photographer:', error);
      }
    };
    fetchPhotographer();
  }, [id]);

  const toggleBio = () => {
    setShowFullBio(!showFullBio); // Toggle between showing full bio or part of it
  };

  if (!photographer) return <p>Loading...</p>;

  return (
    <Container className={styles.profileContainer}>
      <Row className="justify-content-center my-5">
        <Col md={4} className="text-center">
          <Card className="p-4 shadow-sm">
            <Image
              src={photographer.profile_image} 
              roundedCircle
              className={styles.profileImage}
            />
            <h2 className={styles.blueHeading}>{photographer.display_name}</h2>
            <p className={`${styles.bio} mt-2`}>
              {showFullBio || !isBioLong ? photographer.bio : `${photographer.bio.slice(0, 150)}...`}
            </p>
            {isBioLong && (
              <Button variant="link" onClick={toggleBio}>
                {showFullBio ? 'Show less' : 'Show more'}
              </Button>
            )}

            {photographer.is_user && (
              <Button
                as={Link}
                to={`/profile/${id}/edit`}
                variant="primary"
                className="mt-2"
              >
                Edit Profile
              </Button>
            )}
          </Card>
        </Col>
        <Col md={8}>
          <Card className="p-4 shadow-sm mb-4">
            <h3>Photos</h3>
            <Row>
              {photographer.photos && photographer.photos.length > 0 ? (
                photographer.photos.map((photo) => (
                  <Col key={photo.id} xs={12} md={6} lg={4} className="mb-3">
                    <Image src={photo.image_url} fluid className={styles.photo} /> 
                  </Col>
                ))
              ) : (
                <p>No photos yet.</p>
              )}
            </Row>
          </Card>
          <Card className="p-4 shadow-sm">
            <h3>Social Links</h3>
            <ul className={styles.socialLinks}>
              {photographer.website && <li><a href={photographer.website} target="_blank" rel="noopener noreferrer">Website</a></li>}
              {photographer.instagram && <li><a href={photographer.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>}
              {photographer.twitter && <li><a href={photographer.twitter} target="_blank" rel="noopener noreferrer">Twitter</a></li>}
            </ul>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
