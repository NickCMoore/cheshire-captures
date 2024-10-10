import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { axiosReq } from '../api/axiosDefaults';
import styles from '../styles/MyPhotos.module.css';

const MyPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchMyPhotos = async () => {
      try {
        const { data } = await axiosReq.get('/api/photos/photos/my_photos/');
        setPhotos(data.results);
      } catch (error) {
        console.error('Error fetching my photos:', error);
      }
    };

    fetchMyPhotos();
  }, []);

  const handleDateFilter = async () => {
    try {
      const { data } = await axiosReq.get('/api/photos/photos/my_photos/', {
        params: {
          start_date: startDate || undefined,
          end_date: endDate || undefined,
        },
      });
      setPhotos(data.results);
    } catch (error) {
      console.error('Error filtering photos:', error);
    }
  };

  return (
    <Container className={styles.myPhotosContainer}>
      <h2 className="my-4">My Photos</h2>
      <Row className="mb-4">
        <Col md={4}>
          <Form.Group controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4} className="d-flex align-items-end">
          <Button variant="primary" onClick={handleDateFilter}>
            Filter
          </Button>
        </Col>
      </Row>
      <Row>
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
    </Container>
  );
};

export default MyPhotos;
