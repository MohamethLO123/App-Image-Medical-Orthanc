import React from 'react';

export default function Footer() {
  return (
    <footer className="main-footer text-center">
      <strong>&copy; {new Date().getFullYear()} Plateforme Orthanc - ESP.</strong> Tous droits réservés.
    </footer>
  );
}
