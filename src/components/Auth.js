import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute
} from "amazon-cognito-identity-js";
import { loginProviderName } from "../env.js";

import React, { Component } from "react";

export default class Auth extends Component {
  constructor(userPool, credentials) {
      debugger;
    super();
    this.userPool = userPool;
    this.credentials = credentials;
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
      },
      onFailure: err => {
        console.log(err);
        // alert(err);
      }
    });
  }
}
