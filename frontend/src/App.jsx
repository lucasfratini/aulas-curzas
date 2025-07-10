import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarrerasPage from './pages/CarrerasPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CarrerasPage />} />
      </Routes>
    </Router>
  );
}

export default App;
