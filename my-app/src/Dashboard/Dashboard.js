import React from 'react';
import Sidebar from './SideBar';
import DashHeader from './Header';
import './Dashboard.css'


function Dashboard() {
  return (
    
    <div className="dashboard">
        <DashHeader/>
        <Sidebar/>
    </div>
    
  );
}

export default Dashboard;
