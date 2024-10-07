import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import logo from "../../assets/cc-logo.png";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { setTokenTimestamp } from "../../utils/Utils";
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

  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("dj-rest-auth/registration/", signUpData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      history.push("/"); // Redirect to homepage or profile after successful signup
    } catch (err) {
      setErrors(err.response?.data || {});
    }
  };

  return (
    <Container className={`${appStyles.Content} p-4`}>
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <Image src={logo} className="mb-4" />
          <h1 className={styles.Header}>Sign Up</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="sr-only">Username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                name="username"
                placeholder="Enter username"
                value={username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password1">
              <Form.Label className="sr-only">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                name="password1"
                placeholder="Enter password"
                value={password1}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password2">
              <Form.Label className="sr-only">Confirm Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                name="password2"
                placeholder="Confirm password"
                value={password2}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} mt-3`}
              type="submit"
              variant="primary"
            >
              Sign Up
            </Button>

            {errors.non_field_errors?.map((message, idx) => (
              <Alert variant="warning" className="mt-3" key={idx}>
                {message}
              </Alert>
            ))}
          </Form>

          <div className="mt-4">
            <Link to="/signin">
              Already have an account? <strong>Sign in here!</strong>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpForm;
