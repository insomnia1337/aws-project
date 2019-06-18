import React from "react";
import "./App.css";
import NavBar from "./components/navbar";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/Routes";
import Auth from './components/auth/Auth'
import AWS from "aws-sdk";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { poolData, identityPoolId, region, bucketRegion, bucketName } from './env.js';
import StickyFooter from "./components/footer/footer";
const userPool = new CognitoUserPool(poolData);


const creds = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: identityPoolId
});

AWS.config.update({
    region: region,
    credentials: creds
});

const auth = new Auth(userPool, creds);

 export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false
    };
  }

  userHasAuthenticated = authenticated => {
    this.setState({
      isAuthenticated: authenticated
    });
  };

  handleLogout = async event => {
    debugger;
    await auth.logOut();
    this.userHasAuthenticated(false);
    debugger;
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      <div className="App">
        <Router>
          <NavBar
            handleLogout={this.handleLogout}
            isAuthenticated={this.state.isAuthenticated}
          />
          <Routes childProps={childProps} />
        </Router>
          <StickyFooter/>
      </div>
    );
  }
}
