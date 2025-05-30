import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function Header() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    Swal.fire('Déconnexion', 'Vous avez été déconnecté avec succès.', 'success')
      .then(() => navigate('/login'));
  };

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#">
            <i className="fas fa-bars"></i>
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="/" className="nav-link">Accueil</a>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">

        <li className="nav-item">
          <span className="nav-link text-muted">Bienvenue, Médecin </span>
        </li>

        <li className="nav-item">
          <button className="btn btn-outline-danger btn-sm me-2" onClick={logout}>
            <i className="fas fa-sign-out-alt me-1"></i> Déconnexion
          </button>
        </li>

      </ul>
    </nav>
  );
}