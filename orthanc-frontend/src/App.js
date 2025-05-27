import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PatientsList from './pages/PatientsList';
import AddPatient from './pages/AddPatient';
import PatientDetails from './pages/PatientDetails';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PatientsList />} />
          <Route path="add" element={<AddPatient />} />
          <Route path="patients/:id" element={<PatientDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
