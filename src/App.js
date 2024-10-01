import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import { AuthProvider } from './contexts/AuthContext';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <AuthProvider>
        <NavBar />
        <Container className={styles.Main}>
          <Switch>
            {/* Home page route */}
            <Route exact path="/" render={() => <h1>Welcome to Cheshire Captures</h1>} />

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

