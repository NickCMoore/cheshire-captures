import React from 'react';
import { useCurrentUser } from '../contexts/AuthContext'; 
import styles from '../styles/Profile.module.css';

const Profile = () => {
  const currentUser = useCurrentUser(); 

  if (!currentUser) {
    return <p>Loading...</p>; 
  }

  return (
    <div className={styles.Profile}>
      <h1>{currentUser.username}'s Profile</h1>
      <p>Email: {currentUser.email}</p>
    </div>
  );
};

export default Profile;
