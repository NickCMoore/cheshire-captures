import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <Form className="d-flex" onSubmit={handleSearch}>
      <FormControl
        type="search"
        placeholder="Search..."
        className="me-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  );
};

// Define propTypes
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
