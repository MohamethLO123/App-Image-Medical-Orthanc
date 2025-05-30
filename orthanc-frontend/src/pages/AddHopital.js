import React, { useState } from 'react';
import { api } from '../services/api';
import Swal from 'sweetalert2';

export default function AddHopital() {
  const [hopital, setHopital] = useState({ nom: '', adresse: '' });

  const handleChange = (e) => {
    setHopital({ ...hopital, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await api.post('/hopitaux', hopital, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      Swal.fire('Succès', 'Hôpital ajouté avec succès.', 'success');
      setHopital({ nom: '', adresse: '' });
    } catch (error) {
      console.error('Erreur lors de l’ajout de l’hôpital :', error);
      Swal.fire('Erreur', error.response?.data || 'Erreur lors de l’ajout.', 'error');
    }
  };

  return (
    <div className="card border-success">
      <div className="card-header bg-success text-white">
        <h5 className="mb-0"><i className="fas fa-hospital me-2"></i>Ajouter un hôpital</h5>
      </div>
      <div className="card-body bg-light">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nom</label>
            <input type="text" className="form-control" name="nom" value={hopital.nom} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Adresse</label>
            <input type="text" className="form-control" name="adresse" value={hopital.adresse} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-success">
            <i className="fas fa-check-circle me-2"></i>Enregistrer
          </button>
        </form>
      </div>
    </div>
  );
}
