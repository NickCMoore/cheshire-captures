import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { axiosReq } from '../api/axiosDefaults'; 
import styles from '../styles/Gallery.module.css'; 
import { Container } from 'react-bootstrap'; 

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
        console.log('Fetching images for page:', page);
        const response = await axiosReq.get(`https://cheshire-captures-backend-084aac6d9023.herokuapp.com/api/photos/?page=${page}`, { withCredentials: true });
        console.log('API Response:', response.data);
        
        if (response.data && Array.isArray(response.data.results)) {
          console.log('Images from response:', response.data.results);
          if (response.data.results.length > 0) {
            setImages((prevImages) => [...prevImages, ...response.data.results]); 
            setPage((prevPage) => prevPage + 1); 
          } else {
            setHasMore(false); 
          }
        } else {
          console.error('Unexpected response structure:', response.data);
          setHasMore(false); 
        }
      } catch (error) {
        console.error('Error fetching images:', error);
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
    <Container className={styles.gallery}> 
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
    </Container>
  );
};

export default Gallery;
