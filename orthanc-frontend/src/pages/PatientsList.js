import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function PatientsList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    api.get('/patients')
      .then(res => setPatients(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Liste des patients</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>PatientID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Sexe</th>
            <th>Date de naissance</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p, index) => (
            <tr key={index}>
              <td>{p.patientId}</td>
              <td>{p.nom}</td>
              <td>{p.prenom}</td>
              <td>{p.sexe}</td>
              <td>{p.dateNaissance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
