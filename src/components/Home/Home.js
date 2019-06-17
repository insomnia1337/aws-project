import React from "react";
import { useDropzone } from "react-dropzone";
import {Redirect} from 'react-router-dom'
import "./home.scss";
import {
  animationApiGatewayUrl,
  bucketRegion,
  bucketName,
  identityPoolId,
  poolData
} from "../../env";
import AWS from "aws-sdk";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import Auth from "../auth/Auth";
const creds = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: identityPoolId
});
const userPool = new CognitoUserPool(poolData);
const auth = new Auth(userPool, creds);

export default function Home(props) {
  const {
    acceptedFiles,
    rejectedFiles,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: "image/jpeg, image/png"
  });

  const s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    region: bucketRegion,
    params: {
      Bucket: bucketName
    }
  });

  const acceptedFilesItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const rejectedFilesItems = rejectedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const uuidv4 = require("uuid/v4");

  const sendPhotos = e => {
    e.preventDefault();
    const timestamp = Date.now();
    const path = `uek-krakow/${timestamp}/`;
    const promises = [];

    for (let i = 0; i < acceptedFilesItems.length; i++) {
      const acceptedFilesItem = acceptedFilesItems[i];

      promises.push(
        new Promise((resolve, reject) => {
          debugger;
          s3.putObject(
            {
              Key: `${path}${acceptedFilesItem.key}`,
              ContentType: "image/jpeg",
              Body: acceptedFilesItem
            },
            (err, data) => {
              if (err) {
                console.log(err);
                reject(err);
              } else {
                resolve(data);
              }
            }
          );
          resolve("ok"); // tmp
        })
      );
      Promise.all(promises).then(values => {
        console.log(values);
        console.log("wyslano pomyslnie");
        const order_id = uuidv4();
        const email = "test@wp.pl";
        const photos = acceptedFilesItems.map(x => `${path}${x.name}`);
        const orderRequest = {
          order_id,
          email,
          photos
        };
        console.log(orderRequest);
        fetch("animationApiGatewayUrl", {
          method: "post",
          body: JSON.stringify(orderRequest),
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => res.text()) // response pusty
          .then(response => {
            console.log("Wys;ame");
            console.log(response);
          });
      });
    }
  };

  const blocked = () => {
    return (
      <Redirect to='/' />
    )
  }

  const homeTemplate = () => {
    return (
    <div>
      <section className="container">
        <div>
          <h1>Animation creator</h1>
          <p>Create pretty nice animations🍔🍔🍔</p>
        </div>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>
            Drag 'n' drop some files here, or click to select files and send to
            create animation
          </p>
          <em>(Only *.jpeg and *.png images will be accepted)</em>
        </div>
        <aside>
          <h4>Accepted files</h4>
          <ul>{acceptedFilesItems}</ul>
          <h4>Rejected files</h4>
          <ul>{rejectedFilesItems}</ul>
        </aside>
      </section>
      <button onClick={sendPhotos}>Send file</button>
    </div>

    )
  }
return <div>{props.isAuthenticated ? homeTemplate() : blocked()}</div>;
  
}
