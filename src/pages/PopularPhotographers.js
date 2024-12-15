import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { Container, Row, Col, Card, Button, Pagination } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import styles from "../styles/PopularPhotographers.module.css";

const PopularPhotographers = () => {
  const [photographers, setPhotographers] = useState([]);
  const [filteredPhotographers, setFilteredPhotographers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [photographersPerPage, setPhotographersPerPage] = useState(6); // Number of photographers per page
  const [totalPages, setTotalPages] = useState(1);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        const { data } = await axiosReq.get(
          `/api/photographers/top-photographers/`
        );
        setPhotographers(data.results);
        setTotalPages(Math.ceil(data.count / photographersPerPage)); // Calculate total pages
      } catch (err) {
        console.error("Error fetching photographers:", err);
      }
    };

    fetchPhotographers();
  }, [photographersPerPage]);

  useEffect(() => {
    let filtered = photographers;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((photographer) =>
        photographer.display_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPhotographers(filtered);
  }, [searchQuery, photographers]);

  // Pagination: Get the photographers to display based on current page and items per page
  const indexOfLastPhotographer = currentPage * photographersPerPage;
  const indexOfFirstPhotographer = indexOfLastPhotographer - photographersPerPage;
  const currentPhotographers = filteredPhotographers.slice(
    indexOfFirstPhotographer,
    indexOfLastPhotographer
  );

  // Change page handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <h2 className="my-4">Popular Photographers</h2>
      <SearchBar onSearch={setSearchQuery} />
      <Row className="mt-4">
        {currentPhotographers.length > 0 ? (
          currentPhotographers.map((photographer) => (
            <Col key={photographer.id} md={4} className="mb-4">
              <Card className="shadow-sm profile-card">
                <Card.Body className="text-center">
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
                  <Card.Text style={{ color: "black" }}>
                    <strong>Location:</strong> {photographer.location}
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
          ))
        ) : (
          <p>No photographers found.</p>
        )}
      </Row>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-4">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}
    </Container>
  );
};

export default PopularPhotographers;
