import React, { useState, useContext } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import styles from '../../styles/SignInUpForm.module.css';
import btnStyles from '../../styles/Button.module.css';
import { Link, useHistory } from 'react-router-dom';
import axiosInstance from '../../api/axiosDefaults'; // Import axiosInstance
import { AuthContext } from '../../contexts/AuthContext'; // Import AuthContext

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const { loginUser } = useContext(AuthContext); 
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        username,
        password1,
        password2,
      };
      await axiosInstance.post('/dj-rest-auth/registration/', formData); 
      await loginUser({ username, password: password1 }); 
      history.push('/');
    } catch (error) {
      setError('Sign-up failed. Please check your information.');
      console.error(error);
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f1f1f1' }}>
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
                  onChange={(e) => setUsername(e.target.value)}
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
                  onChange={(e) => setPassword1(e.target.value)}
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
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </Form.Group>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Bright} ${btnStyles.Wide}`}
                type="submit"
              >
                Sign up
              </Button>
            </Form>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
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
