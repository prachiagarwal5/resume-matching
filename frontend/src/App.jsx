import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateResume from './pages/create'; // Your report page
import ResumeUpload from './pages/ResumeUpload';
import Resume from './pages/resume';     // If you have a home page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ResumeUpload />} /> 
        <Route path="/resume-creation" element={<CreateResume />} /> {/* Home page route */}
        <Route path="/resume" element={< Resume/>} />
      </Routes>
    </Router>
  );
}

export default App;
