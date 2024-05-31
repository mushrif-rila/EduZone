// src/DashboardApp/App.jsx

import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "./layouts/index";
import {Home} from './pages/dashboard/index'

function DashboardApp() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default DashboardApp;
