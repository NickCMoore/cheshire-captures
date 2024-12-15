import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Button, Container, Alert, Spinner } from "react-bootstrap";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import styles from "../styles/PhotoEdit.module.css";

const PhotoEdit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const [updating, setUpdating] = useState(false); // Updating state for handling submit
  const [successMessage, setSuccessMessage] = useState(""); // Success message after update
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const { data } = await axiosReq.get(`/api/photos/photos/${id}/`);
        setTitle(data.title);
        setDescription(data.description);
        setImageUrl(data.image_url);
      } catch (error) {
        console.error("Error fetching photo:", error);
        setError("Unable to fetch photo details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUpdating(true); // Set updating to true while submitting
    try {
      await axiosReq.put(`/api/photos/photos/${id}/`, {
        title,
        description,
      });
      setSuccessMessage("Photo updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000); // Hide success message after 3 seconds
      history.push("/my-photos"); // Redirect to the user's photo gallery
    } catch (error) {
      console.error("Error updating photo:", error);
      setError("Failed to update photo. Please try again.");
    } finally {
      setUpdating(false); // Set updating to false after submission
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this photo?",
    );
    if (!confirmDelete) return;

    try {
      await axiosRes.delete(`/api/photos/photos/${id}/`);
      history.push("/my-photos");
    } catch (error) {
      console.error("Error deleting photo:", error);
      setError("Failed to delete photo. Please try again.");
    }
  };

  if (loading) {
    return (
      <Container
        fluid
        className="d-flex vh-100 justify-content-center align-items-center"
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container
      fluid
      className="d-flex vh-100 justify-content-center align-items-center"
    >
      <div className={`${styles.editContainer} p-5 shadow-lg`}>
        <h2 className="mb-4">Edit Photo</h2>

        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mb-3"
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mb-3"
            />
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Current Image</Form.Label>
            <div className={styles.imageWrapper}>
              <img src={imageUrl} alt={title} className={styles.imagePreview} />
            </div>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100 mb-3"
            disabled={updating}
          >
            {updating ? "Saving..." : "Save Changes"}
          </Button>

          <Button variant="danger" className="w-100" onClick={handleDelete}>
            Delete Photo
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default PhotoEdit;
