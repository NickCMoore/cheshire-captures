import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../styles/Profile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const [photographer, setPhotographer] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotographer = async () => {
      try {
        const { data } = await axios.get(`/api/photographers/photographers/${id}/`);
        setPhotographer(data);
        setIsFollowing(data.is_followed);
      } catch (error) {
        console.error('Error fetching photographer data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchMyPhotos = async () => {
      try {
        const { data } = await axios.get('/api/photos/photos/my_photos/');
        setPhotos(data.results);
      } catch (error) {
        console.error('Error fetching my photos:', error);
      }
    };

    fetchPhotographer();
    if (currentUser && currentUser.photographer_id === id) {
      fetchMyPhotos();
    }
  }, [id, currentUser]);

  const handleFollow = async () => {
    try {
      await axios.post(`/api/photographers/photographers/${id}/follow/`);
      setIsFollowing(true);
    } catch (error) {
      console.error('Error following photographer:', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.post(`/api/photographers/photographers/${id}/unfollow/`);
      setIsFollowing(false);
    } catch (error) {
      console.error('Error unfollowing photographer:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!photographer) return <p>Photographer not found.</p>;

  const isOwnProfile = currentUser && String(photographer.user) === String(currentUser.username);

  return (
    <Container className={`${styles.profileContainer} mt-5`} fluid="lg">
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <Card className="p-4 shadow-sm">
            <h3>{photographer.display_name}</h3>
            <p>{photographer.bio}</p>
            <ul className={styles.socialLinks}>
              {photographer.website && (
                <li>
                  <FontAwesomeIcon icon={faGlobe} className={styles.icon} />
                  <a href={photographer.website} target="_blank" rel="noopener noreferrer">
                    Website
                  </a>
                </li>
              )}
              {photographer.instagram && (
                <li>
                  <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
                  <a href={photographer.instagram} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </li>
              )}
              {photographer.twitter && (
                <li>
                  <FontAwesomeIcon icon={faTwitter} className={styles.icon} />
                  <a href={photographer.twitter} target="_blank" rel="noopener noreferrer">
                    X (formerly Twitter)
                  </a>
                </li>
              )}
            </ul>
            {isOwnProfile ? (
              <Link to={`/profile/${id}/edit`}>
                <Button variant="secondary" className="mt-2">
                  Edit Profile
                </Button>
              </Link>
            ) : (
              <Button
                variant={isFollowing ? 'danger' : 'primary'}
                className="mt-2"
                onClick={isFollowing ? handleUnfollow : handleFollow}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
            )}
          </Card>
        </Col>
      </Row>
      {isOwnProfile && (
        <Row className="mt-4">
          <h3 className="text-center">My Photos</h3>
          {photos.length > 0 ? (
            photos.map((photo) => (
              <Col key={photo.id} md={4} className="mb-4">
                <Card className="shadow-sm">
                  <Link to={`/photos/${photo.id}`}>
                    <Card.Img variant="top" src={photo.image_url} alt={photo.title} />
                  </Link>
                  <Card.Body>
                    <Card.Title>{photo.title}</Card.Title>
                    <Card.Text>{photo.created_at}</Card.Text>
                    <Link to={`/photos/${photo.id}/edit`}>
                      <Button variant="secondary" className="w-100">
                        Edit
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">You have not uploaded any photos yet.</p>
          )}
        </Row>
      )}
    </Container>
  );
};

export default Profile;
