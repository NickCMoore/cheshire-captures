import React, { useState, useEffect } from 'react';
import { Carousel, Container, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import { axiosReq } from '../api/axiosDefaults';
import styles from '../styles/Gallery.module.css';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data } = await axiosReq.get('/api/photos/photos/');
        if (data.results && data.results.length > 0) {
          const photos = data.results.map((photo) => ({
            id: photo.id,
            title: photo.title,
            imageUrl: photo.image_url, 
            photographer: photo.photographer_display_name || 'Unknown',
          }));
          setImages(photos);
        } else {
          setError('No photos available at the moment.');
        }
      } catch (error) {
        console.error('Error fetching photos:', error);
        setError('Failed to load photos. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (isLoading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center my-5">
        <p>{error}</p>
      </Container>
    );
  }

  return (
    <Container fluid className={styles.galleryContainer}>
      <Carousel>
        {images.map((image) => (
          <Carousel.Item key={image.id}>
            <Link to={`/photos/${image.id}`}>
              <img
                className={`d-block w-100 ${styles.image}`}
                src={image.imageUrl}
                alt={image.title}
              />
            </Link>
            <Carousel.Caption className={styles.carouselCaption}>
              <h5>{image.title}</h5>
              <p>By: {image.photographer}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default Gallery;
