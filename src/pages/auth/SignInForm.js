import React, { useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { useHistory } from 'react-router-dom';
import styles from '../../styles/SignInUpForm.module.css'; 

const SignInForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

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
      const response = await axiosReq.post(
        'https://cheshire-captures-backend-084aac6d9023.herokuapp.com/dj-rest-auth/login/',
        formData
      );
      console.log('Response:', response.data);
      history.push('/');
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  };

  return (
    <div className={styles.Background}>
      <div className={styles.FormContainer}>
        <h1 className={styles.Header}>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className={styles.Input}
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={styles.Input}
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit" className={styles.Button}>Sign In</button> {/* Same button class as Sign Up */}
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
