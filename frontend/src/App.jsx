import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReportPage from './pages/ReportPage'; // Your report page
import ResumeUpload from './pages/ResumeUpload';     // If you have a home page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ResumeUpload />} />  {/* Home page route */}
        <Route path="/report" element={<ReportPage />} /> {/* Report route */}
      </Routes>
    </Router>
  );
}

export default App;
