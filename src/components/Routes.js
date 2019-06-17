import React from 'react'
import AppliedRoute from "./AppliedRoute";
import {Switch, Route} from "react-router-dom"
import NotFound from './NotFound';
import SignInForm from "./login/SignInForm";
import SignUpForm from "./register/SignUpForm";
import Home from './Home/Home';
export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/home" exact component={Home} props={childProps} />
    <AppliedRoute path="/" exact component={SignInForm} props={childProps} />
      <AppliedRoute path="/register" exact component={SignUpForm} props={childProps} />
    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);