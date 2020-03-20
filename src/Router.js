import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Judet from "./components/Judet/Judet";

const Router = props => (
  <React.Fragment>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/judet/:id/:countyName" component={Judet} />
        {/* <Redirect to="/" /> */}
      </Switch>
    </BrowserRouter>
  </React.Fragment>
);

export default Router;
