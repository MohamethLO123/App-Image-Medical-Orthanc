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
    <div className="container mt-4">
      <div className="card border-primary">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0"><i className="fas fa-stethoscope me-2"></i>Détail de la consultation</h5>
        </div>
        <div className="card-body">
          <p><strong>Date :</strong> {consultation.dateConsultation}</p>
          <p><strong>Motif :</strong> {consultation.motif}</p>
          <p><strong>Diagnostic :</strong> {consultation.diagnostic}</p>
          <p><strong>Traitement :</strong> {consultation.traitement}</p>
          <p><strong>Note :</strong> {consultation.note || 'Aucune note'}</p>
        </div>
        <div className="card-footer text-end">
          <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
            <i className="fas fa-arrow-left me-2"></i>Retour
          </button>
        </div>
      </div>
    </div>
  );
}
