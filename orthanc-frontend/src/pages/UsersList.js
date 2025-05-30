import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function UsersList() {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    api.get('/utilisateurs', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setUtilisateurs(res.data))
      .catch(err => console.error('Erreur chargement utilisateurs :', err));
  }, []);

  const handleView = (id) => {
    navigate(`/utilisateurs/${id}`);
  };

  const filteredUsers = utilisateurs
    .filter((u) =>
      (u.hopital?.nom?.toLowerCase().includes(search.toLowerCase()) ||
       u.roles?.some(r => r.nom?.toLowerCase().includes(search.toLowerCase())) ||
       u.telephone?.toLowerCase().includes(search.toLowerCase()))
    )
    .slice(-5)
    .reverse();

  return (
    <div className="card border-success">
      <div className="card-header bg-success text-white d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <i className="fas fa-users-cog me-2"></i>
          <h5 className="mb-0">5 derniers utilisateurs</h5>
        </div>
        <input
          type="text"
          className="form-control w-25"
          placeholder="Rechercher par hôpital, rôle ou téléphone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="card-body bg-light">
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-success">
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Hôpital</th>
                <th>Rôles</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u, index) => (
                <tr key={index}>
                  <td>{u.nom}</td>
                  <td>{u.prenom}</td>
                  <td>{u.email}</td>
                  <td>{u.telephone}</td>
                  <td>{u.hopital?.nom || '-'}</td>
                  <td>
                    {u.roles.map((r, i) => (
                      <span key={i} className="badge bg-primary me-1">{r.nom}</span>
                    ))}
                  </td>
                  <td className="text-center">
                    <button className="btn btn-outline-success btn-sm" onClick={() => handleView(u.id)}>
                      <i className="fas fa-eye"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-muted">Aucun utilisateur trouvé.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
