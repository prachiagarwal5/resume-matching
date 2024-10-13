import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import TemplateOne from './templates/TemplateOne';
import { useLocation } from 'react-router-dom';

const ResumePreview = () => {
  const componentRef = useRef(); // Ref to the content we want to print
  const location = useLocation();
  const { formData, selectedTemplate } = location.state || {}; // Destructure state from location

  console.log('Received formData:', formData); // Debugging

  const handlePrint = useReactToPrint({
    content: () => componentRef.current, // Attach the ref to the content to print
    documentTitle: 'Resume', // Title of the PDF document
    onAfterPrint: () => {
      console.log('PDF downloaded successfully!'); // Debugging
      alert('PDF downloaded successfully!'); // Callback after print
    },
  });

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
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8 transition duration-300">
      {/* Attach the ref to the content that needs to be printed */}
      <div ref={componentRef} className="flex justify-center items-center min-h-screen">
        {renderTemplate()}
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={handlePrint} // Trigger the PDF download on click
          className="bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default ResumePreview;
