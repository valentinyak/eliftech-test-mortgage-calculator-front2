import { useState, useEffect } from 'react';

import HomeView from './views/HomeView';
import ManagementView from './views/ManagementView';
import Calculator from './components/Calculator/Calculator';
import Nav from './components/Nav';
import { getBanks } from './services/banks-api';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

export default function App() {
  const [banks, setBanks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBanks()
      .then(res => setBanks(() => [...res.data]))
      .then(() => setIsLoading(false));
  }, []);

  return (
    <Router>
      <Nav></Nav>

      <Routes>
        <Route path="/management" element={<ManagementView />} />
        <Route
          path="/calculator"
          element={<Calculator banks={banks} isLoading={isLoading} />}
        />
        <Route path="/" element={<HomeView />} />
      </Routes>
    </Router>
  );
}
