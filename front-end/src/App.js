import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import des composants globaux
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppointmentList from './components/AppointmentList';
import AppointmentForm from './components/AppointmentForm';
import ServiceList from './components/ServiceList';
import TimeSlotPicker from './components/TimeSlotPicker';

// Import des pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import Notifications from './pages/Notifications';
import CalendarPage from './pages/Calendar';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div>
        {/* Navbar affichée sur toutes les pages */}
        <Navbar />
        <div className="container mt-4">
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<ServiceList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Routes protégées pour les utilisateurs connectés */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/appointments" element={<AppointmentList />} />
            <Route path="/appointments/create" element={<AppointmentForm />} />
            <Route path="/slots/:serviceId" element={<TimeSlotPicker />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;