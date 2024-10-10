import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

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

export default SearchBar;
