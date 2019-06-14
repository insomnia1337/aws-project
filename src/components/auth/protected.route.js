import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from '../Auth'


const auth = new Auth();
export const PrivateRoute = ({ component: Component, ...rest }) => (
         <Route
           {...rest}
           render={props =>
             auth.isAuthenticated ? (
               <Component {...props} />
             ) : (
               <Redirect to= {
                   {
                       pathname: "/",
                       state: {
                           from: props.location
                       }
                   }
               } />
             )
           }
         />
       );
