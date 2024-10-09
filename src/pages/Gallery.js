import React, { useState, useEffect } from 'react';
import { Carousel, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import { axiosReq } from '../api/axiosDefaults';
import styles from '../styles/Gallery.module.css';

const Gallery = () => {
  const [images, setImages] = useState([]);

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
        }
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []);

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
