import React from 'react';
import styles from '../styles/AboutPage.module.css';

const AboutPage = () => {
  return (
    <div className={styles.AboutPage}>
      <div className={styles.Container}>
        <h1 className={styles.Header}>About Cheshire Captures</h1>
        <p>
          Welcome to <strong>Cheshire Captures</strong>, a vibrant and passionate community of landscape photographers who find inspiration in the breathtaking natural beauty of Cheshire. Established in 2022, Cheshire Captures was born out of a desire to connect like-minded individuals who share a love for photography and the stunning landscapes that surround us.
        </p>

        <h2>Our Mission</h2>
        <p>
          At Cheshire Captures, our mission is simple: to provide a platform for photographers to showcase their work, share ideas, and inspire one another. We believe that through collaboration and shared experiences, photographers of all skill levels can grow and refine their craft while celebrating the unique beauty of our local area.
        </p>

        <h2>What We Do</h2>
        <p>
          We organise meet-ups, photography workshops, and expeditions to some of Cheshire&apos;s most picturesque locations. From the rolling hills and quaint villages to the dynamic skies and vast open fields, there&apos;s no shortage of inspiring spots to capture.
        </p>

        <h2>Our Values</h2>
        <p>
          We are committed to fostering a supportive, inclusive, and respectful community. Whether you&apos;re a seasoned professional or just starting with your first camera, you&apos;ll find a welcoming space to share your journey. 
        </p>

        <h2>Join Us</h2>
        <p>
          Whether you&apos;re an experienced photographer or someone who loves the art of capturing the beauty around us, we invite you to join Cheshire Captures. Explore our galleries, connect with fellow photographers, and experience the natural beauty of Cheshire through the lens of our passionate community.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
