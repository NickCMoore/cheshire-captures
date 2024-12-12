import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { axiosReq } from '../api/axiosDefaults';
import SearchBar from '../components/SearchBar'; // Import the SearchBar component
import styles from '../styles/MyPhotos.module.css';

const MyPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
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
    if (searchQuery) {
      setFilteredPhotos(
        photos.filter((photo) =>
          photo.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredPhotos(photos);
    }
  }, [searchQuery, photos]);

  if (isLoading) {
    return <div>Loading photos...</div>;
  }

  return (
    <Container className={styles.myPhotosContainer}>
      <h2 className="my-4">My Photos</h2>
      <SearchBar onSearch={setSearchQuery} /> {/* Add the SearchBar */}
      {error && <p className="text-danger">{error}</p>} {/* Display error if any */}

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
