import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../styles/Gallery.module.css';

// Dummy image data
const mockImages = [
  { id: 1, title: "Seaside castle", imageUrl: "https://res.cloudinary.com/dwgtce0rh/image/upload/v1721310733/rrnrybzbr0iypcupobfl.jpg", photographer: "John Doe" },
  { id: 2, title: "Forest Path", imageUrl: "https://res.cloudinary.com/dwgtce0rh/image/upload/v1721310879/zjadqskisbjlyfb5jb8i.jpg", photographer: "Jane Smith" },
  { id: 3, title: "Cows in field", imageUrl: "https://res.cloudinary.com/dwgtce0rh/image/upload/v1721311470/pduqayvfu4pc2vvz3ytq.jpg", photographer: "Mike Johnson" },
  { id: 4, title: "Winter coast", imageUrl: "https://res.cloudinary.com/dwgtce0rh/image/upload/v1727870434/24633_a5n9zu.jpg", photographer: "Alice Brown" },
];

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Simulate fetching images
    setImages(mockImages);
  }, []);

  return (
    <Container fluid className={styles.galleryContainer}>
      <Row className="justify-content-center">
        {images.map((image) => (
          <Col key={image.id} xs={12} sm={6} md={4} lg={3} className={styles.imageCol}>
            <div className={styles.imageContainer}>
              <img 
                src={image.imageUrl} 
                alt={image.title} 
                className={styles.image} 
              />
              <div className={styles.photoDetails}>
                <h5>{image.title}</h5>
                <p>By: {image.photographer}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Gallery;
