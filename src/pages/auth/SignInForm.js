import React, { useState } from 'react';
import { Form, Button, Col, Row, Container, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../styles/SignInUpForm.module.css';
import btnStyles from '../../styles/Button.module.css';

const SignInForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { loginUser } = useAuth();

  const { username, password } = formData; 

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await loginUser({ username, password }); 
      history.push('/');
    } catch (err) {
      setErrors({ detail: 'Invalid username or password' });
    }
  };

  return (
    <Container fluid className={styles.Background}>
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <div className={styles.FormContainer}>
            <h1 className={styles.Header}>Sign in</h1>
            <Form onSubmit={handleSubmit}>
              {/* Username Input */}
              <Form.Group controlId="username">
                <Form.Label className="d-none">Username</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Password Input */}
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

              {/* Error Message */}
              {errors.detail && <Alert variant="danger">{errors.detail}</Alert>}

              {/* Submit Button */}
              <Button className={`${btnStyles.Button} ${btnStyles.Bright} ${btnStyles.Wide}`} type="submit">
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
