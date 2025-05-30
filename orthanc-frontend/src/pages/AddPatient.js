import React, { useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AddPatient() {
  const navigate = useNavigate();
  const [patient, setPatient] = useState({
    nom: '',
    prenom: '',
    sexe: '',
    dateNaissance: '',
    adresse: '',
    telephone: ''
  });

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await api.post('/patients', patient, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Le patient a été ajouté avec succès.',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
      console.error('Erreur lors de l’ajout du patient :', error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: "Une erreur est survenue lors de l'ajout du patient."
      });
    }
  };

  return (
    <div className="card border-success">
      <div className="card-header bg-success text-white d-flex align-items-center">
        <i className="fas fa-user-plus fa-lg me-2"></i>
        <h5 className="mb-0">Ajouter un nouveau patient</h5>
      </div>
      <div className="card-body bg-light">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Nom</label>
              <input type="text" className="form-control" name="nom" value={patient.nom} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Prénom</label>
              <input type="text" className="form-control" name="prenom" value={patient.prenom} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Sexe</label>
              <select className="form-select" name="sexe" value={patient.sexe} onChange={handleChange} required>
                <option value="">-- Sélectionnez --</option>
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Date de naissance</label>
              <input type="date" className="form-control" name="dateNaissance" value={patient.dateNaissance} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Adresse</label>
              <input type="text" className="form-control" name="adresse" value={patient.adresse} onChange={handleChange} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Téléphone</label>
              <input type="tel" className="form-control" name="telephone" value={patient.telephone} onChange={handleChange} />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-success">
              <i className="fas fa-check-circle me-1"></i> Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
