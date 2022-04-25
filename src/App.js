import { useState } from 'react';

import HomeView from './views/HomeView';
import Management from './views/Management';
import Calculator from './components/Calculator/Calculator';
import Nav from './components/Nav';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

function App() {
  const [banks, setBanks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [monthlyPayment, setMonthlyPayment] = useState(0.0);
  const [chousedBank, setChousedBank] = useState({});

  return (
    <Router>
      <Nav></Nav>

      <div>
        <Routes>
          <Route path="/management" element={<Management />} />
          <Route
            path="/calculator"
            element={
              <Calculator
                banks={banks}
                setBanks={setBanks}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                monthlyPayment={monthlyPayment}
                setMonthlyPayment={setMonthlyPayment}
                chousedBank={chousedBank}
                setChousedBank={setChousedBank}
              />
            }
          />
          <Route path="/" element={<HomeView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
