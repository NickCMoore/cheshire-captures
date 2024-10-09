import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap';
import styles from '../styles/Profile.module.css';

const Profile = () => {
  const { id } = useParams(); 
  const currentUser = useCurrentUser();
  const [photographer, setPhotographer] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    const fetchPhotographer = async () => {
      try {
        const { data } = await axios.get(`/api/photographers/photographers/${id}/`);  
        setPhotographer(data);
        setIsFollowing(data.is_following);
        if (currentUser && String(data.user) === String(currentUser.username)) {
          setIsOwnProfile(true);
        }
      } catch (error) {
        console.error('Error fetching photographer data:', error);
      }
    };
  
    if (currentUser) {
      fetchPhotographer();
    }
  }, [id, currentUser]);
  
  
  

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await axios.post(`/api/follows/${photographer.id}/unfollow/`); 
        setIsFollowing(false);
      } else {
        await axios.post(`/api/follows/`, { following: photographer.id });
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Error following/unfollowing photographer:', error);
    }
  };

  if (!photographer) return <p>Loading...</p>;

  return (
    <Container className={styles.profileContainer}>
      <Row className="justify-content-center my-5">
        <Col md={4} className="text-center">
          <Card className="p-4 shadow-sm">
            <Image src={photographer.profile_image} roundedCircle className={styles.profileImage} />
            <h2 className="mt-3">{photographer.display_name}</h2>
            <p className={`${styles.bio} mt-2`}>{photographer.bio}</p>
            {isOwnProfile ? (
              <Link to={`/profile/${id}/edit`}>
                <Button variant="primary" className="mt-2">
                  Edit Profile
                </Button>
              </Link>
            ) : (
              <Button variant={isFollowing ? 'danger' : 'success'} onClick={handleFollowToggle}>
                {isFollowing ? 'Unfollow' : 'Follow'}
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

export default Profile;
