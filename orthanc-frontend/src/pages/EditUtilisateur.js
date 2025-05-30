import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import Swal from 'sweetalert2';

export default function EditUtilisateur() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [utilisateur, setUtilisateur] = useState({
    nom: '', prenom: '', email: '', telephone: '', hopital: {}, roles: []
  });
  const [hopitaux, setHopitaux] = useState([]);
  const [rolesDispo, setRolesDispo] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    api.get(`/utilisateurs/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUtilisateur({
      ...res.data,
      hopitalId: res.data.hopital?.id || '',
      rolesIds: res.data.roles.map(r => r.id)
    }));

    api.get('/hopitaux', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setHopitaux(res.data));

    api.get('/roles', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setRolesDispo(res.data));
  }, [id]);

  const handleChange = (e) => {
    setUtilisateur({ ...utilisateur, [e.target.name]: e.target.value });
  };

  const handleRoleToggle = (roleId) => {
    const rolesIds = utilisateur.rolesIds.includes(roleId)
      ? utilisateur.rolesIds.filter(id => id !== roleId)
      : [...utilisateur.rolesIds, roleId];

    setUtilisateur({ ...utilisateur, rolesIds });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await api.put(`/utilisateurs/${id}`, {
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        email: utilisateur.email,
        telephone: utilisateur.telephone,
        hopital: { id: utilisateur.hopitalId },
        roles: utilisateur.rolesIds.map(rid => ({ id: rid }))
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      Swal.fire('Succès', 'Utilisateur mis à jour avec succès.', 'success');
      navigate('/utilisateurs');
    } catch (error) {
      console.error(error);
      Swal.fire('Erreur', error.response?.data || 'Échec de la mise à jour.', 'error');
    }
  };

return (
  <div className="card border-primary p-4">
    <div className="card-header bg-primary text-white">
      <h5 className="mb-0">
        <i className="fas fa-user-edit me-2"></i>Modifier utilisateur
      </h5>
    </div>
    <div className="card-body bg-light">
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Colonne gauche */}
          <div className="col-md-6">
            <div className="mb-3">
              <label>Nom</label>
              <input className="form-control" name="nom" value={utilisateur.nom} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input className="form-control" name="email" value={utilisateur.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Hôpital</label>
              <select className="form-select" name="hopitalId" value={utilisateur.hopitalId} onChange={handleChange} required>
                <option value="">-- Sélectionner --</option>
                {hopitaux.map(h => <option key={h.id} value={h.id}>{h.nom}</option>)}
              </select>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="col-md-6">
            <div className="mb-3">
              <label>Prénom</label>
              <input className="form-control" name="prenom" value={utilisateur.prenom} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Téléphone</label>
              <input className="form-control" name="telephone" value={utilisateur.telephone} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label>Rôles</label>
              <div className="d-flex flex-wrap gap-2">
                {rolesDispo.map(r => (
                  <div className="form-check" key={r.id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`role-${r.id}`}
                      checked={utilisateur.rolesIds?.includes(r.id)}
                      onChange={() => handleRoleToggle(r.id)}
                    />
                    <label className="form-check-label" htmlFor={`role-${r.id}`}>
                      {r.nom}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-3">
          <button className="btn btn-primary">
            <i className="fas fa-save me-2"></i>Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  </div>
);

}
