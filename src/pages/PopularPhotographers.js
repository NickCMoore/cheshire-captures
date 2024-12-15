import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import styles from "../styles/PopularPhotographers.module.css";

// Function to generate a random location
const getRandomLocation = () => {
  const locations = [
    "New York, USA",
    "Los Angeles, USA",
    "Chicago, USA",
    "Houston, USA",
    "Phoenix, USA",
  ];
  return locations[Math.floor(Math.random() * locations.length)];
};

const PopularPhotographers = () => {
  const [photographers, setPhotographers] = useState([]);
  const [filteredPhotographers, setFilteredPhotographers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        const { data } = await axiosReq.get(
          "/api/photographers/top-photographers/",
        );
        setPhotographers(data.results);
        setFilteredPhotographers(data.results);
      } catch (err) {
        console.error("Error fetching photographers:", err);
      }
    };

    fetchPhotographers();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredPhotographers(
        photographers.filter((photographer) =>
          photographer.display_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
        ),
      );
    } else {
      setFilteredPhotographers(photographers);
    }
  }, [searchQuery, photographers]);

  return (
    <Container>
      <h2 className="my-4">Popular Photographers</h2>
      <SearchBar onSearch={setSearchQuery} />
      <Row className="mt-4">
        {Array.isArray(filteredPhotographers) &&
        filteredPhotographers.length > 0 ? (
          filteredPhotographers.map((photographer) => {
            // Set location to either the photographer's location or a random one
            const location = photographer.location || getRandomLocation();
            return (
              <Col key={photographer.id} md={4} className="mb-4">
                <Card className="shadow-sm profile-card">
                  <Card.Body className="text-center">
                    {/* Display profile picture */}
                    {photographer.profile_image ? (
                      <Card.Img
                        variant="top"
                        src={photographer.profile_image}
                        alt={`${photographer.display_name}'s profile`}
                        className={styles.profilePicture}
                      />
                    ) : (
                      <div className={styles.profilePicturePlaceholder}>
                        No Picture
                      </div>
                    )}
                    <Card.Title className="mt-2">
                      {photographer.display_name}
                    </Card.Title>
                    <Card.Text>
                      {photographer.bio || "No bio available"}
                    </Card.Text>
                    {/* Display location with inline style */}
                    <Card.Text style={{ color: "black" }}>
                      <strong>Location:</strong> {location}
                    </Card.Text>
                    <Link to={`/profile/${photographer.id}`}>
                      <Button variant="primary" className="w-100 mt-2">
                        View Profile
                      </Button>
                    </Link>
                    {currentUser?.username === photographer.user.username && (
                      <Link to={`/profile/${photographer.id}/edit`}>
                        <Button variant="secondary" className="w-100 mt-2">
                          Edit Profile
                        </Button>
                      </Link>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        ) : (
          <p>No photographers found.</p>
        )}
      </Row>
    </Container>
  );
};

export default PopularPhotographers;
