import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import SearchBar from '../components/SearchBar'; 

const PopularPhotographers = () => {
  const [photographers, setPhotographers] = useState([]);
  const currentUser = useCurrentUser();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        const { data } = await axios.get(`/api/photographers/photographers/?search=${searchQuery}`);
        setPhotographers(data.results);
      } catch (error) {
        console.error('Error fetching photographers:', error);
      }
    };

    fetchPhotographers();
  }, [searchQuery]);

  return (
    <Container>
      <h2 className="my-4">Popular Photographers</h2>
      <SearchBar onSearch={setSearchQuery} />
      <Row>
        {photographers.map((photographer) => (
          <Col key={photographer.id} md={4} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body className="text-center">
                <Card.Title className="mt-2">{photographer.display_name}</Card.Title>
                <Card.Text>{photographer.bio}</Card.Text>
                <Link to={`/profile/${photographer.id}`}>
                  <Button variant="primary" className="w-100 mt-2">
                    View Profile
                  </Button>
                </Link>
                {currentUser?.username === photographer.user && (
                  <Link to={`/profile/${photographer.id}/edit`}>
                    <Button variant="secondary" className="w-100 mt-2">
                      Edit Profile
                    </Button>
                  </Link>
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

