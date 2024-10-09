import React from 'react';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import styles from '../styles/HomePage.module.css';

const HomePage = () => {
  const currentUser = useCurrentUser();

  return (
    <div className={styles.FullScreenBackground}>
      <div className={styles.FullScreenOverlay}></div>
      <div className={styles.FullScreenContent}>
        <h1>Welcome to Cheshire Captures</h1>
        <p>Capture and share your favourite moments with the community.</p>
        {!currentUser && (
          <Link to="/signup">
            <button className={styles.Button} aria-label="Sign up and get started">
              Get Started
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomePage;
