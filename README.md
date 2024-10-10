# Cheshire Captures

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [User Stories](#user-stories)
- [Technologies Used](#technologies-used)
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

**Cheshire Captures** is a full-stack photography community platform designed to connect photographers and photo enthusiasts. Built using Django REST Framework and React, it allows users to create accounts, upload photos, rate, comment, and interact with the photography community. Users can filter photos by category, search for photographers or photos, and view top-rated content.

Both the backend and frontend are deployed separately on Heroku, with the backend providing a robust API for data management and the frontend delivering an intuitive and responsive user experience.

---

## Features

- **User Authentication**: Secure login and registration using JWT and dj-rest-auth, with functionality for password resets.
- **Profile Management**: Users can update profile details, upload profile pictures, and add social media links.
- **Photo Upload & Management**: Users can upload photos, add titles, descriptions, categories, and tags.
- **Commenting & Liking**: Users can comment on photos and like/unlike photos to engage with other community members.
- **Photo Rating**: Users can rate photos, which helps to highlight top-rated photos on the platform.
- **Following System**: Users can follow other photographers and see their content in a personalised feed.
- **Filtering & Searching**: Users can search for photos by title, category, or photographer and filter photos by tags or date.
- **Responsive Design**: Mobile-friendly UI ensures a seamless experience across devices.

---

## User Stories

1. **User Authentication**
   - _As a user, I want to create an account and log in securely so that I can access personalised features._

2. **Photo Gallery**
   - _As a user, I want to view a gallery of photos so that I can explore different styles of photography._

3. **Upload Photos**
   - _As a user, I want to upload my photos so that I can share my work with the community._

4. **Photo Rating**
   - _As a user, I want to rate photos so that I can appreciate the work of other photographers._

5. **Photo Comments**
   - _As a user, I want to comment on photos so that I can provide feedback and interact with others._

6. **Follow Photographers**
   - _As a user, I want to follow other photographers so that I can see their latest photos._

7. **Filter Photos**
   - _As a user, I want to filter photos by category so that I can find photos that match my interests._

8. **Search Functionality**
   - _As a user, I want to search for photos by title or photographer so that I can find specific content._

9. **Manage My Photos**
   - _As a user, I want to view and manage all my uploaded photos so that I can edit or delete them._

10. **Top-Rated Photos**
    - _As a user, I want to see the top-rated photos so that I can discover the best content._

---

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