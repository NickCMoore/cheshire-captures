import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Image, Card } from 'react-bootstrap';
import styles from '../styles/PopularPhotographers.module.css';

// Dummy data for popular photographers
const mockPhotographers = [
  { id: 1, username: "John Doe", profile_image: "https://res.cloudinary.com/dwgtce0rh/image/upload/v1721310733/rrnrybzbr0iypcupobfl.jpg", followers_count: 150, is_following: false },
  { id: 2, username: "Jane Smith", profile_image: "https://res.cloudinary.com/dwgtce0rh/image/upload/v1721310879/zjadqskisbjlyfb5jb8i.jpg", followers_count: 120, is_following: true },
  { id: 3, username: "Mike Johnson", profile_image: "https://res.cloudinary.com/dwgtce0rh/image/upload/v1721311470/pduqayvfu4pc2vvz3ytq.jpg", followers_count: 180, is_following: false },
  { id: 4, username: "Alice Brown", profile_image: "https://res.cloudinary.com/dwgtce0rh/image/upload/v1727870434/24633_a5n9zu.jpg", followers_count: 200, is_following: true },
];

const PopularPhotographers = () => {
  const [photographers, setPhotographers] = useState([]);

  useEffect(() => {
    setPhotographers(mockPhotographers);
  }, []);

  const handleFollow = (id) => {
    setPhotographers((prevPhotographers) =>
      prevPhotographers.map((photographer) =>
        photographer.id === id
          ? { ...photographer, is_following: true, followers_count: photographer.followers_count + 1 }
          : photographer
      )
    );
  };

  const handleUnfollow = (id) => {
    setPhotographers((prevPhotographers) =>
      prevPhotographers.map((photographer) =>
        photographer.id === id
          ? { ...photographer, is_following: false, followers_count: photographer.followers_count - 1 }
          : photographer
      )
    );
  };

  return (
    <Container className="my-5 pb-5">
      <Row className="text-center mb-4">
        <Col>
          <h1 className="display-4" style={{ color: 'var(--yinmn-blue)' }}>Popular Photographers</h1>
          <p className="lead" style={{ color: 'var(--mountbatten-pink)' }}>Discover and follow top landscape photographers in Cheshire.</p>
        </Col>
      </Row>

      <Row>
        {photographers.length > 0 ? (
          photographers.map((photographer) => (
            <Col key={photographer.id} md={6} lg={4} className="mb-4">
              <Card className="shadow-sm border-0" style={{ backgroundColor: 'var(--yinmn-blue)', color: 'var(--wisteria)' }}>
                <Card.Body className="text-center">
                  <Image src={photographer.profile_image} roundedCircle className={`${styles.profileImage} mb-3`} />
                  <Card.Title className="mb-1">{photographer.username}</Card.Title>
                  <Card.Text className="text-muted mb-2">Followers: {photographer.followers_count}</Card.Text>
                  {photographer.is_following ? (
                    <Button variant="danger" onClick={() => handleUnfollow(photographer.id)}>
                      Unfollow
                    </Button>
                  ) : (
                    <Button variant="primary" onClick={() => handleFollow(photographer.id)}>
                      Follow
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No popular photographers found.</p>
        )}
      </Row>
    </Container>
  );
};

export default PopularPhotographers;
