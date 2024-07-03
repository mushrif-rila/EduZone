// src/App.js
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Dashboard } from './DashboardApp/layouts/index';
import HomePage from './HomePage/HomePage';
import Login from './Login/login';
import Signup from './Login/Signup';
import PrivateRoute from './PrivateRoute';
import AuthService from './authService';
import { AuthProvider } from './context/AuthContext';
// import LoggedHomePage from './HomeLogged/HomePage';
import RoleSelector from './Login/role';

function App() {
  const location = useLocation();

  // useEffect(() => {
  //   if (!location.pathname.startsWith('/dashboard')) {
  //     AuthService.logout();
  //   }
  // }, [location]);
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/role" element={<RoleSelector />} />
      <Route path="/dashboard/*" element={<PrivateRoute />}>
        <Route path="*" element={<Dashboard />} />
      </Route>
      {/* <Route path="/loggedin/*" element={<PrivateRoute />} >
        <Route path="*" element={<LoggedHomePage />} />
      </Route> */}
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
    </AuthProvider>
  );
}

export default App;

    // "start": "concurrently \"npm run start-react\" \"npm run start-django\"",
    // "start-react": "react-scripts start",
    // "start-django": "cd ../django_backend && python manage.py runserver",
