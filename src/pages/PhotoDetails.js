import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "../styles/PhotoDetails.module.css";

const PhotoDetails = () => {
  const { id } = useParams(); 
  const [photo, setPhoto] = useState(null); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const { data } = await axios.get(`/api/photos/${id}/`); 
        setPhoto(data);
      } catch (err) {
        setError("Error fetching photo details");
      }
    };

    fetchPhoto();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

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
          <h2>{photo.title}</h2>
          <p>{photo.description}</p>
          <p><strong>Photographer:</strong> {photo.photographer}</p>
          <Button variant="primary" className={styles.likeButton}>
            Like {photo.likes_count}
          </Button>
          <hr />
          <h4>Comments</h4>
          {photo.comments.length > 0 ? (
            photo.comments.map((comment, index) => (
              <p key={index}><strong>{comment.user}:</strong> {comment.content}</p>
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
