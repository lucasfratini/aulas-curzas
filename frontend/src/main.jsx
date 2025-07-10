import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import CarrerasPage from './pages/CarrerasPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
         <Route path="/carreras" element={<CarrerasPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);