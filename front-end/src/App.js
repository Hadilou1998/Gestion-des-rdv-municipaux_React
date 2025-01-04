import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Service';
import Calendar from './pages/Calendar';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Appointment from './pages/Appointment';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import ProtectedRoute from './components/ProtectedRoute';

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
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/appointments" element={<ProtectedRoute><Appointment /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              
              {/* Routes accessibles seulement aux utilisateurs non connectés */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;