import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row, Container, Alert, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'; 
import styles from '../../styles/SignInUpForm.module.css';
import btnStyles from '../../styles/Button.module.css';
import appStyles from '../../App.module.css';
import logo from '../../assets/cc-logo.png';  
import { useRedirect } from '../../hooks/UseRedirect';  
axios.defaults.xsrfCookieName = 'csrftoken'; 
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const SignUpForm = () => {
  useRedirect('loggedIn');

  const [signUpData, setSignUpData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });

  const { username, email, password1, password2 } = signUpData;
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const getCSRFToken = async () => {
    try {
      await axios.get('https://cheshire-captures-backend-084aac6d9023.herokuapp.com/dj-rest-auth/csrf/');
      const csrfToken = document.cookie.split('; ').find((row) => row.startsWith('csrftoken'))?.split('=')[1];
      return csrfToken;
    } catch (err) {
      console.error('Error fetching CSRF token', err);
    }
  };

  useEffect(() => {
    getCSRFToken();
  }, []);

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted');

    try {
      const csrfToken = await getCSRFToken();
      console.log('CSRF Token:', csrfToken); 

      const formDataToSubmit = {
        username,
        email,
        password1,
        password2,
      };

      await axios.post(
        'https://cheshire-captures-backend-084aac6d9023.herokuapp.com/dj-rest-auth/registration/',
        formDataToSubmit,
        { headers: { 'X-CSRFToken': csrfToken } } 
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
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <Image src={logo} className="mb-5" alt="Logo" />
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
            {errors.username?.map((message, idx) => 
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}

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
            {errors.email?.map((message, idx) => 
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}

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
            {errors.password1?.map((message, idx) => 
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}

            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm Password</Form.Label>
              <Form.Control 
                className={styles.Input}
                type="password" 
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => 
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}

            <Button className={`${btnStyles.Button} ${btnStyles.Bright} ${btnStyles.Wide}`} type="submit">
              Sign up
            </Button>
            {errors.non_field_errors?.map((message, idx) => 
              <Alert variant="warning" key={idx} className="mt-3">{message}</Alert>
            )}
          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>

      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={
            "https://res.cloudinary.com/dwgtce0rh/image/upload/v1727870434/24633_a5n9zu.jpg"
          }
          alt="Sign up visual"
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;
