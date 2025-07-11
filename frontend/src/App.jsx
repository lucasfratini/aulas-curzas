// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import CarrerasPage from './pages/CarrerasPage';
import MateriasPage from './pages/MateriasPage';
import AulasPage from './pages/AulasPage';
import AulaDiasPage from './pages/AulaDiasPage';
import UsuariosPage from './pages/UsuariosPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="carreras" element={<CarrerasPage />} />
          <Route path="materias" element={<MateriasPage />} />
          <Route path="aulas" element={<AulasPage />} />
          <Route path="auladias" element={<AulaDiasPage />} />
          <Route path="usuarios" element={<UsuariosPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;