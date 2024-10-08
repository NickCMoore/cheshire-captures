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
  const [likes, setLikes] = useState({});

  useEffect(() => {
    setImages(mockImages);
      const fetchLikes = async () => {
        const likesData = {};
        for (let image of mockImages) {
          try {
            const { data } = await axiosReq.get(`/api/photos/${image.id}/`); // Fetch the details for each photo
            likesData[image.id] = data.likes_count; // Store the likes count
          } catch (error) {
            console.error("Error fetching likes for image", image.id);
            likesData[image.id] = 0; // Default to 0 likes if there's an error
          }
        }
        setLikes(likesData);
      };
    
      fetchLikes();

  }, []);


  return (
    <Container fluid className={styles.galleryContainer}>
      <Carousel>
        {images.map((image) => (
          <Carousel.Item key={image.id}>
            <Link to={`/photos/${image.id}`}>
              <img
                className={`d-block w-100 ${styles.image}`}
                src={image.imageUrl}
                alt={image.title}
              />
            </Link>
            <Carousel.Caption className={styles.carouselCaption}>
              <h5>{image.title}</h5>
              <p>By: {image.photographer}</p>
              <p>❤️ {image.likes_count} Likes</p> {/* Likes Count */}
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default Gallery;

