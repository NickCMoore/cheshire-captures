import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import styles from '../styles/PopularPhotographers.module.css';

const PopularPhotographers = () => {
  const [photographers, setPhotographers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        const { data } = await axios.get('/api/photos/photos/top-rated/');
        setPhotographers(data.results);
        setLoading(false);
      } catch (err) {
        setError('Error fetching photographers.');
        setLoading(false);
      }
    };

    fetchPhotographers();
  }, []);

  const handleFollowToggle = async (photographerId, isFollowing) => {
    try {
        if (isFollowing) {
            await axios.post(`/api/photographers/photographers/${photographerId}/unfollow/`);
        } else {
            await axios.post(`/api/photographers/photographers/${photographerId}/follow/`);
        }
        setPhotographers((prevPhotographers) =>
            prevPhotographers.map((photographer) =>
                photographer.id === photographerId
                    ? { ...photographer, is_following: !isFollowing }
                    : photographer
            )
        );
    } catch (err) {
        console.error('Error following/unfollowing photographer:', err);
    }
};


  if (loading) {
    return <p>Loading photographers...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container className={styles.PopularPhotographers}>
      <h2 className="my-4">Popular Photographers</h2>
      <Row>
        {photographers.map((photographer) => (
          <Col key={photographer.id} xs={12} md={6} lg={4} className="mb-4">
            <Card className="shadow-sm">
              <Card.Img
                variant="top"
                src={photographer.profile_image}
                alt={photographer.display_name}
                className={styles.ProfileImage}
              />
              <Card.Body>
                <Card.Title>{photographer.display_name}</Card.Title>
                <Card.Text>{photographer.bio}</Card.Text>
                <Card.Text>
                  <strong>Followers:</strong> {photographer.follower_count}
                </Card.Text>
                <Link to={`/profile/${photographer.id}`}>
                  <Button variant="primary" className="mr-2">
                    View Profile
                  </Button>
                </Link>
                {currentUser && currentUser.id !== photographer.user && (
                  <Button
                    variant={photographer.is_following ? 'danger' : 'success'}
                    onClick={() =>
                      handleFollowToggle(photographer.id, photographer.is_following)
                    }
                  >
                    {photographer.is_following ? 'Unfollow' : 'Follow'}
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PopularPhotographers;
