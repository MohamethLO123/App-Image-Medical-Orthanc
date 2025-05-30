import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PatientsList from './pages/PatientsList';
import AddPatient from './pages/AddPatient';
import PatientDetails from './pages/PatientDetails';
import AddHopital from './pages/AddHopital';
import Login from './pages/Login';
import AddRole from './pages/AddRole';
import AddUtilisateur from './pages/AddUtilisateur';
import UsersList from './pages/UsersList';
import EditUtilisateur from './pages/EditUtilisateur';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Page publique */}
        <Route path="/login" element={<Login />} />

        {/* Routes protégées */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<PatientsList />} />
          <Route path="add" element={<AddPatient />} />
          <Route path="patients/:id" element={<PatientDetails />} />
          <Route path="hopitaux/add" element={<AddHopital />} />
          <Route path="roles/add" element={<AddRole />} />
          <Route path="utilisateurs" element={<UsersList />} />
          <Route path="utilisateurs/add" element={<AddUtilisateur />} />
          <Route path="utilisateurs/:id" element={<EditUtilisateur />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
