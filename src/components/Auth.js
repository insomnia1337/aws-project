import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute
} from "amazon-cognito-identity-js";
import { loginProviderName } from "../env.js";
import React, { Component } from "react";

export default class Auth extends Component {
  constructor(userPool, credentials, cognitoUser) {
    super();
    this.cognitoUser = cognitoUser;
    this.userPool = userPool;
    this.credentials = credentials;
    this.authenicated = false;
  }

  signInUser(userName, password) {
    const authenticationDetails = new AuthenticationDetails({
      Username: userName,
      Password: password
    });

    const cognitoUser = new CognitoUser({
      Username: userName,
      Pool: this.userPool
    });
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => {
        console.log("nice logged");
        this.authenicated = true;
      },
      onFailure: err => {
        this.authenicated = false;
        console.log(err);
        // alert(err);
      }
    });
  }
  isAuthenticated() {
    return this.authenicated;
  }

  logout() {
      debugger;
    const cognitoUser = this.userPool.getCurrentUser();
    if (cognitoUser != null) {
      cognitoUser.signOut();
    }
  }
}
