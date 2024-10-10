import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import styles from "../styles/PhotoDetails.module.css";

const PhotoDetails = () => {
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      try {
        const { data } = await axiosReq.get(`/api/photos/photos/${id}/`);
        setPhoto(data);
        setLikeCount(data.likes_count);
        setHasLiked(data.user_has_liked); // Assuming this info is available in the API response.
      } catch (err) {
        setError("Photo not found.");
      }
    };

    const fetchComments = async () => {
      try {
        const { data } = await axiosReq.get(`/api/photos/comments/?photo=${id}`);
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
    if (!currentUser) {
      setError("You need to be logged in to comment.");
      return;
    }

    try {
      const { data } = await axiosRes.post(`/api/photos/comments/`, {
        photo: id,
        content: newComment,
      });
      setComments((prevComments) => [...prevComments, data]);
      setNewComment("");
      setError(null); // Clear any previous errors
    } catch (err) {
      setError("Error adding comment.");
    }
  };

  const handleLike = async () => {
    if (!currentUser) {
      setError("You need to be logged in to like a photo.");
      return;
    }

    try {
      if (hasLiked) {
        await axiosRes.post(`/api/photos/photos/${id}/unlike/`);
        setLikeCount((prev) => prev - 1);
      } else {
        await axiosRes.post(`/api/photos/photos/${id}/like/`);
        setLikeCount((prev) => prev + 1);
      }
      setHasLiked(!hasLiked);
    } catch (err) {
      console.error("Error handling like/unlike:", err);
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
            <Button
              variant={hasLiked ? "danger" : "primary"}
              className={styles.likeButton}
              onClick={handleLike}
            >
              {hasLiked ? "Unlike" : "Like"} {likeCount}
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

          {currentUser ? (
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
          ) : (
            <p className={styles.error}>Please <Link to="/signin">sign in</Link> to add a comment.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PhotoDetails;
