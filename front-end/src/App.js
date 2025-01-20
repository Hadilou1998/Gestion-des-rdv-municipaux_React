import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Calendar from './pages/Calendar';
import Dashboard from './pages/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Logout from './components/Auth/Logout';
import ServiceList from './components/Services/ServiceList';
import ServiceDetails from './components/Services/ServiceDetails';
import ServiceEdit from './components/Services/ServiceEdit';
import UserList from './components/Users/UserList';
import AppointmentList from './components/Appointments/AppointmentList';
import AppointmentForm from './components/Appointments/AppointmentForm';
import AppointmentDetails from './components/Appointments/AppointmentDetails';
import AppointmentEdit from './components/Appointments/AppointmentEdit';
import TimeSlotList from './components/TimeSlots/TimeSlotList';
import TimeSlotForm from './components/TimeSlots/TimeSlotForm';
import TimeSlotDetails from './components/TimeSlots/TimeSlotDetails';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/services" element={<ServiceList />} />
            <Route path="/services/:id" element={<ServiceDetails />} />
            <Route path="/services/edit/:id" element={<ServiceEdit />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/appointments" element={<AppointmentList />} />
            <Route path="/appointments/new" element={<AppointmentForm />} />
            <Route path="/appointments/:id" element={<AppointmentDetails />} />
            <Route path="/appointments/edit/:id" element={<AppointmentEdit />} />
            <Route path="/slots" element={<TimeSlotList />} />
            <Route path="/slots/new" element={<TimeSlotForm />} />
            <Route path="/slots/:id" element={<TimeSlotDetails />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;