import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import { AuthProvider } from './contexts/AuthContext';
import Gallery from './pages/Gallery'; 
import styles from './App.module.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <div className={styles.App}>
      <AuthProvider>
        <NavBar />
        <Container className={styles.Main}>
          <Switch>
            {/* Home page route */}
            <Route exact path="/" render={() => <HomePage />} />

            {/* About page route */}
            <Route exact path="/about" render={() => <AboutPage />} />

            {/* Gallery page route */}
            <Route exact path="/gallery" render={() => <Gallery />} /> 

            {/* Sign In route */}
            <Route exact path="/signin" render={() => <SignInForm />} />

            {/* Sign Up route */}
            <Route exact path="/signup" render={() => <SignUpForm />} />

            {/* 404 route for pages not found */}
            <Route render={() => <p>Page not found!</p>} />
          </Switch>
        </Container>
      </AuthProvider>
    </div>
  );
}

export default App;

