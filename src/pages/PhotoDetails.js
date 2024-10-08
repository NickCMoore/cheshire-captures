import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "../styles/PhotoDetails.module.css";

const mockPhotoDetails = {
  1: {
    id: 1,
    title: "Seaside Castle",
    description: "A beautiful castle by the sea during sunset.",
    image: "https://res.cloudinary.com/dwgtce0rh/image/upload/v1721310733/rrnrybzbr0iypcupobfl.jpg",
    photographer: "John Doe",
    likes_count: 123,
    comments: [
      { user: "Alice", content: "Amazing shot!" },
      { user: "Bob", content: "Love the colors in this photo." },
    ],
  },
  2: {
    id: 2,
    title: "Forest Path",
    description: "A peaceful path through the forest in autumn.",
    image: "https://res.cloudinary.com/dwgtce0rh/image/upload/v1721310879/zjadqskisbjlyfb5jb8i.jpg",
    photographer: "Jane Smith",
    likes_count: 89,
    comments: [
      { user: "Chris", content: "I wish I could be there!" },
      { user: "Dana", content: "Beautiful scenery!" },
    ],
  },
};

const PhotoDetails = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      const photoData = mockPhotoDetails[id];
      setPhoto(photoData);
    };

    fetchPhoto();
  }, [id]);

  if (!photo) {
    return <p>Loading...</p>;
  }

  return (
    <Container className={styles.photoDetailsContainer}>
      <Row>
        <Col md={8}>
          <img src={photo.image} alt={photo.title} className={styles.photoImage} />
        </Col>
        <Col md={4}>
          <div className={styles.photoDetailsText}>
            <h2>{photo.title}</h2>
            <p>{photo.description}</p>
            <p><strong>Photographer:</strong> {photo.photographer}</p>
            <Button variant="primary" className={styles.likeButton}>
              Like {photo.likes_count}
            </Button>
          </div>
          <hr />
          <h4>Comments</h4>
          {photo.comments.length > 0 ? (
            photo.comments.map((comment, index) => (
              <p key={index} className={styles.comment}><strong>{comment.user}:</strong> {comment.content}</p>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PhotoDetails;
