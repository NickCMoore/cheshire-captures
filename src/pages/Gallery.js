import styles from './Gallery.module.css';

export default function Gallery({ photos }) {
  return (
    <div className={styles.PhotoGrid}>
      {photos.map((photo, index) => (
        <img key={index} src={photo.url} alt={photo.title} className={styles.Photo} />
      ))}
    </div>
  );
}
