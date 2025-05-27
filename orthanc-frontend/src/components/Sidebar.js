import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="sidebar p-3">
      <h5 className="text-white">Menu</h5>
      <ul className="nav flex-column">
        <li className="nav-item"><Link to="/" className="nav-link">🏥 Patients</Link></li>
        <li className="nav-item"><Link to="/add" className="nav-link">➕ Ajouter un patient</Link></li>
        <li className="nav-item"><Link to="/orthanc" className="nav-link">📁 Études DICOM</Link></li>
      </ul>
    </aside>
  );
}
