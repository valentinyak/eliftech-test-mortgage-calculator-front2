import { useState, useEffect } from 'react';

import HomeView from './views/HomeView';
import Managemen from './components/Management/Management';
import Calculator from './components/Calculator/Calculator';
import Nav from './components/Nav';
import { getBanks } from './services/banks-api';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

export default function App() {
  const [banks, setBanks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chousedBank, setChousedBank] = useState({});

  useEffect(() => {
    getBanks()
      .then(res => {
        setBanks(() => [...res.data]);
        setChousedBank(res.data[0]);
      })
      .then(() => setIsLoading(false));
  }, []);

  return (
    <Router>
      <Nav></Nav>

      <Routes>
        <Route
          path="/management"
          element={
            <Managemen
              banks={banks}
              setBanks={setBanks}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          }
        />
        <Route
          path="/calculator"
          element={
            <Calculator
              banks={banks}
              isLoading={isLoading}
              chousedBank={chousedBank}
              setChousedBank={setChousedBank}
            />
          }
        />
        <Route path="/" element={<HomeView />} />
      </Routes>
    </Router>
  );
}
