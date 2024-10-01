import React, { useState } from 'react';
import { Form, Button, Col, Row, Container, Alert } from 'react-bootstrap';
import styles from '../../styles/SignInUpForm.module.css';
import btnStyles from '../../styles/Button.module.css';
import { Link, useHistory } from 'react-router-dom';
import axiosInstance from '../../api/axiosDefaults';
import { useAuth } from '../../contexts/AuthContext';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });
  const { username, email, password1, password2 } = formData;
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { loginUser } = useAuth();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosInstance.post('/dj-rest-auth/registration/', {
        username,
        email,
        password1,
        password2,
      });
      await loginUser({ email, password: password1 });
      history.push('/');
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', backgroundColor: '#f1f1f1' }}
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <div className={styles.FormContainer}>
            <h1 className={styles.Header}>Sign up</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username">
                <Form.Label className="d-none">Username</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="text"
                  placeholder="Enter username"
                  name="username"
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
              {errors.password1 && <Alert variant="danger">{errors.password1}</Alert>}

              <Form.Group controlId="password2">
                <Form.Label className="d-none">Confirm password</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="password"
                  placeholder="Confirm password"
                  name="password2"
                  value={password2}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.password2 && <Alert variant="danger">{errors.password2}</Alert>}

              <Button
                className={`${btnStyles.Button} ${btnStyles.Bright} ${btnStyles.Wide}`}
                type="submit"
              >
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
