import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/index';
import Trade from './pages/trade/trade';
import "./App.css"

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/trade" element={<Trade />} />
        </Routes>
    </Router>
  );
}

export default App;
