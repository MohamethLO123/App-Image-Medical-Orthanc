import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-success text-white text-center py-2 mt-auto">
      &copy; {new Date().getFullYear()} - Application Médicale Orthanc - ESP
    </footer>
  );
}
