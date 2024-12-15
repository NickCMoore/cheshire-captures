import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import axios from "axios";

const PhotoDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const currentUser = useCurrentUser();
  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [error, setError] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      try {
        const { data } = await axiosReq.get(`/api/photos/photos/${id}/`);
        setPhoto(data);
        setLikeCount(data.likes_count || 0);
        setHasLiked(data.user_has_liked || false);
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
      setNewComment("");
      setError(null);
    } catch (err) {
      setError("Error adding comment.");
      console.error("Error adding comment:", err);
    }
  };

  const handleEditComment = async (commentId) => {
    try {
      await axiosRes.put(`/api/photos/comments/${commentId}/`, {
        content: editComment,
      });
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId ? { ...comment, content: editComment } : comment
        )
      );
      setEditingCommentId(null);
    } catch (err) {
      console.error("Error editing comment:", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) return;

    try {
      await axiosRes.delete(`/api/photos/comments/${commentId}/`);
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
    } catch (err) {
      console.error("Error deleting comment:", err.response || err);
      alert("Failed to delete the comment. Please try again.");
    }
  };

  const handleLike = async () => {
    try {
      if (!hasLiked) {
        const response = await axios.post(`/api/photos/photos/${id}/like/`);
        if (response.status === 201) {
          setLikeCount((prevCount) => prevCount + 1);
          setHasLiked(true);
        }
      } else {
        const response = await axios.post(`/api/photos/photos/${id}/unlike/`);
        if (response.status === 204) {
          setLikeCount((prevCount) => prevCount - 1);
          setHasLiked(false);
        }
      }
    } catch (error) {
      console.error("Error liking/unliking the photo:", error.response?.data || error);
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
    return (
      <Container className="text-center my-4">
        <h2 className="text-danger">{error}</h2>
        <Button variant="secondary" onClick={handleBackToGallery}>
          Back to Gallery
        </Button>
      </Container>
    );
  }

  if (!photo) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Image
            src={photo.image_url}
            alt={photo.title}
            className="w-100 mb-4"
            fluid
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="p-3 bg-light">
            <h2 className="text-primary">{photo.title}</h2>
            <p className="text-dark">
              <strong>{photo.photographer_display_name}</strong>
            </p>
            <p className="text-dark">{photo.description}</p>

            <div className="mt-3 text-center">
              <p className="mb-1" style={{ color: 'black' }}>
                <strong>Likes:</strong> {likeCount || 0}
              </p>
              <Button
                variant={hasLiked ? "danger" : "primary"}
                onClick={handleLike}
              >
                {hasLiked ? "Unlike" : "Like"}
              </Button>
            </div>

            {currentUser?.username &&
              photo.photographer_display_name &&
              currentUser.username.toLowerCase() ===
                photo.photographer_display_name.toLowerCase() && (
                <div className="d-flex justify-content-center gap-3 mt-4">
                  <Button variant="warning" as={Link} to={`/photos/${id}/edit`}>
                    Edit Photo
                  </Button>
                  <Button variant="danger" onClick={handleDelete}>
                    Delete Photo
                  </Button>
                </div>
              )}

            <Button
              variant="secondary"
              onClick={handleBackToGallery}
              className="mt-3"
            >
              Back to Gallery
            </Button>

            <hr />
            <h4>Comments</h4>

            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id}>
                  {editingCommentId === comment.id ? (
                    <>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                      />
                      <Button onClick={() => handleEditComment(comment.id)}>Save</Button>
                      <Button variant="danger" onClick={() => setEditingCommentId(null)}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <div className="d-flex align-items-start mb-3">
                      <p style={{ color: 'black' }}>
                        <strong>{comment.user}:</strong> {comment.content}
                        {currentUser?.username === comment.user && (
                          <div className="mt-2 d-flex gap-2">
                            <Button
                              variant="warning"
                              onClick={() => setEditingCommentId(comment.id)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => handleDeleteComment(comment.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}

            <Form onSubmit={handleAddComment} className="mt-4">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button type="submit" variant="primary" className="mt-2">
                Add Comment
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PhotoDetails;
