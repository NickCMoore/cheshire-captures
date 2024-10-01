import React, { useState } from 'react';
import { Form, Button, Col, Row, Container, Alert } from 'react-bootstrap';
import styles from '../../styles/SignInUpForm.module.css';
import btnStyles from '../../styles/Button.module.css';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
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
      await loginUser({ email, password });
      history.push('/');
    } catch (err) {
      setErrors({ detail: 'Invalid email or password' });
    }
  };

  return (
    <Container
      fluid
      className={styles.Background}
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <div className={styles.FormContainer}>
            <h1 className={styles.Header}>Sign in</h1>
            <Form onSubmit={handleSubmit}>
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

              <Form.Group controlId="password">
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.detail && <Alert variant="danger">{errors.detail}</Alert>}

              <Button
                className={`${btnStyles.Button} ${btnStyles.Bright} ${btnStyles.Wide}`}
                type="submit"
              >
                Sign in
              </Button>
            </Form>
            <Container className="mt-3">
              <Link className={styles.Link} to="/signup">
                Don't have an account? <br></br><span>Sign up</span>
              </Link>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignInForm;
