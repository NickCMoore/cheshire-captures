import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import styles from "../styles/Profile.module.css";

const ProfilePage = () => {
  const { id } = useParams();
  const [photographer, setPhotographer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotographer = async () => {
      try {
        const { data } = await axios.get(
          `/api/photographers/photographers/${id}/`,
        );
        setPhotographer(data);
      } catch (error) {
        console.error("Error fetching photographer:", error);
        setError(
          "There was an issue loading the photographer details. Please try again later.",
        );
      }
    };
    fetchPhotographer();
  }, [id]);

  // Generate a random default location in the US
  const getDefaultLocation = () => {
    const defaultLocations = [
      "New York, USA",
      "Los Angeles, USA",
      "Chicago, USA",
      "Houston, USA",
      "Phoenix, USA",
    ];
    return defaultLocations[
      Math.floor(Math.random() * defaultLocations.length)
    ];
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!photographer) return <p>Loading...</p>;

  // Set location to a default if none exists
  const location = photographer.location || getDefaultLocation();

  return (
    <Container className={styles.profileContainer}>
      <Row className="justify-content-center my-5">
        <Col md={4} className="text-center">
          <Card className="p-4 shadow-sm">
            <Image
              src={photographer.profile_image}
              alt={`${photographer.display_name}'s profile image`}
              roundedCircle
              className={styles.profileImage}
            />
            <h2 className={styles.blueHeading}>{photographer.display_name}</h2>
            <p className={`${styles.bio} mt-2`}>{photographer.bio}</p>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="p-4 shadow-sm mb-4">
            <p style={{ color: "black" }}>
              <strong>Location:</strong> {location}
            </p>
          </Card>
          <Card className="p-4 shadow-sm">
            <h3>Social Links</h3>
            <ul className={styles.socialLinks}>
              {photographer.website && (
                <li>
                  <a
                    href={photographer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Website
                  </a>
                </li>
              )}
              {photographer.instagram && (
                <li>
                  <a
                    href={photographer.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </li>
              )}
              {photographer.twitter && (
                <li>
                  <a
                    href={photographer.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                </li>
              )}
            </ul>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
