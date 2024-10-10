import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateResume from './pages/create'; // Your report page
import ResumeUpload from './pages/ResumeUpload';
import TemplateSelection from './pages/TemplateSelection';
import ResumePreview from './Component/ResumePreview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ResumeUpload />} /> 
        <Route path="/resume-creation" element={<CreateResume />} />
        <Route path="/template-selection" element={<TemplateSelection />} />
        <Route path="/resume-preview" element={<ResumePreview />} />
      </Routes>
    </Router>
  );
}

export default App;
