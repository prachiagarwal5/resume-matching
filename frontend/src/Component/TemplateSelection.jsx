import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
// import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import Template3 from "./templates/Template3";
import Template4 from "./templates/Template4";
// import Template5 from "./templates/Template5";
import Template6 from "./templates/Template6";

const TemplateSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [processedData, setProcessedData] = useState(null);

  const formData = location.state?.formData;
  console.log("Form data: (templateselection)", formData);

  useEffect(() => {
    if (formData) {
      const processed =
        typeof formData === "string" ? JSON.parse(formData) : formData;
      setProcessedData(processed);
      console.log("Processed form data:", processed);
    }
  }, [formData]);

  const templates = [
    // {
    //   id: 1,
    //   name: "Professional Classic",
    //   component: Template1,
    //   description:
    //     "A clean and professional template perfect for traditional industries.",
    //   features: [
    //     "Clean layout design",
    //     "Perfect for corporate roles",
    //     "ATS-friendly format",
    //     "Emphasis on experience",
    //   ],
    //   bgColor: "bg-gray-800",
    //   buttonColor: "bg-blue-600 hover:bg-blue-700",
    //   borderColor: "border-gray-700",
    // },
    {
      id: 1,
      name: "Classic Elegance",
      component: Template3,
      description: "A timeless design with a focus on clarity and simplicity.",
      features: [
        "Elegant single-column layout",
        "Clear section separation",
        "Focus on education and experience",
        "Minimalist design",
      ],
      bgColor: "bg-gray-800",
      buttonColor: "bg-green-600 hover:bg-green-700",
      borderColor: "border-gray-700",
    },
    {
      id: 2,
      name: "Modern Creative",
      component: Template2,
      description:
        "A contemporary design that balances creativity with professionalism.",
      features: [
        "Modern two-column layout",
        "Distinct section styling",
        "Skills-focused design",
        "Visual hierarchy",
      ],
      bgColor: "bg-gray-800",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      borderColor: "border-gray-700",
    },
    {
      id: 3,
      name: "Sidebar Professional",
      component: Template4,
      description:
        "A modern template with a sidebar for contact information and a clean main content area.",
      features: [
        "Sidebar for contact info",
        "Clean main content area",
        "Modern and professional look",
        "Emphasis on skills and experience",
      ],
      bgColor: "bg-gray-800",
      buttonColor: "bg-teal-600 hover:bg-teal-700",
      borderColor: "border-gray-700",
    },
    // {
    //   id: 4,
    //   name: "Centered Elegance",
    //   component: Template5,
    //   description:
    //     "A centered header with a clean and organized layout for all sections.",
    //   features: [
    //     "Centered header",
    //     "Clean and organized layout",
    //     "Focus on education and experience",
    //     "Professional design",
    //   ],
    //   bgColor: "bg-gray-800",
    //   buttonColor: "bg-orange-600 hover:bg-orange-700",
    //   borderColor: "border-gray-700",
    // },
    {
      id: 4,
      name: "Two-Column Modern",
      component: Template6,
      description:
        "A modern two-column layout with a focus on skills and experience.",
      features: [
        "Two-column layout",
        "Left column for contact info and skills",
        "Right column for main content",
        "Modern and clean design",
      ],
      bgColor: "bg-gray-800",
      buttonColor: "bg-red-600 hover:bg-red-700",
      borderColor: "border-gray-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white w-screen">
      {/* Header */}
      <div className="bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-white">Resume Templates</h1>
            <button
              onClick={() => navigate("/resume-creation")}
              className="text-gray-300 hover:text-white font-medium transition-colors duration-300"
            >
              Edit Resume
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Choose Your Perfect Template
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Select from our professionally designed templates to create a
            standout resume that perfectly matches your style and industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`rounded-lg border ${template.borderColor} overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl ${template.bgColor}`}
            >
              {/* Template Preview */}
              <div className="p-6">
                <div className="aspect-w-16 aspect-h-12 mb-6">
                  <div className="bg-gray-700 rounded-lg shadow-lg p-4">
                    <div className="h-48 bg-gray-600 rounded-lg animate-pulse"></div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">
                    {template.name}
                  </h3>
                  <p className="text-gray-300">{template.description}</p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {template.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-300"
                      >
                        <svg
                          className="w-5 h-5 mr-2 text-green-400"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Actions */}
                  <div className="flex gap-4 pt-4">
                    <PDFDownloadLink
                      document={<template.component data={processedData} />}
                      fileName={`resume-${template.id}.pdf`}
                      className="flex-1"
                    >
                      {({ loading }) => (
                        <button
                          className={`w-full px-4 py-2 text-white rounded-lg ${template.buttonColor} transition-colors duration-300 ${
                            loading ? "opacity-50 cursor-wait" : ""
                          }`}
                          disabled={loading}
                        >
                          {loading ? (
                            <span className="flex items-center justify-center">
                              <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Generating...
                            </span>
                          ) : (
                            "Use This Template"
                          )}
                        </button>
                      )}
                    </PDFDownloadLink>

                    <button
                      onClick={() => {
                        setSelectedTemplate(template);
                        setShowPreview(true);
                      }}
                      className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
                    >
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Preview Modal */}
      {showPreview && selectedTemplate && processedData && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg w-full max-w-7xl h-[90vh] flex flex-col">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                {selectedTemplate.name} Preview
              </h3>
              <button
                onClick={() => {
                  setShowPreview(false);
                  setSelectedTemplate(null);
                }}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 p-4 bg-gray-900">
              <PDFViewer width="100%" height="100%" className="rounded-lg">
                <selectedTemplate.component data={processedData} />
              </PDFViewer>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-400">
          <p className="text-sm">
            All templates are ATS-friendly and designed to highlight your
            professional experience.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TemplateSelection;