import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute
} from "amazon-cognito-identity-js";
import { loginProviderName } from "../../env.js";
import React from "react";

export default class Auth extends React.Component {
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
      },
      onFailure: err => {
        this.authenicated = false;
        console.log(err);
        // alert(err);
      }
    });
  }

  signUpUser(data) {
    this.userPool.signUp(
      data.userName,
      data.password,
      [
        new CognitoUserAttribute({
          Name: "email",
          Value: data.email
        }),
        new CognitoUserAttribute({
          Name: "name",
          Value: data.name
        })
      ],
      null,
      (err, result) => {
        if (err) {
          console.log(err);

          return;
        }
        console.log(`Udało się. Username: ${result.user.getUsername()}`);
      }
    );
  }

  confirm(data) {
    const cognitoUser = new CognitoUser({
      Username: data.username,
      Pool: this.userPool
    });

    cognitoUser.confirmRegistration(data.code, true, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("sukces potwierdzenie");
    });
  }

  logOut() {
    const cognitoUser = this.userPool.getCurrentUser();
    if (cognitoUser != null) {
      cognitoUser.signOut();
    }
  }
}
