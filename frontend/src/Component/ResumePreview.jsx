import React from 'react';
import TemplateOne from './templates/TemplateOne';
// import TemplateTwo from './templates/TemplateTwo';
// Import other templates here

const ResumePreview = ({ formData, selectedTemplateId }) => {
  const renderTemplate = () => {
    switch (selectedTemplateId) {
      case 1:
        return <TemplateOne formData={formData} />;
      case 2:
        return <TemplateOne formData={formData} />;
      // Add cases for other templates here
      default:
        return <TemplateOne formData={formData} />; // Fallback to TemplateOne
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
