import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/index';
import Trade from './pages/trade/trade';
import Portfolio from './pages/portfolio/portfolio';
import Rates from './pages/rates/rates';
import "./App.css"

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/rates" element={<Rates />} />
        </Routes>
    </Router>
  );
}

export default App;