import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap';
import styles from '../styles/Profile.module.css';

const Profile = () => {
  const { username } = useParams(); 
  const currentUser = useCurrentUser();
  const [profile, setProfile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`/api/photographers/${username}/`);  
        setProfile(data);
        setIsFollowing(data.is_following);
        if (currentUser && data.user.id === currentUser.id) {  
          setIsOwnProfile(true);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    if (currentUser) {
      fetchProfile();
    }
  }, [username, currentUser]);

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await axios.post(`/api/follows/${profile.user.id}/unfollow/`); 
        setIsFollowing(false);
      } else {
        await axios.post(`/api/follows/`, { following: profile.user.id });
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Error following/unfollowing photographer:', error);
    }
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <Container className={styles.profileContainer}>
      <Row className="justify-content-center my-5">
        <Col md={4} className="text-center">
          <Card className="p-4 shadow-sm">
            <Image src={profile.profile_image} roundedCircle className={styles.profileImage} />
            <h2 className="mt-3">{profile.display_name}</h2>
            <p className={`${styles.bio} mt-2`}>{profile.bio}</p>
            {isOwnProfile ? (
              <Button variant="primary" className="mt-2">Edit Profile</Button>
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
              {profile.photos && profile.photos.length > 0 ? (
                profile.photos.map((photo) => (
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
              {profile.website && <li><a href={profile.website} target="_blank" rel="noopener noreferrer">Website</a></li>}
              {profile.instagram && <li><a href={profile.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>}
              {profile.twitter && <li><a href={profile.twitter} target="_blank" rel="noopener noreferrer">Twitter</a></li>}
            </ul>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
