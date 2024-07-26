import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Dashboard from './components/dashboard/Dashboard';
import { useSelector } from 'react-redux';

const App = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/signup"
          element={token ? <Navigate to="/dashboard" /> : <Signup />}
        />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
};

export default App;
