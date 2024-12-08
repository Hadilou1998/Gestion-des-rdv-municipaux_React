import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Appointment from "./pages/Appointment";

const App = () => {
  <Router>
    <NavigationBar />
    <Routes>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/appointment" component={Appointment} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/" exact component={Dashboard} />
    </Routes>
  </Router>
};

export default App;