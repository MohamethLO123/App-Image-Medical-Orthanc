import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PatientsList from './pages/PatientsList';
// Tu ajouteras d'autres pages ici plus tard

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<PatientsList />} />
          {/* <Route path="/add" element={<AddPatient />} /> */}
          {/* <Route path="/orthanc" element={<OrthancStudies />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
