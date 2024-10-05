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
  const { ref, inView } = useInView();

  useEffect(() => {
    const fetchImages = async () => {
      if (!hasMore || loading) return;
      setLoading(true);
      try {
        const response = await axiosReq.get(`https://cheshire-captures-backend-084aac6d9023.herokuapp.com/api/photos/?page=${page}`, { withCredentials: true });
        
        if (response.data && Array.isArray(response.data.results)) {
          if (response.data.results.length > 0) {
            const cloudinaryBaseUrl = 'https://res.cloudinary.com/dwgtce0rh/image/upload/';
            const updatedImages = response.data.results.map(image => ({
              ...image,
              url: `${cloudinaryBaseUrl}${image.image}`,
            }));
            setImages((prevImages) => [...prevImages, ...updatedImages]);
            setPage((prevPage) => prevPage + 1);
          } else {
            setHasMore(false);
          }
        } else {
          setHasMore(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setHasMore(false);
        }
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
        <Col md={8} lg={6}>
          <div className={styles.galleryContent}>
            {images.length > 0 ? (
              images.map((image, index) => (
                <div key={index} className={styles.imageContainer}>
                  <img src={image.url} alt={`Gallery ${index}`} className={styles.image} />
                </div>
              ))
            ) : (
              <div className={styles.endMessage}>No images available.</div>
            )}
            {loading && <div className={styles.loader}>Loading...</div>}
            <div ref={ref} className={styles.loader}></div>
            {!hasMore && <div className={styles.endMessage}>No more images to load.</div>}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Gallery;
