import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import axiosInstance from '../api/axiosDefaults'; 
import styles from '../styles/Gallery.module.css';

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
        const response = await axiosInstance.get(`/api/photos/?page=${page}`); 
        if (response.data.results.length > 0) {
          setImages((prevImages) => [...prevImages, ...response.data.results]); 
          setPage((prevPage) => prevPage + 1); 
        }
        if (!response.data.next) {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
      setLoading(false);
    };

    if (inView && hasMore) {
      fetchImages();
    }
  }, [inView, page, hasMore, loading]); 

  return (
    <div className={styles.gallery}>
      {images.map((image, index) => (
        <div key={index} className={styles.imageContainer}>
          <img src={image.url} alt={`Gallery ${index}`} className={styles.image} /> 
        </div>
      ))}
      {loading && <div className={styles.loader}>Loading...</div>}
      <div ref={ref} className={styles.loader}></div> 
      {!hasMore && <div className={styles.endMessage}>No more images to load.</div>}
    </div>
  );
};

export default Gallery;
