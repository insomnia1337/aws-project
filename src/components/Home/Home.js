import React from "react";
import { useDropzone } from "react-dropzone";
import "./home.scss";
import { animationApiGatewayUrl } from "../../env";

export default function Home(props) {
  const {
    acceptedFiles,
    rejectedFiles,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: "image/jpeg, image/png"
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

  const sendPhotos = () => {
    
  }

  return (<div>
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
          
  );
}
