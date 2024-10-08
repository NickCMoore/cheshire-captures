import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import styles from "../styles/PhotoDetails.module.css";

const mockImages = [
  { id: 1, title: "Seaside Castle", image: "https://res.cloudinary.com/dwgtce0rh/image/upload/v1721310733/rrnrybzbr0iypcupobfl.jpg", photographer: "John Doe", likes_count: 123, description: "Beautiful seaside castle." },
  { id: 2, title: "Forest Path", image: "https://res.cloudinary.com/dwgtce0rh/image/upload/v1721310879/zjadqskisbjlyfb5jb8i.jpg", photographer: "Jane Smith", likes_count: 89, description: "A tranquil path through the forest." },
  { id: 3, title: "Cows in Field", image: "https://res.cloudinary.com/dwgtce0rh/image/upload/v1721311470/pduqayvfu4pc2vvz3ytq.jpg", photographer: "Mike Johnson", likes_count: 45, description: "Cows grazing in a field." },
  { id: 4, title: "Winter Coast", image: "https://res.cloudinary.com/dwgtce0rh/image/upload/v1727870434/24633_a5n9zu.jpg", photographer: "Alice Brown", likes_count: 76, description: "Snowy coast in the winter." },
];

const mockComments = {
  1: [
    { user: "JaneDoe", content: "Love this photo!" },
    { user: "JohnSmith", content: "Stunning capture!" },
  ],
  2: [
    { user: "EmilyJones", content: "The light here is beautiful." },
  ],
  3: [],
  4: [
    { user: "ChrisBrown", content: "Amazing winter vibes!" },
  ],
};

const PhotoDetails = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      try {
        const { data } = await axiosReq.get(`/api/photos/${id}/`);
        setPhoto(data);
      } catch (err) {
        const fallbackPhoto = mockImages.find((image) => image.id === parseInt(id));
        if (fallbackPhoto) {
          setPhoto(fallbackPhoto);
        } else {
          setError("Photo not found.");
        }
      }
    };

    const fetchComments = async () => {
      try {
        const { data } = await axiosReq.get(`/api/photos/${id}/comments/`);
        setComments(data.results);
      } catch (err) {
        setComments(mockComments[id] || []);
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
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <p key={index} className={styles.comment}>
                <strong>{comment.user}:</strong> {comment.content}
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
