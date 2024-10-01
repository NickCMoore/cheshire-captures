import React, { useState, useContext } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import styles from '../../styles/SignInUpForm.module.css';
import btnStyles from '../../styles/Button.module.css';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const { loginUser } = useContext(AuthContext); 
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const credentials = {
        email,
        password,
      };
      await loginUser(credentials); 
      history.push('/'); 
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error(error);
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f1f1f1' }}>
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
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </Form.Group>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Bright} ${btnStyles.Wide}`}
                type="submit"
              >
                Sign in
              </Button>
            </Form>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            <Container className="mt-3">
              <Link className={styles.Link} to="/signup">
                Don't have an account? <span>Sign up</span>
              </Link>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignInForm;
