import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import styles from '../../styles/SignInUpForm.module.css';
import logo from '../../assets/cc-logo.png';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';
import { setTokenTimestamp } from '../../utils/Utils';
import axios from 'axios';

function SignInForm() {
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();

  const [signInData, setSignInData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = signInData;
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post('/dj-rest-auth/login/', signInData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      history.goBack();
    } catch (err) {
      setErrors(err.response?.data || {});
    }
  };

  return (
    <Container fluid className={styles.Background}>
      <div className={styles.FormContainer}>
        <img src={logo} alt="Logo" className="mb-5" />
        <h1 className={styles.Header}>Sign In</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label className="d-none">Username</Form.Label>
            <Form.Control
              className={styles.Input}
              type="text"
              name="username"
              placeholder="Enter username"
              value={username}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.username?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <Form.Group controlId="password">
            <Form.Label className="d-none">Password</Form.Label>
            <Form.Control
              className={styles.Input}
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
            />
          </Form.Group>
          {errors.password?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <Button className={`${styles.Button}`} type="submit">
            Sign In
          </Button>
          {errors.non_field_errors?.map((message, idx) => (
            <Alert variant="warning" className="mt-3" key={idx}>
              {message}
            </Alert>
          ))}
        </Form>
        <Container className={`mt-3 ${styles.LinkContainer}`}>
          <Link className={styles.Link} to="/signup">
            Don't have an account? <span>Sign up now!</span>
          </Link>
        </Container>
      </div>
    </Container>
  );
}

export default SignInForm;
