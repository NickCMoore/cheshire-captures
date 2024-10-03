import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import { AuthProvider } from './contexts/AuthContext'; 
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
import Gallery from './pages/Gallery'; 
import styles from './App.module.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider> 
      <div className={styles.App}>
        <NavBar />
        <Container className={styles.Main}>
          <Switch>
            <Route exact path="/" render={() => <HomePage />} />
            <Route exact path="/about" render={() => <AboutPage />} />
            <Route exact path="/gallery" render={() => <Gallery />} /> 
            <Route exact path="/signin" render={() => <SignInForm />} />
            <Route exact path="/signup" render={() => <SignUpForm />} />
            <Route exact path="/profile" render={() => <Profile />} />
            <Route render={() => <p>Page not found!</p>} />
          </Switch>
        </Container>
      </div>
    </AuthProvider>
  );
}

export default App;
