// src/pages/PatientDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';

export default function PatientDetails() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    api.get(`/patients/${id}`)
      .then(res => setPatient(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!patient) return <div>Chargement...</div>;

  return (
    <div className="card border-success">
      <div className="card-header bg-success text-white d-flex align-items-center">
        <i className="fas fa-user fa-lg me-2"></i>
        <h5 className="mb-0">Détails du patient</h5>
      </div>
      <div className="card-body bg-light">
        <ul className="list-group">
          <li className="list-group-item"><strong>Identifiant :</strong> {patient.patientId}</li>
          <li className="list-group-item"><strong>Nom :</strong> {patient.nom}</li>
          <li className="list-group-item"><strong>Prénom :</strong> {patient.prenom}</li>
          <li className="list-group-item"><strong>Sexe :</strong> {patient.sexe}</li>
          <li className="list-group-item"><strong>Date de naissance :</strong> {patient.dateNaissance}</li>
          <li className="list-group-item"><strong>Adresse :</strong> {patient.adresse}</li>
          <li className="list-group-item"><strong>Téléphone :</strong> {patient.telephone}</li>
        </ul>
      </div>
    </div>
  );
}
