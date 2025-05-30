import React, { useState } from 'react';
import { api } from '../services/api';
import Swal from 'sweetalert2';

export default function AddRole() {
  const [role, setRole] = useState({ nom: '' });

  const handleChange = (e) => {
    setRole({ ...role, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await api.post('/roles', role, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      Swal.fire('Succès', 'Rôle ajouté avec succès.', 'success');
      setRole({ nom: '' });
    } catch (error) {
      console.error('Erreur lors de l’ajout du rôle :', error);
      Swal.fire('Erreur', error.response?.data || 'Erreur lors de l’ajout.', 'error');
    }
  };

  return (
    <div className="card border-success">
      <div className="card-header bg-success text-white">
        <h5 className="mb-0"><i className="fas fa-user-shield me-2"></i>Ajouter un rôle</h5>
      </div>
      <div className="card-body bg-light">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nom du rôle</label>
            <input
              type="text"
              className="form-control"
              name="nom"
              value={role.nom}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success">
            <i className="fas fa-check-circle me-2"></i>Enregistrer
          </button>
        </form>
      </div>
    </div>
  );
}
