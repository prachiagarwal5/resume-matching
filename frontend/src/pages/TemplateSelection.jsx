import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TemplateSelection = ({ formData }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleSubmit = () => {
    if (selectedTemplate) {
      navigate('/resume-preview', { state: { formData, selectedTemplate } });
    } else {
      alert('Please select a template.');
    }
  };

  return (
    <div>
      <h2>Select a Resume Template</h2>
      <div onClick={() => handleTemplateSelect(1)}>Template One</div>
      <div onClick={() => handleTemplateSelect(2)}>Template Two</div>
      {/* Add other template selections */}
      
      <button onClick={handleSubmit}>Preview Resume</button>
    </div>
  );
};

export default TemplateSelection;
