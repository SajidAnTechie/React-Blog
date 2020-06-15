import React, { useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./Components/Home";
import Auth from "./Components/auth";
import DashBoared from "./Components/Dashboard";
import Logout from "./Components/logout";
import RegisterForm from "./Components/register";
import singleProject from "./Components/Projects/singleProject";
import NewProject from "./Components/Projects/newProjects";
import { useDispatch, useSelector } from "react-redux";
import * as authAction from "./Components/actions/auth";

const App = () => {
  const token = useSelector((state) => state.token !== null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authAction.checkAuthState());
  }, [dispatch]);

  let ProtectedRoutes = (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Auth} />
      <Route exact path="/register" component={RegisterForm} />
      <Redirect to="/login" />
    </Switch>
  );

  if (token) {
    ProtectedRoutes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Auth} />
        <Route exact path="/dashBoared" component={DashBoared} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/project/show/:id" component={singleProject} />
        <Route exact path="/Create-project/" component={NewProject} />
        <Redirect to="/dashBoared" />
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <Navbar />
      {ProtectedRoutes}
    </BrowserRouter>
  );
};

export default App;
