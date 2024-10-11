import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TemplateSelection = () => {
  const location = useLocation();
  const formData = location.state?.formData; // Retrieve the form data passed from handleSubmit
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
    <div className=" bg-gray-100 flex flex-col items-center w-screen" style={{ height: '100vh' }}>
      {/* Navbar */}
      <nav className="bg-white bg-opacity-80 text-purple-900 w-full p-4 shadow-lg flex justify-between items-center">
        <div className="text-3xl font-extrabold tracking-wide">GLA Resume Fit</div>
        <div className="flex items-center">
          <span className="text-lg font-semibold mr-4">Hi xyz</span>
          <div className="w-10 h-10 bg-purple-700 text-white rounded-full flex items-center justify-center">P</div>
        </div>
      </nav>

      {/* Heading */}
      <div className="mt-4">
        <h1 className="text-4xl font-bold text-gray-800">Select Your Resume Template</h1>
      </div>

      {/* Content */}
      <div className="mt-8 w-4/5 flex justify-between space-x-6 " >
        {/* Template 1 */}
        <div 
          className={`w-1/2 border-2 rounded-lg p-4 cursor-pointer ${selectedTemplate === 1 ? 'border-teal-500' : 'border-gray-300'}`} 
          onClick={() => handleTemplateSelect(1)}
        >
          <h3 className="text-center text-xl font-semibold mb-2">Template 1</h3>
          <img src="https://th.bing.com/th/id/OIP.zKuFw6fA3Rg_wvXlPtrq2wAAAA?rs=1&pid=ImgDetMain" alt="Template 1" className="w-full object-cover rounded-lg mb-4"/>
        </div>

        {/* Template 2 */}
        <div 
          className={`w-1/2 border-2 rounded-lg p-4 cursor-pointer ${selectedTemplate === 2 ? 'border-teal-500' : 'border-gray-300'}`} 
          onClick={() => handleTemplateSelect(2)}
        >
          <h3 className="text-center text-xl font-semibold mb-2">Template 2</h3>
          <img src="https://cdn.enhancv.com/images/1080/i/aHR0cHM6Ly9jZG4uZW5oYW5jdi5jb20vcHJlZGVmaW5lZC1leGFtcGxlcy9yWU1USnlYNDZKNUJnS25UTmVEMGdBakFXM0FKSklQaGVsNzkzcEpoL2ltYWdlLnBuZw~~..png" alt="Template 2" className="w-full object-cover rounded-lg mb-4"/>
        </div>
      </div>
      

      {/* Submit Button */}
      <button 
        onClick={handleSubmit} 
        className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg"
      >
        Submit & Preview
      </button>
    </div>
  );
};

export default TemplateSelection;
