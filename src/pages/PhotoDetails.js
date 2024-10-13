import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import styles from "../styles/PhotoDetails.module.css";
import RatingComponent from "./Rating";

const PhotoDetails = () => {
  const { id } = useParams();
  const history = useHistory();
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
        setHasLiked(data.user_has_liked);
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
      const { data } = await axiosRes.post(`/api/photos/photos/${id}/comments/`, {
        content: newComment, 
      });
      setComments((prevComments) => [...prevComments, data]);
      setNewComment('');
      setError(null);
    } catch (err) {
      setError("Error adding comment.");
      console.error('Error adding comment:', err);
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

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this photo?");
    if (!confirmDelete) return;

    try {
      await axiosRes.delete(`/api/photos/photos/${id}/`);
      history.push("/gallery");
    } catch (err) {
      setError("Error deleting photo.");
      console.error("Error deleting photo:", err);
    }
  };

  // Handle the "Back to Gallery" button click
  const handleBackToGallery = () => {
    history.push("/gallery");
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!photo) {
    return <p>Loading...</p>;
  }

  return (
    <Container className={`${styles.photoDetailsContainer} d-flex align-items-center justify-content-center vh-100`}>
      <Row className="w-100">
        <Col md={8}>
          {/* Display the photo */}
          <Image src={photo.image_url} alt={photo.title} className={styles.photoImage} fluid />
        </Col>
        <Col md={4}>
          <div className={styles.photoDetailsText}>
            <h2>{photo.title}</h2>
            <p>{photo.description}</p>
            <p><strong>Photographer:</strong> {photo.photographer_display_name}</p>
            <p><strong>Tags:</strong> {photo.tags.map(tag => tag.name).join(', ')}</p>
            <RatingComponent photoId={id} />

            {/* Buttons for like, edit, and delete */}
            <div className={styles.photoDetailsButtons}>
              <Button
                variant={hasLiked ? "danger" : "primary"}
                className={styles.likeButton}
                onClick={handleLike}
              >
                {hasLiked ? "Unlike" : "Like"} {likeCount}
              </Button>

              {currentUser?.username === photo.photographer_display_name && (
                <>
                  <Button
                    variant="warning"
                    className={styles.editButton}
                    as={Link}
                    to={`/photos/${id}/edit`}
                  >
                    Edit Photo
                  </Button>
                  <Button
                    variant="danger"
                    className={styles.deleteButton}
                    onClick={handleDelete}
                  >
                    Delete Photo
                  </Button>
                </>
              )}

              {/* Back to Gallery Button */}
              <Button
                variant="secondary"
                className={styles.backButton}
                onClick={handleBackToGallery}
              >
                Back to Gallery
              </Button>
            </div>

            <hr />
            <h4>Comments</h4>

            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className={styles.comment}>
                  <p>
                    <strong>{comment.photographer}:</strong> {comment.content}
                  </p>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}

            {currentUser ? (
              <Form onSubmit={handleAddComment}>
                <Form.Group controlId="commentContent">
                  <Form.Label className={styles.commentHeader}>Add a Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your comment here..."
                    className={styles.commentInput}
                  />
                </Form.Group>
                <Button className={styles.commentButton} type="submit">
                  Post Comment
                </Button>
              </Form>
            ) : (
              <p className={styles.error}>Please <Link to="/signin">sign in</Link> to add a comment.</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PhotoDetails;
