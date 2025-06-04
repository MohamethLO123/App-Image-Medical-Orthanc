import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { decodeToken } from '../utils/jwtUtils';

export default function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [dossiers, setDossiers] = useState([]);

  const [nouveauDossier, setNouveauDossier] = useState({
    motif: '',
    observation: '',
    dateConsultation: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchData = async () => {
      try {
        const patientRes = await api.get(`/patients/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPatient(patientRes.data);

        const dossierRes = await api.get(`/dossiers/patient/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDossiers(dossierRes.data);

      } catch (error) {
        console.error("❌ Erreur de chargement :", error);
        if (error.response?.status === 403) {
          alert("⚠️ Accès interdit. Vérifiez vos permissions.");
        }
        navigate('/');
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleAddDossier = () => {
    const token = localStorage.getItem('token');

    if (!nouveauDossier.motif || !nouveauDossier.observation || !nouveauDossier.dateConsultation) {
      alert("Veuillez remplir tous les champs du formulaire.");
      return;
    }

    const dossierPayload = {
      ...nouveauDossier,
      patient: { id }
    };

    api.post('/dossiers', dossierPayload, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setDossiers(prev => [...prev, res.data]);
        setNouveauDossier({ motif: '', observation: '', dateConsultation: '' });
      })
      .catch(err => {
        if (err.response?.status === 409) {
          alert("Ce patient a déjà un dossier pour cet hôpital.");
        } else {
          alert("Erreur lors de la création du dossier.");
          console.error("❌ Erreur :", err);
        }
      });
  };

  if (!patient) return <div className="text-center mt-5">Chargement...</div>;

  return (
    <div className="row">
      {/* Détails du patient */}
      <div className='col-md-6'>
        <div className="card border-success mt-4">
          <div className="card-header bg-success text-white">
            <h5 className="mb-0">
              <i className="fas fa-user me-2"></i>Détails du patient
            </h5>
          </div>
          <div className="card-body bg-light">
            <p><strong>Identifiant :</strong> {patient.patientId}</p>
            <p><strong>Nom :</strong> {patient.nom}</p>
            <p><strong>Prénom :</strong> {patient.prenom}</p>
            <p><strong>Sexe :</strong> {patient.sexe}</p>
            <p><strong>Date de naissance :</strong> {patient.dateNaissance}</p>
            <p><strong>Adresse :</strong> {patient.adresse || 'N/A'}</p>
            <p><strong>Téléphone :</strong> {patient.telephone || 'N/A'}</p>
          </div>
        </div>

        {/* Ajouter un nouveau dossier */}
        <div className="card border-success mt-4">
          <div className="card-header bg-success text-white">
            <h5 className="mb-0">
              <i className="fas fa-plus me-2"></i>Ajouter un nouveau dossier
            </h5>
          </div>
          <div className="card-body bg-light">
            <input
              type="date"
              className="form-control mb-2"
              value={nouveauDossier.dateConsultation}
              onChange={e => setNouveauDossier({ ...nouveauDossier, dateConsultation: e.target.value })}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Motif"
              value={nouveauDossier.motif}
              onChange={e => setNouveauDossier({ ...nouveauDossier, motif: e.target.value })}
            />
            <textarea
              className="form-control mb-3"
              placeholder="Observation"
              value={nouveauDossier.observation}
              onChange={e => setNouveauDossier({ ...nouveauDossier, observation: e.target.value })}
            />
            <button className="btn btn-success btn-sm float-end" onClick={handleAddDossier}>
              <i className="fas fa-plus me-2"></i>Ajouter
            </button>
          </div>
        </div>

        <button className="btn btn-outline-secondary mt-3" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left me-2"></i>Retour
        </button>
      </div>

      {/* Dossiers Médicaux */}
      <div className='col-md-6'>
        <div className="card border-success mt-4">
          <div className="card-header bg-success text-white">
            <h5 className="mb-0">
              <i className="fas fa-folder-open me-2"></i>Dossiers Médicaux
            </h5>
          </div>
          <div className="card-body bg-light">
            {dossiers.length === 0 ? (
              <p className="text-muted">Aucun dossier médical enregistré.</p>
            ) : (
              <ul className="list-group mb-4">
                {dossiers.map((d, index) => (
                  <li key={index} className="list-group-item">
                    <strong>Date :</strong> {d.dateConsultation} <br />
                    <strong>Motif :</strong> {d.motif} <br />
                    <strong>Observation :</strong> {d.observation}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Section consultations (commentée) */}
        {/* ... future implémentation ici ... */}
      </div>
    </div>
  );
}
