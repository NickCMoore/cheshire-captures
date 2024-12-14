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
  const [error, setError] = useState(null);
  const [photographer, setPhotographer] = useState(null);

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      try {
        const { data } = await axiosReq.get(`/api/photos/photos/${id}/`);
        setPhoto(data);

        // Fetch photographer details
        const photographerResponse = await axios.get(
          `/api/photographers/photographers/${data.photographer_id}/`
        );
        setPhotographer(photographerResponse.data);
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

  if (error) {
    return (
      <Container className="text-center my-4">
        <h2 className="text-danger">{error}</h2>
        <Button variant="secondary" onClick={() => history.push("/gallery")}>
          Back to Gallery
        </Button>
      </Container>
    );
  }

  if (!photo || !photographer) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Image src={photo.image_url} alt={photo.title} className="w-100 mb-4" fluid />
          <h2>{photo.title}</h2>
          <p>{photo.description}</p>
          <div className="d-flex align-items-center mb-3">
            <Image
              src={photographer.profile_image}
              alt={`${photographer.display_name}'s profile`}
              roundedCircle
              width="50"
              height="50"
              className="me-2"
            />
            <Link to={`/photographer/${photographer.id}`} className="text-dark fw-bold">
              {photographer.display_name}
            </Link>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <Form onSubmit={handleAddComment}>
            <Form.Group controlId="newComment">
              <Form.Label>Add a Comment:</Form.Label>
              <Form.Control
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment..."
              />
            </Form.Group>
            <Button type="submit" className="mt-2">
              Submit
            </Button>
          </Form>
          <h3>Comments</h3>
          {comments.map((comment) => (
            <div key={comment.id} className="d-flex align-items-center my-3">
              <Image
                src={comment.user_profile_image}
                alt={`${comment.user}'s profile`}
                roundedCircle
                width="40"
                height="40"
                className="me-2"
              />
              <div>
                <p className="mb-1 fw-bold">{comment.user}</p>
                <p className="mb-0">{comment.content}</p>
              </div>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default PhotoDetails;
