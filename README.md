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
   - [Navigation & Authentication](#navigationauthentication)
   - [Photos](#photos)
   - [Likes & Comments](#likescomments)
   - [Following](#following)
   - [Reviews](#reviews)
   - [Profiles](#profiles)
   - [Messages](#messages)
- [Agile Approach](#agile-approach)
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

## Likes/Comments

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
- **Resend Registration Email**: `POST /dj-rest-auth/registration/resend-email/`
- **Verify Registration Email**: `POST /dj-rest-auth/registration/verify-email/`
- **Password Change**: `POST /dj-rest-auth/password/change/`
- **Password Reset**: `POST /dj-rest-auth/password/reset/`
- **Password Reset Confirm**: `POST /dj-rest-auth/password/reset/confirm/`
- **Token Refresh**: `POST /dj-rest-auth/token/refresh/`
- **Token Verify**: `POST /dj-rest-auth/token/verify/`
- **User Details**: `GET /dj-rest-auth/user/`
- **Update User**: `PUT /dj-rest-auth/user/`
- **Partial Update User**: `PATCH /dj-rest-auth/user/`

### Photos

- **Get All Photos**: `GET /api/photos/photos/`
- **Create a Photo**: `POST /api/photos/photos/`
- **Get My Photos**: `GET /api/photos/photos/my_photos/`
- **Top-Rated Photos**: `GET /api/photos/photos/top-rated/`
- **Photo Details**: `GET /api/photos/photos/{id}/`
- **Edit Photo**: `PUT /api/photos/photos/{id}/`
- **Partial Update Photo**: `PATCH /api/photos/photos/{id}/`
- **Delete Photo**: `DELETE /api/photos/photos/{id}/`
- **Rate Photo**: `POST /api/photos/photos/{id}/rate/`
- **Get Photo Ratings**: `GET /api/photos/photos/{id}/ratings/`
- **Like Photo**: `POST /api/photos/photos/{id}/like/`
- **Unlike Photo**: `POST /api/photos/photos/{id}/unlike/`
- **Get Photo Comments**: `GET /api/photos/photos/{id}/comments/`
- **Create Photo Comment**: `POST /api/photos/photos/{id}/comments/`
- **Get Photo Tags**: `GET /api/photos/tags/`
- **Create Photo Tag**: `POST /api/photos/tags/`

### Comments

- **Get All Comments**: `GET /api/photos/comments/`
- **Create a Comment**: `POST /api/photos/comments/`
- **Delete a Comment**: `DELETE /api/photos/comments/{id}/`

### Follows

- **Get All Follows**: `GET /api/photographers/follows/`
- **Follow a Photographer**: `POST /api/photographers/follows/`
- **Unfollow a Photographer**: `POST /api/photographers/follows/{id}/unfollow/`

### Photographers

- **Get All Photographers**: `GET /api/photographers/photographers/`
- **Photographer Details**: `GET /api/photographers/photographers/{id}/`
- **Update Photographer**: `PUT /api/photographers/photographers/{id}/`
- **Partial Update Photographer**: `PATCH /api/photographers/photographers/{id}/`
- **Follow a Photographer**: `POST /api/photographers/photographers/{id}/follow/`
- **Unfollow a Photographer**: `DELETE /api/photographers/photographers/{id}/follow/`
- **Get Photographer's Followers**: `GET /api/photographers/photographers/{id}/followers/`
- **Top Photographers**: `GET /api/photographers/top-photographers/`

### Messages

- **Get All Messages**: `GET /api/messages/messages/`
- **Create a Message**: `POST /api/messages/messages/`
- **Message Details**: `GET /api/messages/messages/{id}/`
- **Update Message**: `PUT /api/messages/messages/{id}/`
- **Partial Update Message**: `PATCH /api/messages/messages/{id}/`
- **Delete Message**: `DELETE /api/messages/messages/{id}/`


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
  - `"/top-rated"`: Displays top-rated photos.
  - `"/popular-photographers"`: View popular photographers.
  - `"/search"`: Search for photos or photographers by keyword.
  - `"/comments/:photoId"`: View comments for a specific photo.
  - `"/messages"`: View all messages.
  - `"/messages/:id"`: View specific message details.


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

## Testing

Please click here to read more information about testing Cheshire Captures

# Deployment Guide

## Deployment to Heroku

Once you have set up a new Gitpod workspace and your project is ready, follow the steps below to deploy your application to Heroku.

### Step 1: Create a New Heroku App

1. Log in to your Heroku account.
2. On the dashboard, click the **Create New App** button.
3. Choose a **unique name** for your app that relates to your project.
4. Select the appropriate **region** based on your location.
5. Click **Create App** to proceed.

### Step 2: Deploy the Application

1. After creating the app, navigate to the **Deploy** tab in Heroku.
2. In the **Deployment method** section, choose **GitHub**.
3. Connect your GitHub account (if not already connected) and find your **project repository**.
4. Once connected, select the branch you wish to deploy (usually `main` or `master`) and click **Deploy Branch**.
5. Heroku will now start building your application. Wait for the **build succeeded** message.
6. After the build is complete, click **Open App** to view your application in the browser.

## Connecting React Frontend to the API Backend

Once the basic deployment is complete, follow these steps to connect your React frontend to your API backend for seamless data exchange.

### Step 1: Set Environment Variables in Heroku

1. In your Heroku dashboard, navigate to your **API application's settings**.
2. Scroll down to the **Config Vars** section and click **Reveal Config Vars**.
3. Add the following config variables:
   - **CLIENT_ORIGIN**: This should be the URL of your deployed React application (e.g., `https://myapp-react.herokuapp.com`).
   - **CLIENT_ORIGIN_DEV**: This is the URL of your Gitpod workspace (e.g., `https://3000-yourproject.gitpod.io`). Make sure to remove any trailing slashes from the URL.

   > **Note:** Gitpod occasionally changes this URL, so make sure to update this config variable as needed during development.

### Step 2: Set Up Axios in React

1. In your React frontend Gitpod workspace, open a terminal and install Axios by running:

```bash
npm install axios
```

2. Create a folder named API and inside it, create a file called axiosDefaults.js.

3. In axiosDefaults.js, set up Axios defaults by importing Axios and configuring the base URL for your API:

```
import axios from 'axios';

axios.defaults.baseURL = 'https://your-api-backend.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;
```

Note: Replace 'https://your-api-backend.herokuapp.com/' with the actual URL of your deployed API project.

4. To ensure Axios is set up across your React app, import this file into your main App.js file:

```
import './API/axiosDefaults';
```

5. Now, your React frontend is ready to communicate with the API backend for sending and receiving data, including handling images with the correct content type.

## Forking the Project Repository

If you'd like to make an independent copy of the project repository, you can fork it on GitHub. Forking allows you to make changes to the repository without affecting the original.

### Steps to Fork a Repository:

1. Log into your GitHub account and navigate to the repository you want to fork.
2. In the top-right corner of the repository page, click the **Fork** button.
3. GitHub will create a copy of the original repository under your account, allowing you to modify it independently.
4. Once forked, you can make changes to your copy without impacting the original project.

## Cloning the Project Repository

A Git clone creates a local copy of a GitHub repository on your machine that stays linked to the original repository. This allows you to pull updates and push changes as needed.

### Steps to Clone a Repository:

1. On the GitHub repository page, click the **Code** button.
2. In the dropdown, select **Clone** and choose your preferred method:
   - **HTTPS**: Copy the HTTPS link to clone the repository.
   - **SSH**: Use SSH for a secure connection if you have it set up.
3. Open a terminal and run the following command to clone the repository:

   ```bash
   git clone https://github.com/your-username/repository-name.git
   ```

Note: Replace your-username and repository-name with your GitHub username and the repository name.

4. After cloning, navigate into the project directory:

```
cd repository-name
```
5. You can now make changes to the project locally. Any updates you make can be pushed back to the repository.
