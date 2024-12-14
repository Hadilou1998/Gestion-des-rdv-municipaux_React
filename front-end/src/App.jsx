import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Appointments from "./pages/Appointments";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  <Router>
    <NavigationBar />
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
    <Footer />
  </Router>
};

export default App;