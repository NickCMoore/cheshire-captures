import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import styles from '../styles/Profile.module.css';

const ProfilePage = () => {
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const [photographer, setPhotographer] = useState(null);
  const [isBioLong, setIsBioLong] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchPhotographer = async () => {
      try {
        const { data } = await axios.get(`/api/photographers/photographers/${id}/`);
        setPhotographer(data);
        setIsBioLong(data.bio.length > 150); // Check if bio is long
        setIsFollowing(data.is_following);  // Assuming API returns if current user is following the photographer
      } catch (error) {
        console.error('Error fetching photographer:', error);
      }
    };
    fetchPhotographer();
  }, [id]);

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await axios.post(`/api/photographers/photographers/${id}/unfollow/`);
        setIsFollowing(false);
      } else {
        await axios.post(`/api/photographers/photographers/${id}/follow/`);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Error following/unfollowing:', error);
    }
  };

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
            <h2 className="mt-3">{photographer.display_name}</h2>
            <p className={`${styles.bio} mt-2`}>
              {showFullBio || !isBioLong ? photographer.bio : `${photographer.bio.slice(0, 150)}...`}
            </p>
            {isBioLong && (
              <Button variant="link" onClick={toggleBio}>
                {showFullBio ? 'Show less' : 'Show more'}
              </Button>
            )}

              <Button
                as={Link}
                to={`/profile/${id}/edit`}
                variant="primary"
                className="mt-2"
              >
                Edit Profile
              </Button>
            <Button variant={isFollowing ? 'danger' : 'success'} onClick={handleFollowToggle} className="mt-2">
              {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
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
