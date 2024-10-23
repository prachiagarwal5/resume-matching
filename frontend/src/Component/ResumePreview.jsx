import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import TemplateOne from './templates/TemplateOne';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const ResumePreview = () => {
  const componentRef = useRef(); // Ref to the content we want to print
  const location = useLocation();
  const { formData, selectedTemplate } = location.state || {}; // Destructure state from location


  const downloadPDF = async () => {
    const pdf = new jsPDF();
    const canvas = await html2canvas(componentRef.current);
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save('resume.pdf');
  };

  if (!formData) {
    return <div>No valid data received. Please check your form submission.</div>;
  }

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 1:
        return <TemplateOne formData={formData.resume} ref={componentRef} />; // Pass the ref correctly
      default:
        return <TemplateOne formData={formData.resume} ref={componentRef} />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8 transition duration-300  w-screen">
      <div className="flex justify-center items-center min-h-screen">
        {renderTemplate()} {/* Ensure the template renders inside this container */}
      </div>
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={downloadPDF}
          className="bg-green-500 dark:bg-green-700 hover:bg-green-600 dark:hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default ResumePreview;
