import React, { useState, useEffect } from 'react';
import { Carousel, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import { axiosReq } from '../api/axiosDefaults';
import styles from '../styles/Gallery.module.css';

const mockImages = [
  { id: 1, title: "Seaside Castle", imageUrl: "https://res.cloudinary.com/dwgtce0rh/image/upload/v1721310733/rrnrybzbr0iypcupobfl.jpg", photographer: "John Doe" },
  { id: 2, title: "Forest Path", imageUrl: "https://res.cloudinary.com/dwgtce0rh/image/upload/v1721310879/zjadqskisbjlyfb5jb8i.jpg", photographer: "Jane Smith" },
  { id: 3, title: "Cows in Field", imageUrl: "https://res.cloudinary.com/dwgtce0rh/image/upload/v1721311470/pduqayvfu4pc2vvz3ytq.jpg", photographer: "Mike Johnson" },
  { id: 4, title: "Winter Coast", imageUrl: "https://res.cloudinary.com/dwgtce0rh/image/upload/v1727870434/24633_a5n9zu.jpg", photographer: "Alice Brown" },
];

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
            imageUrl: photo.image && photo.image.startsWith('http') 
              ? photo.image 
              : `https://res.cloudinary.com/dwgtce0rh/${photo.image || ''}`, 
            photographer: photo.photographer_display_name || 'Unknown',
          }));
          setImages(photos);
        } else {
          setImages(mockImages);
        }
      } catch (error) {
        console.error('Error fetching photos:', error);
        setImages(mockImages);
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
                src={image.imageUrl || 'https://res.cloudinary.com/dwgtce0rh/image/upload/v1721310733/rrnrybzbr0iypcupobfl.jpg'}
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
