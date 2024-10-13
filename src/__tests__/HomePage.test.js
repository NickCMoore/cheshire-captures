import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../pages/HomePage'; 

describe('HomePage', () => {
  test('renders the homepage with welcome message', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

 
    const welcomeMessage = screen.getByText(/welcome to cheshire captures/i); 
    expect(welcomeMessage).toBeInTheDocument();
  });

  test('renders featured sections', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );


    const featuredSection = screen.getByText(/featured photos/i); 
    expect(featuredSection).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    const galleryLink = screen.getByRole('link', { name: /gallery/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });

    expect(galleryLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
  });
});
