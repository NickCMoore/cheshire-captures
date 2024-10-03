import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Profile.module.css';

const Profile = () => {
  const { currentUser } = useAuth(); 

  return (
    <div className={styles.Profile}>
      <h1>{currentUser.username}'s Profile</h1>
      <p>Email: {currentUser.email}</p>
    </div>
  );
};

export default Profile;
