import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import ClientDashboard from './components/ClientDashboard';
import EquipmentPage from './components/EquipmentPage';
import CameraRentalHero from './components/CameraRentalHero';
import Home from './components/Home';
import Header from './components/Header';
import Support from './components/Support';
import About from './components/About';
import { Collection } from 'mongoose';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleRegister = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Helper to conditionally render Header only on public pages
  function AppWithConditionalHeader() {
    const location = useLocation();
    // Hide header only on all /admin routes (including nested)
    const hideHeader = location.pathname.startsWith('/admin');
    const showHeader = !hideHeader;

    return (
      <>
        {showHeader && <Header />}
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<Home />} />
          {/* Equipments page */}
          <Route path="/equipments" element={<EquipmentPage user={user} onLogout={handleLogout} />} />
          {/* Support page */}
          <Route path="/support" element={<Support />} />
          {/* About page */}
          <Route path="/about" element={<About />} />
          {/* Collections page */}
          <Route path="/collection" element={<Collection />} />
          {/* Login/Register */}
          <Route path="/login" element={
            isAuthenticated && user ? (
              <Navigate to={user.role === 'admin' ? '/admin' : '/client'} replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          } />
          <Route path="/register" element={
            isAuthenticated && user ? (
              <Navigate to={user.role === 'admin' ? '/admin' : '/client'} replace />
            ) : (
              <Register onRegister={handleRegister} />
            )
          } />
          {/* Dashboards */}
          <Route path="/admin/*" element={
            isAuthenticated && user && user.role === 'admin' ? (
              <AdminDashboard onLogout={handleLogout} user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          <Route path="/client/*" element={
            isAuthenticated && user && user.role !== 'admin' ? (
              <ClientDashboard onLogout={handleLogout} user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <AppWithConditionalHeader />
    </Router>
  );
}

export default App;