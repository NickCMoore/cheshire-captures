import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import axiosInstance from '../api/axiosDefaults'; 
import styles from '../styles/Gallery.module.css';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false); 
  const { ref, inView } = useInView(); 

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/api/photos/?page=${page}`); 
        setImages((prevImages) => [...prevImages, ...response.data.results]); 
      } catch (error) {
        console.error('Error fetching images:', error);
      }
      setLoading(false);
    };

    if (inView && !loading) {
      fetchImages();
    }
  }, [inView, page, loading]);

  useEffect(() => {
    if (inView && !loading) {
      setPage((prevPage) => prevPage + 1); 
    }
  }, [inView, loading]);

  return (
    <div className={styles.gallery}>
      {images.map((image, index) => (
        <div key={index} className={styles.imageContainer}>
          <img src={image.url} alt={`Gallery ${index}`} className={styles.image} /> 
        </div>
      ))}
      {loading && <div className={styles.loader}>Loading...</div>}
      <div ref={ref} className={styles.loader}></div>
    </div>
  );
};

export default Gallery;
