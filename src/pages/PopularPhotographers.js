import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosReq } from '../api/axiosDefaults';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';

const PopularPhotographers = () => {
  const [photographers, setPhotographers] = useState([]);
  const [filteredPhotographers, setFilteredPhotographers] = useState([]);
  const currentUser = useCurrentUser();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        const { data } = await axiosReq.get('/api/photographers/top-photographers/');
        setPhotographers(data);
        setFilteredPhotographers(data); 
      } catch (err) {
        console.error('Error fetching photographers:', err);
      }
    };

    fetchPhotographers();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredPhotographers(
        photographers.filter((photographer) =>
          photographer.display_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredPhotographers(photographers);
    }
  }, [searchQuery, photographers]);

  return (
    <Container>
      <h2 className="my-4">Popular Photographers</h2>
      <SearchBar onSearch={setSearchQuery} />
      <Row className="mt-4">
        {filteredPhotographers.map((photographer) => (
          <Col key={photographer.id} md={4} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body className="text-left">
                <Card.Title className="mt-2">{photographer.display_name}</Card.Title>
                <Card.Text>{photographer.bio}</Card.Text>
                <Link to={`/profile/${photographer.id}`}>
                  <Button variant="primary" className="w-100 mt-2">
                    View Profile
                  </Button>
                </Link>
                {currentUser?.username === photographer.user.username && (
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
