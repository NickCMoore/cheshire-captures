import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from '../styles/Gallery.module.css';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1); 
  const { ref, inView } = useInView(); 

  useEffect(() => {
    const fetchImages = async () => {
      const sampleImages = [
        'https://res.cloudinary.com/dwgtce0rh/image/upload/v1727870434/24633_a5n9zu.jpg',
        'https://res.cloudinary.com/dwgtce0rh/image/upload/v1727862662/vestrahorn-mountains-stokksnes-iceland_aoqbtp.jpg',
        'https://res.cloudinary.com/dwgtce0rh/image/upload/v1721310733/rrnrybzbr0iypcupobfl.jpg',
      ];
      setImages((prevImages) => [...prevImages, ...sampleImages]);
    };

    if (inView) {
      fetchImages();
    }
  }, [inView, page]);

  useEffect(() => {
    if (inView) {
      setPage((prevPage) => prevPage + 1); 
    }
  }, [inView]);

  return (
    <div className={styles.gallery}>
      {images.map((image, index) => (
        <div key={index} className={styles.imageContainer}>
          <img src={image} alt={`Gallery image ${index}`} className={styles.image} />
        </div>
      ))}
      <div ref={ref} className={styles.loader} />
    </div>
  );
};

export default Gallery;
