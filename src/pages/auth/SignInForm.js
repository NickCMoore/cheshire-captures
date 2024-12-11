// React imports
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
// Bootstrap imports
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
// CSS imports
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
// Component imports
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
// Axios imports
import axios from "axios";


function SignInForm() {

    const setCurrentUser = useSetCurrentUser();

    const [signInData, setSignInData] = useState({
        username: '',
        password: '',
      });

    const {username, password} = signInData;
    const [errors, setErrors] = useState({});
    const [isLoading] = useState(false);
    const history = useHistory();

    const handleChange = (e) => {
        setSignInData({
          ...signInData,
          [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
          // Log in and get the token
          const { data } = await axios.post('/dj-rest-auth/login/', signInData);
  
          // Save the token (localStorage for this example)
          localStorage.setItem('authToken', data.key);
  
          // Fetch user details
          const userResponse = await axios.get('/dj-rest-auth/user/', {
              headers: {
                  Authorization: `Token ${data.key}`, // Include the token in the request header
              },
          });
  
          // Set the current user
          setCurrentUser(userResponse.data);
  
          // Redirect the user
          history.goBack();
      } catch (err) {
          setErrors(err.response?.data);
      }
  };
  
  

  return (
    <Container fluid className={styles.Background}>
      <Row
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Col xs={12} md={6} lg={4}>
          <div className={styles.FormContainer}>
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
                  required
                  autoComplete="username" // Added autocomplete
                />
              </Form.Group>
              {errors.username?.map((message, idx) => (
                <Alert variant="warning" className={styles.Alert} key={idx}>
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
                  required
                  autoComplete="current-password" // Added autocomplete
                />
              </Form.Group>
              {errors.password?.map((message, idx) => (
                <Alert variant="warning" className={styles.Alert} key={idx}>
                  {message}
                </Alert>
              ))}

              <Row className="d-flex justify-content-center">
                <Button
                  className={`${btnStyles.Button} ${styles.Button} mt-3`}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </Row>

              {errors.non_field_errors?.map((message, idx) => (
                <Alert
                  variant="warning"
                  className={`${styles.Alert} mt-3`}
                  key={idx}
                >
                  {message}
                </Alert>
              ))}
            </Form>

            <Row className="d-flex justify-content-center mt-3">
              <Link className={styles.Link} to="/signup">
                Don&apos;t have an account? <br />
                <span>Sign up now!</span>
              </Link>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SignInForm;
