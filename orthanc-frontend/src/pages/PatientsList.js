import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function PatientsList() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    api.get('/patients', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setPatients(res.data))
    .catch(err => console.error('Erreur de récupération des patients :', err));
  }, []);

  const filteredPatients = patients
    .filter(p =>
      (p.patientId?.toLowerCase().includes(search.toLowerCase()) || '') ||
      (p.telephone?.toLowerCase().includes(search.toLowerCase()) || '')
    )
    .slice(-5)
    .reverse();

  const handleView = (id) => {
    navigate(`/patients/${id}`);
  };

  return (
    <div className="card border-success">
      <div className="card-header bg-success text-white d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <i className="fas fa-users fa-lg me-2"></i>
          <h5 className="mb-0">5 derniers patients</h5>
        </div>
        <input
          type="text"
          className="form-control w-25"
          placeholder="Rechercher par ID ou téléphone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="card-body bg-light">
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-success">
              <tr>
                <th>Identifiant</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Sexe</th>
                <th>Date de naissance</th>
                <th>Adresse</th>
                <th>Téléphone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center text-muted">
                    Aucun patient trouvé.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((p, index) => (
                  <tr key={index}>
                    <td>{p.patientId}</td>
                    <td>{p.nom}</td>
                    <td>{p.prenom}</td>
                    <td>{p.sexe}</td>
                    <td>{p.dateNaissance}</td>
                    <td>{p.adresse}</td>
                    <td>{p.telephone}</td>
                    <td className="text-center">
                      <button className="btn btn-outline-success btn-sm" onClick={() => handleView(p.id)}>
                        <i className="fas fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
