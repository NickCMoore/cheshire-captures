import styles from '../styles/HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.FullScreenBackground}>
      <div className={styles.FullScreenOverlay}></div>
      <div className={styles.FullScreenContent}>
        <h1>Welcome to Cheshire Captures</h1>
        <p>Capture and share your favorite moments with the community.</p>
        <button className={styles.Button}>Get Started</button>
      </div>
    </div>
  );
};

export default HomePage;
