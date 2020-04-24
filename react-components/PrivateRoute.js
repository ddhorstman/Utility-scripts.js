import React from "react";
import { Route, Redirect } from "react-router-dom";
/**
 * A Route that will redirect to the login page if a token isn't found in localStorage.
 * @param {*} props Any valid React props, plus an optional redirectPath
 */
export default function PrivateRoute({  redirectPath = "/login", ...props }) {
  const token = localStorage.getItem("token");
  //null indicates that no entry for token can be found
  //"null" indicates that the token has been set to null, e.g. by useLocalStorage
  const isLoggedIn = token !== null && token !== "null";
  return isLoggedIn ? <Route {...props} /> : <Redirect to={redirectPath} />;
}
