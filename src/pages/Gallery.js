import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Card,
  Carousel,
  Pagination,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import styles from "../styles/Gallery.module.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9); // 9 items per page

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data } = await axiosReq.get("/api/photos/photos");
        if (data && data.results) {
          setImages(data.results);
          setFilteredImages(data.results);

          const uniqueCategories = [
            ...new Set(
              data.results
                .map((photo) => photo.category)
                .filter((category) => category),
            ),
          ];
          setCategories(uniqueCategories);
        } else {
          setError("No photos available.");
        }
      } catch (err) {
        console.error("Error fetching photos:", err);
        setError("Error fetching photos, please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  useEffect(() => {
    let filtered = images;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((photo) =>
        photo.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (photo) =>
          photo.category?.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    // Filter by date range
    if (startDate && endDate) {
      filtered = filtered.filter((photo) => {
        const photoDate = new Date(photo.created_at);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return photoDate >= start && photoDate <= end;
      });
    }

    setFilteredImages(filtered);
  }, [searchTerm, selectedCategory, startDate, endDate, images]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setStartDate("");
    setEndDate("");
  };

  // Pagination: Get current photos to display based on the page and items per page
  const indexOfLastPhoto = currentPage * itemsPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - itemsPerPage;
  const currentPhotos = filteredImages.slice(indexOfFirstPhoto, indexOfLastPhoto);

  // Change page handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return <div className="text-center">Loading photos...</div>;
  }

  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);

  return (
    <Container className={styles.galleryContainer}>
      {error && <p className="text-danger text-center">{error}</p>}

      {/* Carousel */}
      <Carousel className="mb-4" interval={4000} wrap>
        {images.map((photo) => (
          <Carousel.Item key={photo.id}>
            <Link to={`/photos/${photo.id}`}>
              <img
                className={`d-block w-100 ${styles.carouselImage}`}
                src={photo.image_url}
                alt={photo.title}
              />
            </Link>
            <Carousel.Caption className={styles.carouselCaption}>
              <h5>{photo.title}</h5>
              <p>By: {photo.photographer || "Unknown"}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Filters */}
      <Form className="mb-4">
        <Row>
          <Col md={4}>
            <Form.Group controlId="searchFilter">
              <Form.Label className="text-white">Search</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search photos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="categoryFilter">
              <Form.Label className="text-white">Category</Form.Label>
              <Form.Control
                as="select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="startDateFilter">
              <Form.Label className="text-white">Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="endDateFilter">
              <Form.Label className="text-white">End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={12} className="d-flex justify-content-end">
            <Button variant="warning" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Photo Grid */}
      <Row>
        {currentPhotos.length > 0 ? (
          currentPhotos.map((photo) => (
            <Col key={photo.id} md={4} className="mb-4">
              <Card className={`shadow-sm ${styles.photoCard}`}>
                <Link to={`/photos/${photo.id}`}>
                  <Card.Img
                    variant="top"
                    src={photo.image_url}
                    alt={photo.title}
                    className={styles.photoImage}
                  />
                </Link>
                <Card.Body>
                  <Card.Title>{photo.title}</Card.Title>
                  <Card.Text>By: {photo.photographer || "Unknown"}</Card.Text>
                  <Card.Text className="text-primary">
                    Date:{" "}
                    {new Date(photo.created_at).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No photos found.</p>
        )}
      </Row>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index}
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
      </div>
    </Container>
  );
};

export default Gallery;
