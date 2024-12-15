import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/ChangePassword.module.css";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const history = useHistory();
  const currentUser = useCurrentUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post("/dj-rest-auth/password/change/", {
        old_password: currentPassword,
        new_password1: newPassword1,
        new_password2: newPassword2,
      });
      setSuccess("Password changed successfully!");
      setTimeout(() => {
        history.push(`/profile/${currentUser.photographer_id}`);
      }, 3000);
    } catch (err) {
      setError(
        err.response?.data?.old_password?.[0] ||
          err.response?.data?.new_password1?.[0] ||
          "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <Container className={`${styles.changePasswordContainer} mt-5`}>
      <h2 className="text-center">Change Password</h2>
      <Form onSubmit={handleSubmit} className="mt-4">
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form.Group controlId="currentPassword">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="newPassword1" className="mt-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={newPassword1}
            onChange={(e) => setNewPassword1(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="newPassword2" className="mt-3">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            value={newPassword2}
            onChange={(e) => setNewPassword2(e.target.value)}
            required
          />
        </Form.Group>

        <Button className="mt-4" variant="primary" type="submit">
          Change Password
        </Button>
      </Form>
    </Container>
  );
};

export default ChangePassword;
