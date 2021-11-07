import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Form from "./Form";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Form />
        </Route>
      </Switch>
    </Router>
  );
}
export default Routes;
