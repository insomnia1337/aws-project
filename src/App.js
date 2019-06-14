import React from "react";
import "./App.css";
import NavBar from "./components/navbar";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import Home from "./components/Home";
import Auth from "./components/Auth"
import { PrivateRoute } from "./components/auth/protected.route";
const auth = new Auth()
console.log(auth);


export default class App extends React.Component {
  state = {
    isLogged: false,
  }

  render(){
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Route path="/login" exact component={SignInForm} />
        <Route path="/register" exact component={SignUpForm} />
        <PrivateRoute path="/home" exact component={Home} />
      </Router>
    </div>
  );
  }
}