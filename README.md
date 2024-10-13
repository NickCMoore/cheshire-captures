# **_Cheshire Captures_**

**Cheshire Captures** is a full-stack photography community platform designed to connect photographers and photo enthusiasts in Cheshire. Built using Django REST Framework for the backend and React for the frontend, it allows users to create accounts, upload photos, rate and comment on photos, and engage with the photography community. Users can search for photographers, filter by categories, and explore top-rated content.

The backend and frontend are deployed separately on Heroku, with the backend providing a robust API for data management and the frontend delivering an intuitive and responsive user experience.

[View the live platform here](https://cheshire-captures-4a500dc7ab0a.herokuapp.com/).

## Table of Contents

- [Overview](#overview)
   - [Problem Statement](#problem-statement)
   - [Target Audience](#target-audience)
   - [Solution](#solution)
- [Features](#features)
- [User Stories](#user-stories)
   - Navigation & Authentication[#navigation-authentication]
   - [Photos](#photos)
   - [User Stories](#user-stories)
- [Technologies Used](#technologies-used)
   - [Backend](#backend)
   - [Frontend](#frontend)
- [API Endpoints](#api-endpoints)
- [Backend Architecture](#backend-architecture)
- [Frontend Architecture](#frontend-architecture)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Testing](#testing)
- [Troubleshooting & Common Issues](#troubleshooting--common-issues)
- [Contributing](#contributing)
- [License](#license)
- [Credits & Acknowledgements](#credits--acknowledgements)

---

## Overview

Cheshire Captures is a platform that allows photographers to share their work and engage with the local Cheshire community. Users can upload photos, comment, rate, and interact with others. The backend API supports all functionality, while the frontend offers a smooth, mobile-friendly user experience.

### Problem Statement

Photographers often struggle to find platforms tailored to their needs, specifically for sharing high-quality images and connecting with other photographers and potential clients. General social media platforms lack focused tools, leading to missed opportunities and inadequate portfolio visibility.

### Target Audience

- Photographers: Professionals and enthusiasts who want to showcase their work, get feedback, and network with others.
- Photography Enthusiasts: Individuals passionate about photography looking to discover and engage with local photographers.
- Potential Clients: Individuals or businesses seeking photographers for events or collaborations.

### Solution

Cheshire Captures aims to address these challenges by providing a tailored platform where photographers and enthusiasts can:

-  Showcase Work: Easily upload and share high-quality photos, allowing photographers to present their portfolios in an appealing, professional manner.
- Receive Feedback: Enable community engagement through likes, ratings, and comments on photos, fostering a space for constructive criticism and appreciation.
- Network and Collaborate: Connect with fellow photographers through follow features, direct messaging, and discussions, making it easier to collaborate on projects and grow professional networks.
- Promote and Discover: Facilitate a search and filter feature to help users find photographers based on style, location, and popularity, making it easier for potential clients to discover local talent.
- Organise Portfolios: Create user-friendly profile pages where photographers can curate their best work and provide additional information about their services, making them more accessible to clients and collaborators.
- By solving these problems, Cheshire Captures aims to enhance the experience for photographers in the Cheshire area, providing them with a dedicated space to connect, collaborate, and showcase their talent. This platform not only enables better portfolio visibility and professional networking but also strengthens the local photography community by bringing photographers together in a more meaningful way.

### Features

- **User Authentication:** Secure login, registration, and password resets using JWT and dj-rest-auth.
**Profile Management:** Users can update profile details and upload profile pictures.
**Photo Upload & Management: Users can upload photos, add titles, descriptions, categories, and tags.
**Interaction Features:** Comment, like/unlike, and rate photos to engage with others.
**Following System:** Users can follow other photographers.
**Search & Filter:** Search by title, photographer, or category; filter by tags or upload date.
**Top-Rated Photos:** See the most highly rated photos.
**Responsive Design:** The site is mobile-friendly and optimized for all devices.

---

### User Stories

## Navigation/Authentication

1. **Log In:**

   - _Explanation:_ As a user, I can log in so that I can interact fully with the site. `(MUST HAVE)`

   **Acceptance Criteria:**
   
   - Log in form is accessible from any page.
   - User is prompted to enter username and password.
   - Successful log in redirects to the homepage.

2. **Sign Up:**

   - _Explanation:_ As a user, I can sign up so that I can create an account to upload and share my photos. `(MUST HAVE)`

   **Acceptance Criteria:**
   
   - Sign up form is accessible from any page.
   - User is prompted to enter a username, email, and password.
   - Successful sign up redirects to a welcome page.

3. **View Gallery:**

   - _Explanation:_ As a user, I can view the homepage gallery so that I can see a curated list of photos. `(MUST HAVE)`

   **Acceptance Criteria:**
   
   - Homepage displays a grid of recent photos.
   - Each photo shows a thumbnail and basic details.
   - Page loads more photos as the user scrolls.

4. **Photo Details:**

   - _Explanation:_ As a user, I can view details of a single photo so that I can see more information and interactions. `(MUST HAVE)`

   **Acceptance Criteria:**
   
   - Clicking on a photo shows the full-size image.
   - Photo details include title, description, and photographer.
   - User can see interactions like likes and comments.

5. **Popular Photographers:**

   - _Explanation:_ As a user, I can view popular photographers so that I can discover new talents. `(MUST HAVE)`

   **Acceptance Criteria:**
   
   - List of popular photographers based on followers.
   - User can view profile summary of each photographer.
   - User can follow photographers from this page.

6. **Top-Rated Photos:**

   - _Explanation:_ As a user, I can view the top-rated photos so that I know which photos are most appreciated. `(MUST HAVE)`

   **Acceptance Criteria:**
   
   - Displays photos sorted by average rating.
   - Shows the number of ratings for each photo.
   - User can navigate to photo details from here.

7. **Filter Photos:**

   - _Explanation:_ As a user, I can filter photos by category so that I can find photos that match my interests. `(MUST HAVE)`

   **Acceptance Criteria:**
   
   - Categories are displayed as a dropdown or list.
   - User can select one or more categories.
   - Page updates to show only matching photos.

8. **Search Photos:**

   - _Explanation:_ As a user, I can search photos by keywords, photographer, or location so that I can find specific content. `(MUST HAVE)`

   **Acceptance Criteria:**
   
   - Search bar is available on all pages.
   - User can search by keyword, photographer, or location.
   - Search results update in real-time.

9. **View Comments:**

   - _Explanation:_ As a user, I can view comments on a photo so that I can see what other users think about it. `(MUST HAVE)`

   **Acceptance Criteria:**
   
   - Each photo displays a comment count.
   - Clicking on the count shows a list of comments.
   - Comments are sorted by most recent.

## Photos

1. **View My Photos:**

   - _Explanation:_ As a registered user, I can see a list of all my uploaded photos so that I can manage them. `(MUST HAVE)`

   **Acceptance Criteria:**
   
   - Displays all photos uploaded by the user.
   - User can click on a photo to view or edit details.
   - User can filter photos by upload date.

2. **Upload Photo:**

   - _Explanation:_ As a registered user, I can upload a new photo so that I can share my work with the community. `(MUST HAVE)`

   **Acceptance Criteria:**
   
   - Photo upload form is accessible from the user menu.
   - User can upload an image file and add details.
   - Successful upload shows the photo in the gallery.

3. **Edit Photo:**

   - _Explanation:_ As a registered user, I can edit my uploaded photo details so that I can update the information. `(MUST HAVE)`

   **Acceptance Criteria:**
   
   - User can edit details like title and description.
   - Changes are saved and updated immediately.
   - User is notified of successful update.

4. **Delete Photo:**

   - _Explanation:_ As a registered user, I can delete my photos so that I can remove content I no longer want to share. `(MUST HAVE)`

   **Acceptance Criteria:**
   
   - Each photo includes an option to delete.
   - User is prompted to confirm before deletion.
   - Deleted photos are removed from the profile and gallery.

## Likes & Comments

1. **Like Photo:**

   - _Explanation:_ As a registered user, I can like a photo so that I can show my appreciation for it. `(SHOULD HAVE)`

   **Acceptance Criteria:**
   
   - Each photo has a like button for interaction.
   - User can see the total like count for the photo.
   - User can only like a photo once.

2. **Remove Like:**

   - _Explanation:_ As a registered user, I can remove my like from a photo so that I can change my interaction. `(SHOULD HAVE)`

   **Acceptance Criteria:**
   
   - Liked photos have the like button highlighted.
   - Clicking again removes the like and updates the count.
   - User can see all their liked photos in a list.

3. **Add Comment:**

   - _Explanation:_ As a registered user, I can add a comment to a photo so that I can share my thoughts on it. `(SHOULD HAVE)`

   **Acceptance Criteria:**
   
   - Each photo has a comment box below it.
   - User can type a comment and submit.
   - Submitted comments are immediately visible.

4. **Edit Comment:**

   - _Explanation:_ As a registered user, I can edit my comment so that I can correct or update my opinion. `(SHOULD HAVE)`

   **Acceptance Criteria:**
   
   - User can edit their comment by clicking an edit button.
   - Edited comments show an 'edited' label.
   - Changes are saved and visible to all users.

5. **Delete Comment:**

   - _Explanation:_ As a registered user, I can delete my comment so that I can remove it if necessary. `(SHOULD HAVE)`

   **Acceptance Criteria:**
   
   - Each comment has a delete button for the author.
   - User is prompted to confirm before deletion.
   - Deleted comments are removed immediately.

## Following

1. **Follow Photographer:**

   - _Explanation:_ As a registered user, I can follow another photographer so that I can see their new posts in my feed. `(MUST HAVE)`

   **Acceptance Criteria:**
   
   - Each photographer profile has a follow button.
   - Clicking follow adds the photographer to the user feed.
   - Followed photographers' new posts appear in the feed.

2. **Unfollow Photographer:**

   - _Explanation:_ As a registered user, I can unfollow a photographer so that I no longer see their updates. `(MUST HAVE)`

   **Acceptance Criteria:**
   
   - Unfollow button appears for followed photographers.
   - Clicking unfollow removes them from the user feed.
   - User is prompted to confirm the unfollow action.

3. **View Following List:**

   - _Explanation:_ As a registered user, I can view all the photographers I follow so that I can manage my list. `(SHOULD HAVE)`

   **Acceptance Criteria:**
   
   - List of followed photographers is accessible from the menu.
   - Shows recent activity of followed photographers.
   - User can unfollow from this list.

## Reviews

1. **View Top-Rated Photos:**

   - _Explanation:_ As a registered user, I can view all the top-rated photos so that I can discover popular content. `(COULD HAVE)`

   **Acceptance Criteria:**
   
   - Displays photos sorted by average rating.
   - Shows the number of ratings for each photo.
   - User can navigate to photo details from here.

2. **Rate Photo:**

   - _Explanation:_ As a registered user, I can rate a photo so that I can share my opinion on its quality. `(SHOULD HAVE)`

   **Acceptance Criteria:**
   
   - User can rate a photo with stars (1-5).
   - Rating appears on the photo immediately.
   - User can edit or delete their rating.

3. **View My Ratings:**

   - _Explanation:_ As a registered user, I can view all my ratings so that I can manage them. `(COULD HAVE)`

   **Acceptance Criteria:**
   
   - List of user ratings is accessible from the menu.
   - User can view or edit their ratings.
   - User can delete any of their ratings.

## Profiles

1. **View Profile:**

   - _Explanation:_ As a user, I can view the profile page of a photographer so that I can see more details about their work. `(MUST HAVE)`

   **Acceptance Criteria:**
   
   - Displays profile information of the photographer.
   - Shows their photos, bio, and social links.
   - User can follow/unfollow from the profile page.

2. **Update Profile:**

   - _Explanation:_ As a registered user, I can update my profile information so that I can keep my details up-to-date. `(SHOULD HAVE)`

   **Acceptance Criteria:**
   
   - Profile edit form accessible from the user menu.
   - User can update bio, profile picture, and social links.
   - Changes are saved and updated immediately.

3. **Change Password:**

   - _Explanation:_ As a registered user, I can change my password so that I can keep my account secure. `(MUST HAVE)`

   **Acceptance Criteria:**
   
   - Password change form is accessible from user settings.
   - User must enter the current password for verification.
   - User can set a new password after verification.

## Messages

1. **View Messages:**

   - _Explanation:_ As a registered user, I can view messages in my profile page so that I can read messages other users have sent me. `(COULD HAVE)`

   **Acceptance Criteria:**
   
   - User can access inbox from the profile page.
   - Shows list of received messages sorted by date.
   - User can click on a message to view details.

2. **Send Message:**

   - _Explanation:_ As a registered user, I can send a message to another user so that I can ask a question about their work. `(SHOULD HAVE)`

   **Acceptance Criteria:**
   
   - Message form accessible from user profile or photo.
   - User can type and send a message to another user.
   - Message appears in the recipient's inbox immediately.

3. **Delete Message:**

   - _Explanation:_ As a registered user, I can delete a message so that I can remove it from my inbox. `(COULD HAVE)`

   **Acceptance Criteria:**
   
   - Each message has a delete option.
   - User is prompted to confirm deletion.
   - Deleted messages are removed from the inbox.


## Agile Approach

The development process for Cheshire Captures followed Agile methodology, emphasising continuous improvement throughout the development lifecycle.

### Project Management

GitHub Projects served as the primary Agile tool for managing the development tasks. While GitHub Projects isn't a specialised Agile tool, it was used with the right tags, project creation, and issue assignments to fit the needs of the project.

![GitHub Projects](/documentation/project-management.png)
![GitHub Projects (Final)](/documentation/project-managementfinal.png)
![GitHub Issues](/documentation/issues.png)

### User Stories Mapping

User stories were crucial in mapping out the development progress. They were categorised into EPICs A, B, C, D, E, and F based on user types and content specificity. The user stories were organised on a Kanban board, providing a visual representation of the backlog and the current status of tasks. The MoSCoW method was used to prioritise these stories, categorising them into Must have, Should have, Could have, and Won't have, ensuring that the most critical features were developed first.

### Kanban Board

The basic Kanban board in GitHub Projects (see above) helped visualise the workflow and track the progress of tasks. Tasks moved across columns from the backlog, through development stages, to testing, and finally to completion. This setup provided clarity on the workload and helped in managing the project efficiently.

### Continuous Improvement

Despite working solo on this project, continuous improvement was a key focus. Regular retrospectives allowed reflection on past work, identification of areas for improvement, and thinking through possible solutions. This practice ensured that the development processes and product quality were consistently enhanced.

For a detailed view of the project management and task progression, refer to the [GitHub Project board](https://github.com/users/NickCMoore/projects/2).


## Technologies Used

### Backend

- **Django**: A Python framework for rapid development.
- **Django REST Framework**: For creating a RESTful API.
- **PostgreSQL**: Database for managing user, photo, and interaction data.
- **Cloudinary**: For handling image uploads and storage.
- **Heroku**: Deployment platform for the backend.

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **React-Bootstrap**: For a responsive design.
- **Axios**: For API requests.
- **FontAwesome**: For icons throughout the application.
- **Heroku**: Deployment platform for the frontend.

---

## API Endpoints

### Authentication

- **Login**: `POST /dj-rest-auth/login/`
- **Logout**: `POST /dj-rest-auth/logout/`
- **Registration**: `POST /dj-rest-auth/registration/`
- **Password Change**: `POST /dj-rest-auth/password/change/`
- **Password Reset**: `POST /dj-rest-auth/password/reset/`
- **Token Refresh**: `POST /dj-rest-auth/token/refresh/`

### Photos

- **Get All Photos**: `GET /api/photos/photos/`
- **Create a Photo**: `POST /api/photos/photos/`
- **Get My Photos**: `GET /api/photos/photos/my_photos/`
- **Top-Rated Photos**: `GET /api/photos/photos/top-rated/`
- **Photo Details**: `GET /api/photos/photos/{id}/`
- **Edit Photo**: `PUT /api/photos/photos/{id}/`
- **Delete Photo**: `DELETE /api/photos/photos/{id}/`
- **Rate Photo**: `POST /api/photos/photos/{id}/rate/`
- **Like Photo**: `POST /api/photos/photos/{id}/like/`
- **Unlike Photo**: `POST /api/photos/photos/{id}/unlike/`

### Comments

- **Get Comments**: `GET /api/photos/comments/`
- **Create a Comment**: `POST /api/photos/comments/`
- **Delete a Comment**: `DELETE /api/photos/comments/{id}/`

### Follows

- **Get All Follows**: `GET /api/photographers/follows/`
- **Follow a Photographer**: `POST /api/photographers/follows/`
- **Unfollow a Photographer**: `POST /api/photographers/follows/{id}/unfollow/`

---

## Backend Architecture

### Models

- **User**: Includes user information and authentication.
- **Photographer**: Extends the user model with profile-specific data.
- **Photo**: Represents uploaded photos, with attributes like title, description, image URL, and ratings.
- **Comment**: Represents user comments on photos.
- **Like**: Stores user likes on photos.
- **Follow**: Manages following relationships between photographers.

### Pagination

- **StandardResultsSetPagination**: Used for paginating results in various endpoints.

### Filtering & Searching

- Utilises `django-filters` for filtering by category, tags, and date ranges.
- Supports search queries for photo titles, descriptions, and photographers.

---

## Frontend Architecture

### Key Components

- **NavBar**: Provides navigation across the app based on user authentication status.
- **PhotoDetails**: Displays detailed information about a specific photo, including comments and ratings.
- **Profile**: Shows a photographer’s profile information and their photos.
- **MyPhotos**: Displays a logged-in user's uploaded photos with options to filter by upload date.
- **Gallery**: A carousel-based gallery that displays photos.

### Routing

- Uses `react-router-dom` for routing:
  - `"/"`: Home page.
  - `"/signin"`: Sign in page.
  - `"/signup"`: Registration page.
  - `"/gallery"`: Displays all photos.
  - `"/photos/:id"`: Photo details page.
  - `"/profile/:id"`: User profile page.
  - `"/profile/:id/edit"`: Edit profile page.
  - `"/my-photos"`: View and manage photos uploaded by the user.

---

## Setup & Installation

### Prerequisites

- **Backend**: Python 3.8+, PostgreSQL, Cloudinary account.
- **Frontend**: Node.js, npm.

## Backend Setup

### Prerequisites

- Python 3.10 or newer
- Django 4.2 or newer
- PostgreSQL 13 or newer
- Git

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/NickCMoore/cheshire-captures-backend.git
   cd cheshire-captures-backend
Set Up a Virtual Environment

Create and activate a virtual environment:

    ```bash
python3 -m venv venv
source venv/bin/activate  # For Windows use: venv\Scripts\activate
Install Dependencies

Install the required packages:

    ```bash
pip install -r requirements.txt```

Set Up the Environment Variables

Create a .env file in the root of the project and add the following:

php

SECRET_KEY=<your-django-secret-key>
DATABASE_URL=postgres://<username>:<password>@<hostname>:<port>/<database_name>
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost
Apply Migrations

```bash
python manage.py migrate
Create a Superuser

```bash
python manage.py createsuperuser
Run the Development Server

```bash
python manage.py runserver
The backend will be available at http://127.0.0.1:8000.

Deployed Backend
The backend is also deployed to Heroku for production use. The following configurations are applied in production:

DEBUG=False
WhiteNoise is used for serving static files.
PostgreSQL is used as the production database.
Environment variables are set directly in the Heroku dashboard.
API Documentation
The API documentation is available at:

Cheshire Captures API Documentation

Base URL
arduino

https://8000-nickcmoore-cheshirecapt-1t388js0qvn.ws-eu116.gitpod.io/api/
Endpoints Overview
Here is a summary of the available endpoints:

Messages

GET /api/messages/messages/
POST /api/messages/messages/
GET /api/messages/messages/{id}/
PUT /api/messages/messages/{id}/
PATCH /api/messages/messages/{id}/
DELETE /api/messages/messages/{id}/
Photographers

GET /api/photographers/photographers/
GET /api/photographers/photographers/top/
GET /api/photographers/photographers/{id}/
PUT /api/photographers/photographers/{id}/
PATCH /api/photographers/photographers/{id}/
Photos

GET /api/photos/photos/
POST /api/photos/photos/
GET /api/photos/photos/my_photos/
GET /api/photos/photos/top-rated/
GET /api/photos/photos/{id}/
PUT /api/photos/photos/{id}/
PATCH /api/photos/photos/{id}/
DELETE /api/photos/photos/{id}/
POST /api/photos/photos/{id}/comments/
POST /api/photos/photos/{id}/like/
POST /api/photos/photos/{id}/rate/
POST /api/photos/photos/{id}/unlike/
Comments

GET /api/photos/comments/
POST /api/photos/comments/
GET /api/photos/comments/{id}/
PUT /api/photos/comments/{id}/
PATCH /api/photos/comments/{id}/
DELETE /api/photos/comments/{id}/
Likes

GET /api/photos/likes/
POST /api/photos/likes/
GET /api/photos/likes/{id}/
PUT /api/photos/likes/{id}/
PATCH /api/photos/likes/{id}/
DELETE /api/photos/likes/{id}/
Authentication Endpoints (dj-rest-auth)
POST /dj-rest-auth/login/
POST /dj-rest-auth/logout/
POST /dj-rest-auth/password/change/
POST /dj-rest-auth/password/reset/
POST /dj-rest-auth/password/reset/confirm/
POST /dj-rest-auth/registration/
POST /dj-rest-auth/registration/resend-email/
POST /dj-rest-auth/registration/verify-email/
POST /dj-rest-auth/token/refresh/
POST /dj-rest-auth/token/verify/
GET /dj-rest-auth/user/
PUT /dj-rest-auth/user/
PATCH /dj-rest-auth/user/
Frontend Setup
Prerequisites
Node.js 18.x or newer
npm 8.x or newer
Git
Installation
Clone the Frontend Repository

```bash
git clone https://github.com/NickCMoore/cheshire-captures-frontend.git
cd cheshire-captures-frontend
Install Dependencies

```bash
npm install
Environment Variables

Create a .env file in the root of the project and add:

arduino

REACT_APP_API_URL=http://127.0.0.1:8000/api/
Run the Development Server

```bash
npm start
The frontend will be available at http://localhost:3000.

Deployed Frontend
The frontend is deployed on Heroku as well. The production URL is configured to use the deployed backend.

Features
User Authentication: Users can sign up, log in, and log out.
View Photos: Users can browse a gallery of photos.
Search and Filter: Search by title, description, or tags.
View Photo Details: Click on any photo to see details, comments, and ratings.
Upload Photos: Users can upload their own photos.
Profile Management: Edit profile details, including profile picture, social links, and bio.
Rate and Comment: Users can rate photos and leave comments.
Follow Photographers: Follow other photographers and view their profiles.
Top Rated Photos: A view for the most highly rated photos.
View My Photos: Users can see and manage their uploaded photos.
Technologies Used
Frontend: React, React Router, Bootstrap
Backend: Django, Django REST Framework, PostgreSQL
Authentication: dj-rest-auth, JWT
Deployment: Heroku for both frontend and backend
Media Storage: Cloudinary for image uploads
Testing
To run the Django backend tests:

```bash
python manage.py test
To test the frontend, use the following:

```bash
npm test
Deployment
Frontend Deployment to Heroku
Create a new Heroku app:

```bash
heroku create cheshire-captures-frontend
Push to Heroku:

```bash
git push heroku main
Set environment variables in Heroku:

```bash
heroku config:set REACT_APP_API_URL=<backend-production-url>
Backend Deployment to Heroku
Create a new Heroku app:

```bash
heroku create cheshire-captures-backend
Push to Heroku:

```bash
git push heroku main
Set environment variables in Heroku:

```
heroku config:set SECRET_KEY=<your-django-secret-key>
heroku config:set DEBUG=False
License
This project is licensed under the BSD License. See the LICENSE file for details.

Contact
For questions or support, please reach out to:

NickCMoore: GitHub Profile