import { render, screen, waitFor } from '@testing-library/react';
import ProfilePage from '../pages/Profile';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
}));

jest.mock('../contexts/CurrentUserContext', () => ({
  useCurrentUser: () => ({ id: 1, username: 'testuser' }),
}));

jest.mock('axios');

test('renders profile page with correct heading', async () => {
  axios.get.mockResolvedValue({
    data: {
      id: 1,
      display_name: 'Cheshire Captures',
      bio: 'A photographer from Cheshire.',
      profile_image: 'profile_image_url',
      user: { username: 'testuser' },
      photos: [],
    },
  });

  render(
    <Router>
      <ProfilePage />
    </Router>
  );

  await waitFor(() => {
    const headingElement = screen.getByText(/cheshire captures/i);
    expect(headingElement).toBeInTheDocument();
  });
});
