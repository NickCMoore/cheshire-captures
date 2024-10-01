import React, { useState, useContext } from 'react';
import { Form, Button, Col, Row, Container, Alert } from 'react-bootstrap';
import styles from '../../styles/SignInUpForm.module.css';
import btnStyles from '../../styles/Button.module.css';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password1: '',
    password2: ''
  });
  const { username, password1, password2 } = formData;

  const [errors, setErrors] = useState({});
  const { signupUser } = useContext(AuthContext);
  const history = useHistory();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password1 !== password2) {
      setErrors({ password2: ['Passwords do not match.'] });
      return;
    }
    try {
      await signupUser({ username, password1, password2 });
      history.push('/'); // Redirect to the homepage after successful signup
    } catch (error) {
      setErrors(error.response?.data || {});
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f1f1f1' }}>
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <div className={styles.FormContainer}>
            <h1 className={styles.Header}>Sign up</h1>
            {errors.username && <Alert variant="danger">{errors.username}</Alert>}
            {errors.password1 && <Alert variant="danger">{errors.password1}</Alert>}
            {errors.password2 && <Alert variant="danger">{errors.password2}</Alert>}
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
