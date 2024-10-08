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
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PopularPhotographers from './pages/PopularPhotographers';

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
