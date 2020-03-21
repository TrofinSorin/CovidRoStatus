import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Judet from "./components/Judet/Judet";
import MobileInstallInfo from "./components/MobileInstallInfo";

const Router = props => (
  <React.Fragment>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/judet/:id/:countyName" component={Judet} />
        <Route path="/mobile-install-info" component={MobileInstallInfo} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </React.Fragment>
);

export default Router;
