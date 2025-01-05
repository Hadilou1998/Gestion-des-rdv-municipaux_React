import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Service';
import Calendar from './pages/Calendar';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Appointment from './pages/Appointment';
import Profile from './pages/Profile';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <div className="flex-grow-1">
            <Routes>
              {/* Routes accessibles à tous */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/contact" element={<Contact />} />
              {/* Routes accessibles seulement aux utilisateurs connectés */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/appointments" element={<Appointment />} />
              <Route path="/profile" element={<Profile />} />
              {/* Routes accessibles seulement aux utilisateurs non connectés */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;