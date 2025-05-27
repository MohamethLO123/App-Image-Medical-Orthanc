import React from 'react';

export default function Header() {
  return (
    <header className="header">
      <div className="d-flex align-items-center">
        <img src="/logo192.png" alt="logo" style={{ width: 30, marginRight: 10 }} />
        <strong className="text-success">ORTHANC - ESP</strong>
      </div>
      <div>
        <span className="text-muted">Bienvenue, Médecin 👨‍⚕️</span>
      </div>
    </header>
  );
}
