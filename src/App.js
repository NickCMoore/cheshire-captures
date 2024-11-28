import React from "react";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch, Redirect } from "react-router-dom";
import "./api/axiosDefaults";
import HomePage from "./pages/HomePage";
import SignInForm from "./pages/auth/SignInForm";
import SignUpForm from "./pages/auth/SignUpForm";
import Gallery from "./pages/Gallery";
import PhotoDetails from "./pages/PhotoDetails";
import AboutPage from "./pages/AboutPage";
import Profile from "./pages/Profile";
import ProfileEdit from './pages/ProfileEdit';
import MyPhotos from './pages/MyPhotos';
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PopularPhotographers from './pages/PopularPhotographers';
import PhotoUpload from './pages/PhotoUpload';
import PhotoEdit from './pages/PhotoEdit';
import ChangePassword from './pages/auth/ChangePassword';
import FollowingList from './pages/FollowerList';


function App() {
  const currentUser = useCurrentUser();

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/gallery" component={Gallery} />
          <Route exact path="/photos/:id" component={PhotoDetails} />
          <Route exact path="/popular-photographers" component={PopularPhotographers} />
          <Route exact path="/about" component={AboutPage} />
          <Route path="/profile/:id/edit" component={ProfileEdit} />
          <Route
            exact
            path="/my-photos"
            render={() =>
              currentUser ? <MyPhotos /> : <Redirect to="/signin" />
            }
          />

          <Route
            exact
            path="/signin"
            render={() =>
              currentUser ? <Redirect to="/" /> : <SignInForm />
            }
          />
          <Route
            exact
            path="/signup"
            render={() =>
              currentUser ? <Redirect to="/" /> : <SignUpForm />
            }
          />
          <Route
            exact
            path="/change-password"
            render={() =>
              currentUser ? <ChangePassword /> : <Redirect to="/signin" />
            }
          />
          <Route
            exact
            path="/upload-photo"
            render={() =>
              currentUser ? <PhotoUpload /> : <Redirect to="/signin" />
            }
          />
          <Route
            exact
            path="/photos/:id/edit"
            render={() =>
              currentUser ? <PhotoEdit /> : <Redirect to="/signin" />
            }
          />
          <Route
            path="/profile/:id/followers"
            render={() =>
              currentUser ? <FollowingList /> : <Redirect to="/signin" />
            }
          />
          <Route
            exact
            path="/profile/:id"
            render={() =>
              currentUser ? <Profile /> : <Redirect to="/signin" />
            }
          />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
