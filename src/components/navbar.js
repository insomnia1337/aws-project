import React, {Fragment} from "react";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

export default function Navbar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {props.isAuthenticated ? (
                        <Button
                            component={Link}
                            to="/register"
                            variant="contained"
                            color="secondary"
                            onClick={props.handleLogout}
                        >
                            Logout
                        </Button>
                    ) : (
                        <Fragment>
                            <Button
                                variant="contained"
                                color="secondary"
                                component={Link}
                                to="/"
                            >
                                Login
                            </Button>
                            <Button
                                className="register-button"
                                component={Link}
                                to="/register"
                                variant="contained"
                                color="secondary"
                            >
                                Register
                            </Button>
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
