import React from 'react';
import TemplateOne from './templates/TemplateOne';
import { useLocation } from 'react-router-dom';

const ResumePreview = () => {
  const location = useLocation();
  const { formData, selectedTemplate } = location.state || {}; // Destructure state from location

  console.log('Received formData:', formData); // Debugging

  if (!formData || !formData.success) {
    return <div>No valid data received. Please check your form submission.</div>; 
  }

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 1:
        return <TemplateOne formData={formData.resume} />;
      // Additional cases for other templates
      default:
        return <TemplateOne formData={formData.resume} />;
    }
  };

  return (
    <div>
      {renderTemplate()}
      <button onClick={() => console.log('Download PDF functionality here')}>
        Download PDF
      </button>
    </div>
  );
};

export default ResumePreview;
