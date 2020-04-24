import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import useLocalStorage from "../hooks/useLocalStorage";

export default function App() {
  const [token, setToken] = useLocalStorage("token");
  return (
    <Router>
      <Switch>
        {/* A PrivateRoute can be initialized exactly like a regular Route */}
        <PrivateRoute exact path="/private" component={PrivateComponent} />
        {/* You can also specify a redirectPath (default: "/login") */}
        <PrivateRoute
          exact
          path="/secret"
          render={params => <SecretComponent {...params} />}
          redirectPath="/redirect"
        />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
}
