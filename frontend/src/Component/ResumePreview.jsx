import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
// import Template3 from "./templates/Template3";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const ResumePreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, templateId } = location.state;
  const componentRef = useRef();
  console.log("Form data: (resumepreview)", formData);

  const getTemplate = () => {
    switch (templateId) {
      case 1:
        return <Template1 data={formData} ref={componentRef} />;
      case 2:
        return <Template2 data={formData} ref={componentRef} />;
      // case 3:
      //   return <Template3 data={formData} ref={componentRef} />;
      default:
        return <Template1 data={formData} ref={componentRef} />;
    }
  };

  const handleDownload = async () => {
    const content = componentRef.current;
    const pdf = new jsPDF();

    try {
      const canvas = await html2canvas(content);
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("resume.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 w-full">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Resume Preview
          </h2>
          <div className="space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Back
            </button>
            <button
              onClick={handleDownload}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              Download PDF
            </button>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
          {getTemplate()}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
