import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="main-sidebar sidebar-dark-success elevation-4">
      <a href="/" className="brand-link">
        <img src="/adminlte/img/AdminLTELogo.png" alt="Logo" className="brand-image img-circle elevation-3" />
        <span className="brand-text font-weight-light">Hôpital</span>
      </a>
      <div className="sidebar">
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="nav-icon fas fa-users"></i>
                <p>Patients</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add" className="nav-link">
                <i className="nav-icon fas fa-user-plus"></i>
                <p>Ajouter un patient</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/orthanc" className="nav-link">
                <i className="nav-icon fas fa-x-ray"></i>
                <p>Études DICOM</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
