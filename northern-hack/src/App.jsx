import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '/src/pages/index';
import Trade from '.././src/pages/trade/trade';
import Portfolio from './pages/portfolio/portfolio';
import Rates from './pages/rates/rates';
import Dashboard from './pages/dashboard/dashboard';
import "./App.css"

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/rates" element={<Rates />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </Router>
  );
}

export default App;