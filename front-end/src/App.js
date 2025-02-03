import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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
import MyAppointments from './components/Appointments/MyAppointments';
import TimeSlotList from './components/TimeSlots/TimeSlotList';
import TimeSlotForm from './components/TimeSlots/TimeSlotForm';
import TimeSlotDetails from './components/TimeSlots/TimeSlotDetails';
import Unauthorized from './pages/Unauthorized';
import { UserProvider, UserContext } from './context/UserContext';

// 🔒 **Composant sécurisé pour protéger les routes**
const ProtectedRoute = ({ element, roles }) => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/login"); // ✅ Attendre que `loading` soit `false` avant de rediriger
      } else if (roles && !roles.includes(user.role)) {
        navigate("/unauthorized"); // Rediriger si l'utilisateur n'a pas le rôle requis
      }
    }
  }, [user, loading, navigate, roles]);

  if (loading) return <div className="text-center mt-4">Chargement...</div>;

  return user ? element : null;
};

function App() {
  return (
    <Router> {/* ✅ Déplacer `UserProvider` à l'intérieur du Router */}
      <UserProvider>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <div className="flex-grow-1">
            <Routes>
              {/* Routes publiques accessibles à tous */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Routes accessibles uniquement aux utilisateurs connectés */}
              <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} roles={["admin", "agent"]} />} />
              <Route path="/services" element={<ProtectedRoute element={<ServiceList />} roles={["admin", "agent", "citizen"]} />} />
              <Route path="/services/:id" element={<ProtectedRoute element={<ServiceDetails />} roles={["admin", "agent", "citizen"]} />} />
              <Route path="/services/edit/:id" element={<ProtectedRoute element={<ServiceEdit />} roles={["admin", "agent"]} />} />

              {/* Gestion des utilisateurs (admin uniquement) */}
              <Route path="/users" element={<ProtectedRoute element={<UserList />} roles={["admin"]} />} />

              {/* Gestion des rendez-vous */}
              <Route path="/appointments" element={<ProtectedRoute element={<AppointmentList />} roles={["admin", "agent"]} />} />
              <Route path="/appointments/new" element={<ProtectedRoute element={<AppointmentForm />} roles={["citizen"]} />} />
              <Route path="/appointments/:id" element={<ProtectedRoute element={<AppointmentDetails />} roles={["admin", "agent", "citizen"]} />} />
              <Route path="/appointments/edit/:id" element={<ProtectedRoute element={<AppointmentEdit />} roles={["admin", "agent"]} />} />
              <Route path="/appointments/my" element={<ProtectedRoute element={<MyAppointments />} roles={["citizen"]} />} />

              {/* Gestion des créneaux horaires */}
              <Route path="/slots" element={<ProtectedRoute element={<TimeSlotList />} roles={["admin", "agent"]} />} />
              <Route path="/slots/new" element={<ProtectedRoute element={<TimeSlotForm />} roles={["admin", "agent"]} />} />
              <Route path="/slots/:id" element={<ProtectedRoute element={<TimeSlotDetails />} roles={["admin", "agent"]} />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;