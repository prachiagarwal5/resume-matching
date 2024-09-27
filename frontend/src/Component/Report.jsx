import React from 'react';

const Report = ({ data }) => {
  return (
    <div className="bg-white shadow-md rounded p-6">
      <h2 className="text-3xl font-bold mb-4">Resume Analysis Report</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Matched Skills</h3>
        <ul className="list-disc ml-6">
          {data.matchedSkills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Suggested Skills</h3>
        <ul className="list-disc ml-6">
          {data.suggestedSkills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Matched Projects and Internships</h3>
        <ul className="list-disc ml-6">
          {data.matchedProjectsAndInternships.map((item, index) => (
            <li key={index}>
              <strong>{item.project || item.internship}:</strong> {item.description}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Rephrased Projects and Internships</h3>
        <ul className="list-disc ml-6">
          {data.rephrasedProjectsAndInternships.map((item, index) => (
            <li key={index}>
              <strong>Original:</strong> {item.originalProject || item.originalInternship} <br />
              <strong>Rephrased:</strong> {item.rephrasedProject || item.rephrasedInternship}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Resume Improvement Suggestions</h3>
        <ul className="list-disc ml-6">
          {data.resumeImprovementSuggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Report;
