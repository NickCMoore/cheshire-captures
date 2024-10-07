import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import Profile from './pages/Profile'; 
import HomePage from './pages/HomePage';
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
import { useCurrentUser } from './contexts/CurrentUserContext';
import Gallery from './pages/Gallery';
import AboutPage from './pages/AboutPage';
import './api/axiosDefaults';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './App.module.css';


function App() {

  const currentUser = useCurrentUser();


  return (
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={() => <HomePage />} />
              <Route 
                exact 
                path="/signin" 
                render={() => currentUser ? <Redirect to="/" /> : <SignInForm />} 
              />
              <Route 
                exact 
                path="/signup" 
                render={() => currentUser ? <Redirect to="/" /> : <SignUpForm />} 
              />
              <Route exact path="/gallery" render={() => <Gallery />} />
              <Route exact path="/about" render={() => <AboutPage />} />
              <Route 
                exact 
                path="/profile/:id" 
                render={() => currentUser ? <Profile /> : <Redirect to="/signin" />} 
              />
            </Switch>
          </Container>
        </div>
  );
}

export default App;

