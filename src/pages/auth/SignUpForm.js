import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { setTokenTimestamp } from "../../utils/utils";
import axios from "axios";


function SignUpForm() {
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();

  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const { username, password1, password2 } = signUpData;
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/registration/", signUpData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      history.push("/signin/");
    } catch (err) {
      setErrors(err.response?.data || {});
    }
  };

  return (
    <Container fluid className={styles.Background}>
      <Row className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Col xs={12} md={6} lg={4}>
          <div className={styles.FormContainer}>
            <h1 className={styles.Header}>Sign Up</h1>
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
                  required
                  autoComplete="new-password" // Added autocomplete
                />
              </Form.Group>
              {errors.username?.map((message, idx) => (
                <Alert variant="warning" className={styles.Alert} key={idx}>
                  {message}
                </Alert>
              ))}

              <Form.Group controlId="password1">
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="password"
                  name="password1"
                  placeholder="Enter password"
                  value={password1}
                  onChange={handleChange}
                  required
                  autoComplete="new-password" // Added autocomplete
                />
              </Form.Group>
              {errors.password1?.map((message, idx) => (
                <Alert variant="warning" className={styles.Alert} key={idx}>
                  {message}
                </Alert>
              ))}

              <Form.Group controlId="password2">
                <Form.Label className="d-none">Confirm Password</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="password"
                  name="password2"
                  placeholder="Confirm password"
                  value={password2}
                  onChange={handleChange}
                  required
                  autoComplete="new-password" // Added autocomplete
                />
              </Form.Group>
              {errors.password2?.map((message, idx) => (
                <Alert variant="warning" className={styles.Alert} key={idx}>
                  {message}
                </Alert>
              ))}

              <Row className="d-flex justify-content-center">
                <Button className={`${btnStyles.Button} ${styles.Button} mt-3`} type="submit">
                  Sign Up
                </Button>
              </Row>

              {errors.non_field_errors?.map((message, idx) => (
                <Alert variant="warning" className={`${styles.Alert} mt-3`} key={idx}>
                  {message}
                </Alert>
              )) || (
                <Alert variant="warning" className={`${styles.Alert} mt-3`}>
                  Something went wrong. Please try again later.
                </Alert>
              )}
            </Form>

            <Row className="d-flex justify-content-center mt-3">
              <Link className={styles.Link} to="/signin">
                Already have an account? <br />
                <strong>Sign in here!</strong>
              </Link>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpForm;
