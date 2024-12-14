import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { axiosReq } from '../api/axiosDefaults';
import SearchBar from '../components/SearchBar'; // Import the SearchBar component
import styles from '../styles/MyPhotos.module.css';

const MyPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(''); // Category filter
  const [dateFilter, setDateFilter] = useState(''); // Date filter
  const [isLoading, setIsLoading] = useState(true); // Loading state for better UX
  const [error, setError] = useState(null); // Error handling state

  useEffect(() => {
    const fetchMyPhotos = async () => {
      try {
        const { data } = await axiosReq.get('/api/photos/photos/my_photos/');
        if (data && data.results) {
          setPhotos(data.results);
          setFilteredPhotos(data.results);
        } else {
          setError('No photos available.');
        }
      } catch (error) {
        console.error('Error fetching my photos:', error);
        setError('Error fetching photos, please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyPhotos();
  }, []);

  useEffect(() => {
    // Apply filters: search, category, and date
    let filtered = photos;

    // Filter by title search
    if (searchQuery) {
      filtered = filtered.filter((photo) =>
        photo.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter) {
      filtered = filtered.filter((photo) =>
        photo.category.toLowerCase().includes(categoryFilter.toLowerCase())
      );
    }

    // Filter by date
    if (dateFilter) {
      filtered = filtered.filter((photo) => {
        const photoDate = new Date(photo.created_at);
        const filterDate = new Date(dateFilter);
        return photoDate.toDateString() === filterDate.toDateString();
      });
    }

    setFilteredPhotos(filtered);
  }, [searchQuery, photos, categoryFilter, dateFilter]);

  if (isLoading) {
    return <div>Loading photos...</div>;
  }

  return (
    <Container className={styles.myPhotosContainer}>
      <h2 className="my-4">My Photos</h2>
      <SearchBar onSearch={setSearchQuery} /> 
      {error && <p className="text-danger">{error}</p>} 

      {/* Filters */}
      <Form className="mb-4">
        <Row>
          <Col md={4}>
            <Form.Group controlId="categoryFilter">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Filter by category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="dateFilter">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Row>
        {filteredPhotos && filteredPhotos.length > 0 ? (
          filteredPhotos.map((photo) => (
            <Col key={photo.id} md={4} className="mb-4">
              <Card className={`shadow-sm ${styles.photoCard}`}>
                <Link to={`/photos/${photo.id}`}>
                  <Card.Img
                    variant="top"
                    src={photo.image_url}
                    alt={photo.title}
                    className={styles.photoImage}
                  />
                </Link>
                <Card.Body className={styles.cardBody}>
                  <Card.Title className={styles.cardTitle}>{photo.title}</Card.Title>
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
          <p className={styles.noPhotosMessage}>You have not uploaded any photos yet.</p>
        )}
      </Row>
    </Container>
  );
};

export default MyPhotos;
