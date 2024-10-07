import React, { useState, useContext } from 'react';
import axios from 'axios';  
import styles from '../../styles/SignInUpForm.module.css'; 
import { useHistory } from 'react-router-dom';
import { SetCurrentUserContext } from '../../App';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password1: '',
    password2: '',
  });
  const { username, password1, password2 } = formData;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const setCurrentUser = useContext(SetCurrentUserContext);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/dj-rest-auth/registration/", formData, {
        withCredentials: true,
      });
      setCurrentUser(data.user);
      history.push('/');
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };
  
  return (
    <div className={styles.Background}>
      <div className={styles.FormContainer}>
        <h1 className={styles.Header}>Sign Up</h1>

        {error && (
          <div className={styles.Error}>
            {typeof error === 'object' ? (
              Object.keys(error).map((key) => (
                <p key={key}>{key}: {error[key]}</p>
              ))
            ) : (
              <p>{error}</p>
            )}
          </div>
        )}

        {loading ? <p>Loading...</p> : null}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className={styles.Input}
            value={username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password1"
            placeholder="Password"
            className={styles.Input}
            value={password1}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            className={styles.Input}
            value={password2}
            onChange={handleChange}
          />
          <button type="submit" className={styles.Button} disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
