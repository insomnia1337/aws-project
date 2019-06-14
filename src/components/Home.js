import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Auth from "./Auth";


const auth = new Auth();
export default class Home extends Component {
  
    render() {
    return (
      <div>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
              auth.logout(() => {
                this.props.history.push("/login");
              });
          }}
        >
          Logout
        </Button>
      </div>
    );
  }
}
