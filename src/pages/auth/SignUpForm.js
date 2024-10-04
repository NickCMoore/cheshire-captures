import React, { useState } from 'react';
import { Form, Button, Col, Row, Container, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'; 
import styles from '../../styles/SignInUpForm.module.css';
import btnStyles from '../../styles/Button.module.css';


axios.defaults.xsrfCookieName = 'csrftoken'; 
axios.defaults.xsrfHeaderName = 'X-CSRFToken'; 


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

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const csrfToken = document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];
  
      await axios.post(
        '/dj-rest-auth/registration/', 
        { username, email, password1, password2 },
        {
          headers: {
            'X-CSRFToken': csrfToken
          }
        }
      );
      history.push('/');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrors(err.response.data);
      } else {
        setErrors({ detail: 'Something went wrong. Please try again.' });
      }
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
              {errors.password2 && <Alert variant="danger">{errors.password2}</Alert>}

              {errors.non_field_errors && <Alert variant="danger">{errors.non_field_errors}</Alert>}

              <Button className={`${btnStyles.Button} ${btnStyles.Bright} ${btnStyles.Wide}`} type="submit">
                Sign up
              </Button>
            </Form>
            <Container className="mt-3">
              <Link className={styles.Link} to="/signin">
                Already have an account? <br /><span>Sign in</span>
              </Link>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpForm;
