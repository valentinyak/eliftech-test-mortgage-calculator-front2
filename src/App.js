import Home from './views/Home';
import Management from './views/Management';
import Calculator from './views/Calculator';
import Nav from './components/Nav';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <Router>
      <Nav></Nav>

      <div>
        <Routes>
          <Route path="/management" element={<Management />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
