import React from 'react';

const TemplateOne = ({ formData }) => {
  return (
    <div>
      <h1>{formData.name}</h1>
      <p>{formData.email}</p>
      <p>{formData.linkedin}</p>
      <p>{formData.github}</p>
      <p>{formData.workExperience}</p>
      {/* Add other fields as needed */}
    </div>
  );
};

export default TemplateOne;
