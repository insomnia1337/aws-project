import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(theme => ({

  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/login"
          >
            Login
          </Button>

          <Button
            component={Link}
            to="/register"
            variant="contained"
            color="secondary"
          >
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
