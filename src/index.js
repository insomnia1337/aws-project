import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {CognitoUserPool} from "amazon-cognito-identity-js";
import AWS from "aws-sdk";
import {
    poolData,
    identityPoolId,
    region,
    bucketRegion,
    bucketName
} from "./env.js";
import Auth from "./components/auth/Auth";


const userPool = new CognitoUserPool(poolData);
const creds = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: identityPoolId
});

AWS.config.update({
    region: region,
    credentials: creds
});

const s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    region: bucketRegion,
    params: {
        Bucket: bucketName
    }
});

const auth = new Auth(userPool, creds);


ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
