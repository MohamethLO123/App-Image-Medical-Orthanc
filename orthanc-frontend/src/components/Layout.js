import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="wrapper">
      <Header />
      <Sidebar />

      <div className="content-wrapper" style={{ minHeight: '100vh' }}>
        <div className="content-header">
          <div className="container-fluid">
            {/* Breadcrumb or title */}
          </div>
        </div>

        <div className="content">
          <div className="container-fluid">
            <Outlet />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 