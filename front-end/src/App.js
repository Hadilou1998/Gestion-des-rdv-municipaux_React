import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Appointment from "./pages/Appointment";

const App = () => {
  <Router>
    <NavigationBar />
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/appointment" component={Appointment} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/" exact component={Dashboard} />
    </Switch>
  </Router>
};

export default App;