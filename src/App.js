import React from 'react';
import './App.css';
import NavBar from './components/navbar';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Route path="/login" exact component={SignInForm} />
        <Route path="/register/" component={SignUpForm} />
      </Router>
    </div>
  );
}

export default App;
