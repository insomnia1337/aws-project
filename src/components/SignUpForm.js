import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import AWS from "aws-sdk";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Auth from "./auth/Auth";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import {
  poolData,
  identityPoolId,
  region,
  bucketRegion,
  bucketName
} from "./../env";
const userPool = new CognitoUserPool(poolData);

const creds = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: identityPoolId
});
const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  region: bucketRegion,
  params: {
    Bucket: bucketName
  }
});
AWS.config.update({
  region: region,
  credentials: creds
});

const auth = new Auth(userPool, creds);

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUpForm(props) {
  const classes = useStyles();
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [newUser, setNewUser] = useState("");

  const validateForm = () => {
    return login.length > 0 && password.length > 0 && password === password2;
  };
  const validateConfirmationForm = () => {
    return confirmationCode.length > 0;
  };

  const handleChange = e => {
    setConfirmationCode(e.target.value);
  };

  const handleSubmit = async event => {
    debugger;
    event.preventDefault();
    // if (!validateForm()) {
    //   return alert('Niepoprawne dane')
    // }
    try {
      await auth.signUpUser({
        username: login,
        password: password,
        email: email
      });
      props.userHasAuthenticated(true);
      setNewUser("ok");
    } catch (e) {
      alert(e.message);
    }
  };

  const handleConfirmationSubmit = () => {
    if(!validateConfirmationForm()){
      return
    }
      auth.confirm(
        {
          username: login,
          code: confirmationCode
        },
        () => {
          this.user.isCodeRequired = false;
        },
        err => (this.user.flashMessage = err)
      );
    console.log("confirm");
  };

  const renderConfirmationForm = () => {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <input type="tel" value={confirmationCode} onChange={handleChange} />
        <button>Confirm code</button>
        <div>Please check your email for the code.</div>
      </form>
    );
  };

  const renderForm = () => {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="login"
                  variant="outlined"
                  required
                  fullWidth
                  id="login"
                  label="Login"
                  autoFocus
                  value={login}
                  onChange={e => setLogin(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password2"
                  label="Repeat password"
                  type="password"
                  id="password2"
                  autoComplete="current-password"
                  value={password2}
                  onChange={e => setPassword2(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link
                  style={{ textDecoration: "none" }}
                  to="/login"
                  variant="body2"
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  };
  return (
    <div className="signup">
      {!newUser ? renderForm() : renderConfirmationForm()}
    </div>
  );
}
