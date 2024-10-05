import React, { useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import styles from '../../styles/SignInUpForm.module.css'; // Ensure correct CSS file is used

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });

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
        'https://cheshire-captures-backend-084aac6d9023.herokuapp.com/dj-rest-auth/registration/',
        formData
      );
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className={styles.Background}>
      <div className={styles.FormContainer}>
        <h1 className={styles.Header}>Sign Up</h1>
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
            type="email"
            name="email"
            placeholder="Email"
            className={styles.Input}
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password1"
            placeholder="Password"
            className={styles.Input}
            value={formData.password1}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            className={styles.Input}
            value={formData.password2}
            onChange={handleChange}
          />
          <button type="submit" className={styles.Button}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
