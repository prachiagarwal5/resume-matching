import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateResume from "./pages/create"; // Your report page
import ResumeUpload from "./pages/ResumeUpload";
// import TemplateSelection from './pages/TemplateSelection';
import TemplateSelection from "./Component/TemplateSelection";
import ResumePreview from "./Component/ResumePreview";
import SignupPage from "./pages/signup";
import Login from "./pages/login";
// import MultipleResume from "./pages/MultipleResume";
// import Communication from "./pages/Communication";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/resumeupload" element={<ResumeUpload />} />
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/resume-creation" element={<CreateResume />} />
        <Route path="/template-selection" element={<TemplateSelection />} />
        <Route path="/resume-preview/:templateId" element={<ResumePreview />} />
        {/* <Route path="/resume-creation" element={<CreateResume />} /> */}
        {/* Home page route */}
        {/* <Route path="/" element={<MultipleResume />} /> */}
        {/* <Route path="/resume" element={< Resume/>} /> */}
        {/* <Route path='/communication' element={<Communication />} /> */}
      </Routes>
    </Router>
  );
}

export default App;