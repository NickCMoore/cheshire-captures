import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import axios from 'axios';
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
  const [likeCount, setLikeCount] = useState(0); // Updated name
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      try {
        const { data } = await axiosReq.get(`/api/photos/photos/${id}/`);
        setPhoto(data);
        setLikeCount(data.likes_count); // Use setLikeCount
        setHasLiked(data.user_has_liked);
      } catch (err) {
        setError("Photo not found.");
      }
    };

    const fetchComments = async () => {
      try {
        const { data } = await axiosReq.get(`/api/photos/photos/${id}/comments`);
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
        photo: id, 
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
    try {
      if (!hasLiked) {
        const response = await axios.post(`/api/photos/photos/${id}/like/`);
        if (response.status === 201) {
          setLikeCount((prevCount) => prevCount + 1); // Use setLikeCount
          setHasLiked(true);
        }
      } else {
        const response = await axios.post(`/api/photos/photos/${id}/unlike/`);
        if (response.status === 204) {
          setLikeCount((prevCount) => prevCount - 1); // Use setLikeCount
          setHasLiked(false);
        }
      }
    } catch (error) {
      console.error("Error liking/unliking the photo:", error);
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
          <Image src={photo.image_url} alt={photo.title} className={styles.photoImage} fluid />
        </Col>
        <Col md={4}>
          <div className={styles.photoDetailsText}>
            <h2>{photo.title}</h2>
            <p>{photo.description}</p>
            <p>
              <strong>Photographer:</strong>{" "}
              <Link to={`/profile/${photo.photographer_id}`}>
                {photo.photographer_display_name}
              </Link>
            </p>
            <p><strong>Tags:</strong> {photo.tags.map(tag => tag.name).join(', ')}</p>
            <RatingComponent photoId={Number(id)} />

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
