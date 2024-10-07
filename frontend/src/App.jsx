import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateResume from './pages/create'; // Your report page
import ResumeUpload from './pages/ResumeUpload';     // If you have a home page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ResumeUpload />} /> 
        <Route path="/resume-creation" element={<CreateResume />} /> {/* Home page route */}
        
      </Routes>
    </Router>
  );
}

export default App;
