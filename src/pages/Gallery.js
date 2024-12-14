import React, { useState, useEffect } from 'react';
import { Carousel, Container, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { axiosReq } from '../api/axiosDefaults';
import styles from '../styles/Gallery.module.css';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data } = await axiosReq.get('/api/photos/photos', {
          params: {
            category: selectedCategory || undefined,
            search: searchTerm || undefined,
          },
        });

        if (data.results && data.results.length > 0) {
          const photos = await Promise.all(
            data.results.map(async (photo) => {
              let photographerName = 'Unknown';

              if (photo.photographer) {
                photographerName = photo.photographer.display_name || 'Unknown';
              } else {
                try {
                  const photographerResponse = await axiosReq.get(
                    `/api/photographers/photographers/${photo.photographer_id}`
                  );
                  photographerName =
                    photographerResponse.data.display_name || 'Unknown';
                } catch (error) {
                  console.error('Error fetching photographer:', error);
                }
              }

              return {
                id: photo.id,
                title: photo.title,
                imageUrl: photo.image_url,
                photographer: photographerName,
              };
            })
          );

          setImages(photos);

          const uniqueCategories = data.results
            ? [...new Set(data.results.map(photo => photo.category).filter(category => category))]
            : [];
          setCategories(uniqueCategories);
        } else {
          setImages([]);
        }
      } catch (error) {
        console.error('Error fetching photos:', error);
        setImages([]);
        setCategories([]);
      }
    };

    fetchPhotos();
  }, [selectedCategory, searchTerm]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container fluid className={styles.galleryContainer}>
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group controlId="searchBar">
            <Form.Control
              type="text"
              placeholder="Search photos..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="categorySelect">
            <Form.Control as="select" value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Carousel>
        {images.length > 0 ? (
          images.map((image) => (
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
          ))
        ) : (
          selectedCategory || searchTerm ? (
            <p className="text-center">No photos found.</p>
          ) : (
            <div className={styles.loadingContainer}>
              <p>Loading photos...</p>
            </div>
          )
        )}
      </Carousel>
    </Container>
  );
};

export default Gallery;

