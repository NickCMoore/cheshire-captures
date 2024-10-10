import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

const FollowerList = () => {
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const [followers, setFollowers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const { data } = await axios.get(`/api/photographers/${id}/followers/`);
        setFollowers(data.results);
      } catch (error) {
        setError('Error fetching followers.');
        console.error('Error fetching followers:', error);
      }
    };

    if (currentUser) {
      fetchFollowers();
    }
  }, [id, currentUser]);

  if (error) {
    return <p>{error}</p>;
  }

  if (followers.length === 0) {
    return <p>This photographer has no followers yet.</p>;
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center">Followers</h2>
      <Row>
        {followers.map((follower) => (
          <Col key={follower.id} md={4} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{follower.follower_display_name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FollowerList;
