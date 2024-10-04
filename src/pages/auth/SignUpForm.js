import React, { useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });

  const getCSRFToken = () => {
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
    return cookieValue ? cookieValue.split('=')[1] : null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const csrfToken = getCSRFToken();
    console.log('CSRF Token:', csrfToken); 

    if (!csrfToken) {
      console.error('CSRF token missing');
      return;
    }

    try {
      const response = await axiosReq.post(
        'https://cheshire-captures-backend-084aac6d9023.herokuapp.com/dj-rest-auth/registration/',
        formData,
        {
          headers: {
            'X-CSRFToken': csrfToken,
          },
        }
      );
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        name="password1"
        placeholder="Password"
        value={formData.password1}
        onChange={(e) => setFormData({ ...formData, password1: e.target.value })}
      />
      <input
        type="password"
        name="password2"
        placeholder="Confirm Password"
        value={formData.password2}
        onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
