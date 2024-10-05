import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container'
import Profile from './pages/Profile'; 
import HomePage from './pages/HomePage';
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
import Gallery from './pages/Gallery';
import AboutPage from './pages/AboutPage';
import './api/axiosDefaults';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/signin" component={SignInForm} />
            <Route exact path="/signup" component={SignUpForm} />
            <Route exact path="/gallery" component={Gallery} />
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/profile/:id" component={Profile} />
            </Switch>
          </Container>
    </div>
  );
}

export default App;

