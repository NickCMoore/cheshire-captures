import React, { useState } from 'react';
import axios from 'axios';  
import styles from '../../styles/SignInUpForm.module.css'; 
import { useHistory } from 'react-router-dom';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';

const SignInForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { username, password } = formData;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();

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
      const { data } = await axios.post("/dj-rest-auth/login/", formData, {
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
        <h1 className={styles.Header}>Sign In</h1>

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
            name="password"
            placeholder="Password"
            className={styles.Input}
            value={password}
            onChange={handleChange}
          />
          <button type="submit" className={styles.Button} disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
