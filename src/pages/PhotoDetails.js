import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import styles from "../styles/PhotoDetails.module.css";

const PhotoDetails = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      try {
        const { data } = await axiosReq.get(`/api/photos/photos/${id}/`);
        setPhoto(data);
      } catch (err) {
        setError("Photo not found.");
      }
    };

    const fetchComments = async () => {
      try {
        const { data } = await axiosReq.get(`/api/photos/${id}/comments/`);
        setComments(data.results);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchPhotoDetails();
    fetchComments();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosRes.post(`/api/photos/${id}/comments/`, {
        content: newComment,
      });
      setComments((prevComments) => [...prevComments, data]);
      setNewComment("");
    } catch (err) {
      setError("Error adding comment.");
    }
  };

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
          <img src={photo.image_url} alt={photo.title} className={styles.photoImage} />
        </Col>
        <Col md={4}>
          <div className={styles.photoDetailsText}>
            <h2>{photo.title}</h2>
            <p>{photo.description}</p>
            <p><strong>Photographer:</strong> {photo.photographer_display_name}</p>
            <p><strong>Tags:</strong> {photo.tags.map(tag => tag.name).join(', ')}</p>
            <Button variant="primary" className={styles.likeButton}>
              Like {photo.likes_count}
            </Button>
          </div>
          <hr />
          <h4>Comments</h4>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <p key={comment.id} className={styles.comment}>
                <strong>{comment.photographer}:</strong> {comment.content}
              </p>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
          {error && <p className={styles.error}>{error}</p>}

          <Form onSubmit={handleAddComment}>
            <Form.Group controlId="commentContent">
              <Form.Label>Add a Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment here..."
              />
            </Form.Group>
            <Button className={`${styles.commentButton} btn`} type="submit">
              Post Comment
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PhotoDetails;
