import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TemplateSelection = () => {
  const location = useLocation();
  const formData = location.state?.formData;; // Retrieve the form data passed from handleSubmit
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();

  // Log the received form data
  useEffect(() => {
    console.log("Form Data received in TemplateSelection:", formData);
  }, [formData]);

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId); // Store the selected template ID
    console.log("Selected Template ID:", templateId);
  };

  const handleSubmit = () => {
    if (selectedTemplate) {
      // Log before navigating to ResumePreview
      console.log("Navigating to ResumePreview with formData and selectedTemplate:", formData, selectedTemplate);
      
      // Navigate to the ResumePreview with the selected template and form data
      navigate('/resume-preview', { state: { formData, selectedTemplate } });
    } else {
      alert('Please select a template.');
    }
  };
  if (!formData) {
    return <div>No form data received. Please go back and submit the form again.</div>;
  }

  return (
    <div>
      <h2>Select a Resume Template</h2>
      <div>
        <button onClick={() => handleTemplateSelect(1)}>Template One</button>
        <button onClick={() => handleTemplateSelect(2)}>Template Two</button>
        {/* Add more templates if needed */}
      </div>
      
      <button onClick={handleSubmit}>Preview Resume</button>
    </div>
  );
};

export default TemplateSelection;
