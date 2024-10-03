import React, { useState } from 'react';
import { Form, Button, Col, Row, Container, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../styles/SignInUpForm.module.css';
import btnStyles from '../../styles/Button.module.css';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',  // Add username field
    email: '',
    password1: '',
    password2: '',
  });

  const { username, email, password1, password2 } = formData; // Destructure username
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { registerUser } = useAuth(); 

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password1 !== password2) {
      setErrors({ password: "Passwords don't match" });
      return;
    }
    try {
      // Include username in the registration payload
      await registerUser({ username, email, password1, password2 });
      history.push('/signin'); 
    } catch (err) {
      setErrors(err.response?.data || { detail: 'Registration failed' });
    }
  };

  return (
    <Container fluid className={styles.Background}>
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <div className={styles.FormContainer}>
            <h1 className={styles.Header}>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username">
                <Form.Label className="d-none">Username</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="text"
                  placeholder="Enter username"
                  name="username" // Set name to "username"
                  value={username}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.username && <Alert variant="danger">{errors.username}</Alert>}

              <Form.Group controlId="email">
                <Form.Label className="d-none">Email</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.email && <Alert variant="danger">{errors.email}</Alert>}

              <Form.Group controlId="password1">
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="password"
                  placeholder="Password"
                  name="password1"
                  value={password1}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="password2">
                <Form.Label className="d-none">Confirm Password</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.password && <Alert variant="danger">{errors.password}</Alert>}

              <Button className={`${btnStyles.Button} ${btnStyles.Bright} ${btnStyles.Wide}`} type="submit">
                Sign up
              </Button>
            </Form>
            <Container className="mt-3">
              <Link className={styles.Link} to="/signin">
                Already have an account? <span>Sign in</span>
              </Link>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpForm;
