// PatientDetails.js complet avec SweetAlert2, toggle formulaire dossier et consultation

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import Swal from 'sweetalert2';

export default function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [dossiers, setDossiers] = useState([]);
  const [consultationsParDossier, setConsultationsParDossier] = useState({});
  const [dossierSelectionne, setDossierSelectionne] = useState(null);
  const [showDossierForm, setShowDossierForm] = useState(false);
  const [showConsultationForm, setShowConsultationForm] = useState(false);

  const [nouveauDossier, setNouveauDossier] = useState({
    motif: '',
    observation: '',
    dateConsultation: ''
  });

  const [nouvelleConsultation, setNouvelleConsultation] = useState({
    motif: '',
    diagnostic: '',
    traitement: '',
    note: ''
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
        console.error("Erreur de chargement :", error);
        navigate('/');
      }
    };

    fetchData();
  }, [id, navigate]);

  const chargerConsultations = async (dossierId) => {
    const token = localStorage.getItem('token');
    try {
      const res = await api.get(`/consultations/dossier/${dossierId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConsultationsParDossier(prev => ({ ...prev, [dossierId]: res.data }));
    } catch (error) {
      console.error("Erreur chargement consultations :", error);
    }
  };

  const handleSelectDossier = (dossierId) => {
    setDossierSelectionne(dossierId);
    chargerConsultations(dossierId);
    setShowConsultationForm(false);
  };

  const handleAddDossier = () => {
    if (!nouveauDossier.motif || !nouveauDossier.observation || !nouveauDossier.dateConsultation) {
      Swal.fire('Champs requis', 'Veuillez remplir tous les champs.', 'warning');
      return;
    }

    Swal.fire({
      title: 'Ajouter ce dossier ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler'
    }).then(result => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('token');
        const payload = { ...nouveauDossier, patient: { id } };

        api.post('/dossiers', payload, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          setDossiers(prev => [...prev, res.data]);
          setNouveauDossier({ motif: '', observation: '', dateConsultation: '' });
          setShowDossierForm(false);
          Swal.fire('Ajouté', 'Dossier médical créé.', 'success');
        })
        .catch(err => {
          if (err.response?.status === 409) {
            Swal.fire('Erreur', 'Ce patient a déjà un dossier dans cet hôpital.', 'error');
          } else {
            Swal.fire('Erreur', 'Création impossible.', 'error');
          }
        });
      }
    });
  };

  const handleAddConsultation = () => {
    if (!dossierSelectionne) {
      Swal.fire('Erreur', 'Aucun dossier sélectionné.', 'error');
      return;
    }
    const { motif, diagnostic, traitement } = nouvelleConsultation;
    if (!motif || !diagnostic || !traitement) {
      Swal.fire('Champs requis', 'Tous les champs sauf la note sont obligatoires.', 'warning');
      return;
    }

    Swal.fire({
      title: 'Ajouter cette consultation ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler'
    }).then(result => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('token');
        const payload = { ...nouvelleConsultation, dossier: { id: dossierSelectionne } };

        api.post('/consultations', payload, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
          setNouvelleConsultation({ motif: '', diagnostic: '', traitement: '', note: '' });
          setShowConsultationForm(false);
          chargerConsultations(dossierSelectionne);
          Swal.fire('Ajouté', 'Consultation enregistrée.', 'success');
        })
        .catch(() => {
          Swal.fire('Erreur', "Erreur lors de l'ajout.", 'error');
        });
      }
    });
  };

  if (!patient) return <div className="text-center mt-5">Chargement...</div>;

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="card border-success mt-4">
          <div className="card-header bg-success text-white">
            <h5><i className="fas fa-user me-2"></i>Détails du patient</h5>
          </div>
          <div className="card-body">
            <p><strong>ID :</strong> {patient.patientId}</p>
            <p><strong>Nom :</strong> {patient.nom}</p>
            <p><strong>Prénom :</strong> {patient.prenom}</p>
            <p><strong>Sexe :</strong> {patient.sexe}</p>
            <p><strong>Date naissance :</strong> {patient.dateNaissance}</p>
            <p><strong>Téléphone :</strong> {patient.telephone}</p>
            <p><strong>Adresse :</strong> {patient.adresse}</p>
          </div>
        </div>

        <div className="card border-success mt-4">
          <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
            <h5><i className="fas fa-folder-open me-2"></i>Dossiers Médicaux</h5>
            <button className="btn btn-sm btn-light" onClick={() => setShowDossierForm(!showDossierForm)}>
              <i className={`fas ${showDossierForm ? 'fa-eye-slash' : 'fa-plus'}`}></i>
            </button>
          </div>
          <div className="card-body">
            {showDossierForm && (
              <div>
                <input type="date" className="form-control mb-2" value={nouveauDossier.dateConsultation}
                  onChange={e => setNouveauDossier({ ...nouveauDossier, dateConsultation: e.target.value })} />
                <input type="text" className="form-control mb-2" placeholder="Motif"
                  value={nouveauDossier.motif}
                  onChange={e => setNouveauDossier({ ...nouveauDossier, motif: e.target.value })} />
                <textarea className="form-control mb-2" placeholder="Observation"
                  value={nouveauDossier.observation}
                  onChange={e => setNouveauDossier({ ...nouveauDossier, observation: e.target.value })} />
                <button className="btn btn-success btn-sm float-end" onClick={handleAddDossier}>Ajouter</button>
              </div>
            )}
            <ul className="list-group">
              {dossiers.map((d, i) => (
                <li key={i} className={`list-group-item ${dossierSelectionne === d.id ? 'active' : ''}`}
                  style={{ cursor: 'pointer' }} onClick={() => handleSelectDossier(d.id)}>
                  <strong>{d.dateConsultation}</strong><br />{d.motif}<br />
                  <small className="text-muted">Hôpital : {d.hopital?.nom || 'N/A'}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="card border-primary mt-4">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5><i className="fas fa-stethoscope me-2"></i>Consultations</h5>
            {dossierSelectionne && (
              <button className="btn btn-sm btn-light" onClick={() => setShowConsultationForm(prev => !prev)}>
                <i className={`fas ${showConsultationForm ? 'fa-eye-slash' : 'fa-plus'}`}></i>
              </button>
            )}
          </div>
          <div className="card-body">
            {!dossierSelectionne ? (
              <p className="text-muted">Sélectionnez un dossier pour afficher les consultations.</p>
            ) : (
              <>
                {showConsultationForm && (
                  <div>
                    <input className="form-control mb-1" placeholder="Motif"
                      value={nouvelleConsultation.motif}
                      onChange={e => setNouvelleConsultation({ ...nouvelleConsultation, motif: e.target.value })} />
                    <input className="form-control mb-1" placeholder="Diagnostic"
                      value={nouvelleConsultation.diagnostic}
                      onChange={e => setNouvelleConsultation({ ...nouvelleConsultation, diagnostic: e.target.value })} />
                    <input className="form-control mb-1" placeholder="Traitement"
                      value={nouvelleConsultation.traitement}
                      onChange={e => setNouvelleConsultation({ ...nouvelleConsultation, traitement: e.target.value })} />
                    <textarea className="form-control mb-2" placeholder="Note"
                      value={nouvelleConsultation.note}
                      onChange={e => setNouvelleConsultation({ ...nouvelleConsultation, note: e.target.value })} />
                    <button className="btn btn-success btn-sm" onClick={handleAddConsultation}>Ajouter consultation</button>
                  </div>
                )}

                {consultationsParDossier[dossierSelectionne]?.length ? (
                  <ul className="list-group mt-3">
                    {consultationsParDossier[dossierSelectionne].map((c, i) => (
                    <li key={i} className="list-group-item d-flex justify-content-between align-items-start">
                      <div>
                        <strong>Date :</strong> {c.dateConsultation}<br />
                        <strong>Motif :</strong> {c.motif}<br />
                        <strong>Diagnostic :</strong> {c.diagnostic}<br />
                        <strong>Traitement :</strong> {c.traitement}
                      </div>

                      <button
                        className="btn btn-outline-primary btn-sm"
                        title="Voir détails"
                        onClick={() => navigate(`/consultations/${c.id}`)}
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                    </li>
                  ))}

                  </ul>
                ) : <p className="text-muted mt-3">Aucune consultation enregistrée.</p>}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
