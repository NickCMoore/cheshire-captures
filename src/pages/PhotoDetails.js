import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
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
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      try {
        const { data } = await axiosReq.get(`/api/photos/photos/${id}/`);
        setPhoto(data);
        setLikeCount(data.likes_count);
        setHasLiked(data.user_has_liked);
      } catch (err) {
        setError("Photo not found.");
        history.push("/gallery"); 
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
  }, [id, history]);

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
      setError(null);
    } catch (err) {
      setError("Error adding comment.");
    }
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditingCommentContent(comment.content);
  };

  const handleSaveEditedComment = async (e, commentId) => {
    e.preventDefault();
    try {
      await axiosRes.patch(`/api/photos/comments/${commentId}/`, {
        content: editingCommentContent,
      });
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId ? { ...comment, content: editingCommentContent } : comment
        )
      );
      setEditingCommentId(null);
      setEditingCommentContent("");
    } catch (err) {
      setError("Error editing comment.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) return;

    try {
      await axiosRes.delete(`/api/photos/comments/${commentId}/`);
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
    } catch (err) {
      setError("Error deleting comment.");
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

  if (!photo) {
    return <p>Loading...</p>;
  }

  return (
    <Container className={styles.photoDetailsContainer}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        <Col md={8}>
          <img src={photo.image} alt={photo.title} className={styles.photoImage} />
        </Col>
        <Col md={4}>
          <div className={styles.photoDetailsText}>
            <h2>{photo.title}</h2>
            <p>{photo.description}</p>
            <p><strong>Photographer:</strong> {photo.photographer_display_name}</p>
            <p><strong>Tags:</strong> {photo.tags.map(tag => tag.name).join(', ')}</p>
            <RatingComponent photoId={id} />
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
                  className={`${styles.editButton} mt-3`}
                  as={Link}
                  to={`/photos/${id}/edit`}
                >
                  Edit Photo
                </Button>
                <Button
                  variant="danger"
                  className={`${styles.deleteButton} mt-3`}
                  onClick={handleDelete}
                >
                  Delete Photo
                </Button>
              </>
            )}
          </div>
          <hr />
          <h4>Comments</h4>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className={styles.comment}>
                {editingCommentId === comment.id ? (
                  <Form onSubmit={(e) => handleSaveEditedComment(e, comment.id)}>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={editingCommentContent}
                      onChange={(e) => setEditingCommentContent(e.target.value)}
                    />
                    <Button type="submit" variant="primary" className="mt-2">
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      className="mt-2 ml-2"
                      onClick={() => setEditingCommentId(null)}
                    >
                      Cancel
                    </Button>
                  </Form>
                ) : (
                  <>
                    <p>
                      <strong>{comment.photographer_display_name}:</strong> {comment.content}
                    </p>
                    {currentUser?.username === comment.photographer_display_name && (
                      <>
                        <Button
                          variant="link"
                          onClick={() => handleEditComment(comment)}
                          className="p-0 mr-2"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="link"
                          onClick={() => handleDeleteComment(comment.id)}
                          className="p-0 text-danger"
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </>
                )}
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}

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
