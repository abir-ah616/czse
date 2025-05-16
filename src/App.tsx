import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PointTablePage from './pages/PointTablePage';
import SlotListPage from './pages/SlotListPage';
import EditorDashboard from './pages/EditorDashboard';
import { TournamentProvider } from './contexts/TournamentContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <TournamentProvider>
      <Router>
        <div className="min-h-screen w-full font-rajdhani text-white">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/point-table" element={<PointTablePage />} />
            <Route path="/slot-list" element={<SlotListPage />} />
            <Route path="/editor" element={<EditorDashboard />} />
          </Routes>
          <ToastContainer position="bottom-right" theme="dark" />
        </div>
      </Router>
    </TournamentProvider>
  );
}

export default App;