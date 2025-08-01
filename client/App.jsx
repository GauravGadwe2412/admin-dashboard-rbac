import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import NotAuthorized from './pages/NotAuthorized';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute roles={['admin']}>
            <Settings />
          </ProtectedRoute>
        } />
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;