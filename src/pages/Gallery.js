import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import axiosInstance from '../api/axiosDefaults';
import styles from '../styles/Gallery.module.css';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      const sampleImages = [
        'https://res.cloudinary.com/dwgtce0rh/image/upload/v1727870434/24633_a5n9zu.jpg',
        'https://res.cloudinary.com/dwgtce0rh/image/upload/v1727862662/vestrahorn-mountains-stokksnes-iceland_aoqbtp.jpg',
        'https://res.cloudinary.com/dwgtce0rh/image/upload/v1721310733/rrnrybzbr0iypcupobfl.jpg',
        'https://res.cloudinary.com/dwgtce0rh/image/upload/v1721310879/zjadqskisbjlyfb5jb8i.jpg',
        'https://res.cloudinary.com/dwgtce0rh/image/upload/v1720338009/cld-sample-2.jpg',
      ];

      setImages((prevImages) => [...prevImages, ...sampleImages]);

      if (!loading) {
        setLoading(true);
        try {
          const response = await axiosInstance.get(`/api/photos/?page=${page}`);
          setImages((prevImages) => [...prevImages, ...response.data.results]);
        } catch (error) {
          console.error('Error fetching images:', error);
        }
        setLoading(false);
      }
    };

    if (inView && !loading) {
      fetchImages();
    }
  }, [inView, page, loading]); 

  useEffect(() => {
    if (inView) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView]);

  return (
    <div className={styles.gallery}>
      {images.map((image, index) => (
        <div key={index} className={styles.imageContainer}>
          <img src={image} alt={`Gallery ${index}`} className={styles.image} />
        </div>
      ))}
      <div ref={ref} className={styles.loader}>
        {loading && 'Loading more...'}
      </div>
    </div>
  );
};

export default Gallery;
