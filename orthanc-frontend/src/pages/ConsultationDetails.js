// ConsultationDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function ConsultationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [consultation, setConsultation] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    api.get(`/consultations/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setConsultation(res.data))
      .catch(err => {
        console.error('Erreur chargement consultation :', err);
        navigate(-1);
      });
  }, [id, navigate]);

  if (!consultation) return <div className="text-center mt-5">Chargement...</div>;

  return (
    <div className='row'>
        {/* Colonne Consultation */}
        <div className='col-md-4 d-flex'>
            <div className="card border-success w-100 h-100">
            <div className="card-header bg-success text-white">
                <h5 className="mb-0"><i className="fas fa-stethoscope me-2"></i>Détail de la consultation</h5>
            </div>
            <div className="card-body">
                <p><strong>Date :</strong> {consultation.dateConsultation}</p>
                <p><strong>Motif :</strong> {consultation.motif}</p>
                <p><strong>Diagnostic :</strong> {consultation.diagnostic}</p>
                <p><strong>Traitement :</strong> {consultation.traitement}</p>
                <p><strong>Note :</strong> {consultation.note || 'Aucune note'}</p>
            </div>
            </div>
        </div>

        {/* Colonne Médecin */}
        <div className='col-md-4 d-flex'>
            <div className="card border-success w-100 h-100">
            <div className="card-header bg-success text-white">
                <h5 className="mb-0"><i className="fas fa-user-md me-2"></i>Détail du Médecin</h5>
            </div>
            <div className="card-body">
                <p><strong>Nom :</strong> {consultation.medecin?.nom} {consultation.medecin?.prenom}</p>
                <p><strong>Email :</strong> {consultation.medecin?.email}</p>
                <p><strong>Téléphone :</strong> {consultation.medecin?.telephone || 'Non précisé'}</p>
            </div>
            </div>
        </div>

        {/* Colonne Hôpital */}
        <div className='col-md-4 d-flex'>
            <div className="card border-success w-100 h-100">
            <div className="card-header bg-success text-white">
                <h5 className="mb-0"><i className="fas fa-hospital me-2"></i>Détail de l'Hôpital</h5>
            </div>
            <div className="card-body">
                <p><strong>Nom :</strong> {consultation.hopital?.nom}</p>
                <p><strong>Adresse :</strong> {consultation.hopital?.adresse || 'Non précisé'}</p>
            </div>
            </div>
        </div>

        <div className='row'>
            
        </div>

        {/* Bouton retour en bas */}
        <div className="mt-3 text-start">
            <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
            <i className="fas fa-arrow-left me-2"></i>Retour
            </button>
        </div>
    </div>

    );

}
