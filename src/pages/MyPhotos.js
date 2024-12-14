import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { axiosReq } from '../api/axiosDefaults';
import SearchBar from '../components/SearchBar';
import styles from '../styles/MyPhotos.module.css';

const MyPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['Nature', 'Urban', 'Portrait', 'Event', 'Landscape'];

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

    // Filter by date range
    if (startDateFilter || endDateFilter) {
      filtered = filtered.filter((photo) => {
        const photoDate = new Date(photo.created_at);
        const startDate = new Date(startDateFilter);
        const endDate = new Date(endDateFilter);

        return (
          (!startDateFilter || photoDate >= startDate) &&
          (!endDateFilter || photoDate <= endDate)
        );
      });
    }

    setFilteredPhotos(filtered);
  }, [searchQuery, photos, categoryFilter, startDateFilter, endDateFilter]);

  const clearFilters = () => {
    setSearchQuery('');
    setCategoryFilter('');
    setStartDateFilter('');
    setEndDateFilter('');
  };

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
        <Row className="align-items-end">
          <Col md={4}>
            <Form.Group controlId="categoryFilter">
              <Form.Label className="text-white">Category</Form.Label>
              <Form.Control
                as="select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="startDateFilter">
              <Form.Label className="text-white">Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDateFilter}
                onChange={(e) => setStartDateFilter(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="endDateFilter">
              <Form.Label className="text-white">End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDateFilter}
                onChange={(e) => setEndDateFilter(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={4} className="d-flex align-items-center justify-content-end">
            <Button
              variant="warning"
              className="w-100"
              onClick={clearFilters}
            >
              Clear All Filters
            </Button>
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
                  <Card.Text className={styles.dateText}>{photo.created_at}</Card.Text>
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
