import React, { useState, useEffect } from 'react';
import { Carousel, Container } from 'react-bootstrap';
import styles from '../styles/Gallery.module.css';

// Dummy image data
const mockImages = [
  { id: 1, title: "Seaside Castle", imageUrl: "https://res.cloudinary.com/dwgtce0rh/image/upload/v1721310733/rrnrybzbr0iypcupobfl.jpg", photographer: "John Doe" },
  { id: 2, title: "Forest Path", imageUrl: "https://res.cloudinary.com/dwgtce0rh/image/upload/v1721310879/zjadqskisbjlyfb5jb8i.jpg", photographer: "Jane Smith" },
  { id: 3, title: "Cows in Field", imageUrl: "https://res.cloudinary.com/dwgtce0rh/image/upload/v1721311470/pduqayvfu4pc2vvz3ytq.jpg", photographer: "Mike Johnson" },
  { id: 4, title: "Winter Coast", imageUrl: "https://res.cloudinary.com/dwgtce0rh/image/upload/v1727870434/24633_a5n9zu.jpg", photographer: "Alice Brown" },
];

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0); // Track the current slide

  useEffect(() => {
    // Simulate fetching images
    setImages(mockImages);
  }, []);

  return (
    <div className={styles.dimmedOverlay}> {/* Add the dimmed overlay */}
      <Container fluid className={styles.galleryContainer}>
        <Carousel activeIndex={activeIndex} onSelect={setActiveIndex}>
          {images.map((image) => (
            <Carousel.Item key={image.id} interval={5000}>
              <img
                className={`d-block w-100 ${styles.image}`}
                src={image.imageUrl}
                alt={image.title}
              />
              <Carousel.Caption className={styles.carouselCaption}>
                <h5>{image.title}</h5>
                <p>By: {image.photographer}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </div>
  );
};

export default Gallery;
