import React, { useState } from 'react';
import { api } from '../services/api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    console.log("Données envoyées :", { email, motDePasse });
    const res = await api.post('/auth/login', { email, motDePasse });
    console.log("Réponse reçue :", res.data);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('email', res.data.email);
    Swal.fire('Succès', 'Connexion réussie', 'success');
    navigate('/');
  } catch (error) {
    console.error("Erreur d'authentification :", error.response?.data);
    Swal.fire('Erreur', 'Email ou mot de passe invalide', 'error');
  }
};


  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
      <div className="card border-success">
        <div className="card-header bg-success text-white text-center">
          <h5><i className="fas fa-sign-in-alt me-2"></i>Connexion</h5>
        </div>
        <div className="card-body bg-light">
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email}
                onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Mot de passe</label>
              <input type="password" className="form-control" value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)} required />
            </div>
            <div className="d-grid">
              <button className="btn btn-success" type="submit">
                <i className="fas fa-check-circle me-2"></i>Se connecter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
