import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { axiosReq } from '../api/axiosDefaults'; 
import styles from '../styles/Gallery.module.css'; 
import { Container, Row, Col } from 'react-bootstrap'; 

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const { ref, inView } = useInView();

  // Fetch images
  useEffect(() => {
    const fetchImages = async () => {
      if (!hasMore || loading) return;
      setLoading(true);
      try {
        const response = await axiosReq.get(`/api/photos/?page=${page}`);
        
        if (response.data && Array.isArray(response.data.results)) {
          const cloudinaryBaseUrl = 'https://res.cloudinary.com/dwgtce0rh/image/upload/';
          const updatedImages = response.data.results.map(image => ({
            ...image,
            url: `${cloudinaryBaseUrl}${image.image}`,
          }));

          setImages((prevImages) => [...prevImages, ...updatedImages]);
          setPage((prevPage) => prevPage + 1);

          if (response.data.results.length === 0) {
            setHasMore(false);
          }
        } else {
          setHasMore(false);
        }
      } catch (error) {
        setError('Error loading images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (inView && hasMore) {
      fetchImages();
    }
  }, [inView, page, hasMore, loading]);

  return (
    <Container fluid className={styles.galleryContainer}>
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <div className={styles.galleryContent}>
            {error && <div className={styles.errorMessage}>{error}</div>}

            {images.length > 0 ? (
              <Row>
                {images.map((image, index) => (
                  <Col xs={12} sm={6} md={4} lg={3} key={index} className={styles.imageCol}>
                    <div className={styles.imageContainer}>
                      <img 
                        src={image.url} 
                        alt={image.title || `Gallery ${index}`} 
                        className={styles.image} 
                        loading="lazy" 
                      />
                    </div>
                  </Col>
                ))}
              </Row>
            ) : !loading && !error ? (
              <div className={styles.endMessage}>No images available.</div>
            ) : null}

            {loading && <div className={styles.loader}>Loading...</div>}

            <div ref={ref} className={styles.loader}></div>
            {!hasMore && !loading && <div className={styles.endMessage}>No more images to load.</div>}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Gallery;
