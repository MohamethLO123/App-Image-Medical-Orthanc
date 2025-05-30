import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function AddUtilisateur() {
  const [utilisateur, setUtilisateur] = useState({
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    telephone: '',
    hopitalId: '',
    roles: []
  });

  const [hopitaux, setHopitaux] = useState([]);
  const [rolesDispo, setRolesDispo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    api.get('/hopitaux', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setHopitaux(res.data));

    api.get('/roles', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setRolesDispo(res.data));
  }, []);

  const handleChange = (e) => {
    setUtilisateur({ ...utilisateur, [e.target.name]: e.target.value });
  };

  const handleRoleToggle = (roleId) => {
    setUtilisateur((prev) => {
      const newRoles = prev.roles.includes(roleId)
        ? prev.roles.filter(id => id !== roleId)
        : [...prev.roles, roleId];
      return { ...prev, roles: newRoles };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await api.post('/utilisateurs', {
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        email: utilisateur.email,
        motDePasse: utilisateur.motDePasse,
        telephone: utilisateur.telephone,
        hopital: { id: utilisateur.hopitalId },
        roles: utilisateur.roles.map(id => ({ id }))
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      Swal.fire('Succès', 'Utilisateur ajouté avec succès.', 'success');
      navigate('/');
    } catch (error) {
      console.error(error);
      Swal.fire('Erreur', error.response?.data || "Une erreur est survenue", 'error');
    }
  };

  return (
    <div className="card border-success">
      <div className="card-header bg-success text-white">
        <h5 className="mb-0"><i className="fas fa-user-plus me-2"></i>Ajouter un utilisateur</h5>
      </div>
      <div className="card-body bg-light">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Nom</label>
              <input type="text" name="nom" className="form-control" value={utilisateur.nom} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Prénom</label>
              <input type="text" name="prenom" className="form-control" value={utilisateur.prenom} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Email</label>
              <input type="email" name="email" className="form-control" value={utilisateur.email} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Mot de passe</label>
              <input type="password" name="motDePasse" className="form-control" value={utilisateur.motDePasse} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Téléphone</label>
              <input type="tel" name="telephone" className="form-control" value={utilisateur.telephone} onChange={handleChange} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Hôpital</label>
              <select name="hopitalId" className="form-select" value={utilisateur.hopitalId} onChange={handleChange} required>
                <option value="">-- Sélectionner --</option>
                {hopitaux.map(h => (
                  <option key={h.id} value={h.id}>{h.nom}</option>
                ))}
              </select>
            </div>
            <div className="col-12 mb-3">
              <label className="form-label">Rôles</label>
              <div className="d-flex flex-wrap gap-3">
                {rolesDispo.map(role => (
                  <div className="form-check" key={role.id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`role-${role.id}`}
                      checked={utilisateur.roles.includes(role.id)}
                      onChange={() => handleRoleToggle(role.id)}
                    />
                    <label className="form-check-label" htmlFor={`role-${role.id}`}>
                      {role.nom}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className="btn btn-success">
            <i className="fas fa-check-circle me-2"></i>Enregistrer
          </button>
        </form>
      </div>
    </div>
  );
}
