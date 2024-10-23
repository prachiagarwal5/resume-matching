import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const TemplateOne = React.forwardRef((props, ref) => {
  const { formData } = props;
  console.log("Form Data received in TemplateOne:", formData);

  if (!formData) {
    return <div className="text-center text-gray-500">No data available for this template.</div>;
  }

  return (
    <div ref={ref} className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg dark:bg-gray-800 transition duration-300 ease-in-out lg:mx-20  w-screen">

  {/* Header Section */}
  <header className="text-center mb-8">
    <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">{formData.contactInformation?.name || 'Your Name'}</h1>
    <div className="flex justify-center space-x-4 text-sm text-gray-700 dark:text-gray-400">
      <span>{formData.contactInformation?.phone || 'Your Phone'}</span>
      <span>{formData.contactInformation?.email || 'Your Email'}</span>
      <a href={formData.contactInformation?.github || '#'} className="text-blue-600 dark:text-blue-400">{formData.contactInformation?.github ? 'GitHub' : 'No GitHub Profile'}</a>
      <a href={formData.contactInformation?.linkedin || '#'} className="text-blue-600 dark:text-blue-400">{formData.contactInformation?.linkedin ? 'LinkedIn' : 'No LinkedIn Profile'}</a>
    </div>
  </header>

  {/* Objective Section */}
  <section className="mb-6">
    <h2 className="text-2xl font-semibold mb-2 border-b-2 border-gray-300 dark:border-gray-600">Objective</h2>
    <p className="text-gray-600 dark:text-gray-400">{formData.objective || 'No objective provided.'}</p>
  </section>

  {/* Education Section */}
  <section className="mb-6">
    <h2 className="text-2xl font-semibold mb-2 border-b-2 border-gray-300 dark:border-gray-600">Education</h2>
    {formData.education ? (
      <>
        <div className="mb-2">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">{formData.education.graduation.degree} ({formData.education.graduation.yearSpan})</h3>
          <p className="text-gray-600 dark:text-gray-400">{formData.education.graduation.institution}, {formData.education.graduation.location}</p>
          <p className="text-gray-600 dark:text-gray-400">CPI: {formData.education.graduation.CPI}</p>
        </div>
        <div className="mb-2">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">Intermediate ({formData.education.intermediate.yearSpan})</h3>
          <p className="text-gray-600 dark:text-gray-400">{formData.education.intermediate.schoolName}, {formData.education.intermediate.location}</p>
          <p className="text-gray-600 dark:text-gray-400">Percentage: {formData.education.intermediate.percentage}%</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">High School ({formData.education.highSchool.yearSpan})</h3>
          <p className="text-gray-600 dark:text-gray-400">{formData.education.highSchool.schoolName}, {formData.education.highSchool.location}</p>
          <p className="text-gray-600 dark:text-gray-400">Percentage: {formData.education.highSchool.percentage}%</p>
        </div>
      </>
    ) : (
      <p className="text-gray-600 dark:text-gray-400">No education details available.</p>
    )}
  </section>

  {/* Skills Section */}
  <section className="mb-6">
    <h2 className="text-2xl font-semibold mb-2 border-b-2 border-gray-300 dark:border-gray-600">Skills</h2>
    <h3 className="font-semibold text-gray-800 dark:text-gray-200">Technical Skills</h3>
    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
      {formData.skills.technicalSkills?.length > 0 ? (
        formData.skills.technicalSkills.map((skill, index) => <li key={index}>{skill}</li>)
      ) : (
        <li>No technical skills listed.</li>
      )}
    </ul>
    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mt-4">Soft Skills</h3>
    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
      {formData.skills.softSkills?.length > 0 ? (
        formData.skills.softSkills.map((skill, index) => <li key={index}>{skill}</li>)
      ) : (
        <li>No soft skills listed.</li>
      )}
    </ul>
  </section>

  {/* Achievements Section */}
  <section className="mb-6">
    <h2 className="text-2xl font-semibold mb-2 border-b-2 border-gray-300 dark:border-gray-600">Achievements</h2>
    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
      {formData.achievements?.length > 0 ? (
        formData.achievements.map((achievement, index) => <li key={index}>{achievement}</li>)
      ) : (
        <li>No achievements listed.</li>
      )}
    </ul>
  </section>

  {/* Certifications Section */}
  <section className="mb-6">
    <h2 className="text-2xl font-semibold mb-2 border-b-2 border-gray-300 dark:border-gray-600">Certifications</h2>
    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
      {formData.certifications?.length > 0 ? (
        formData.certifications.map((cert, index) => <li key={index}>{cert}</li>)
      ) : (
        <li>No certifications listed.</li>
      )}
    </ul>
  </section>

  {/* Work Experience Section */}
  <section className="mb-6">
    <h2 className="text-2xl font-semibold mb-2 border-b-2 border-gray-300 dark:border-gray-600">Work Experience</h2>
    {formData.workExperience?.length > 0 ? (
      formData.workExperience.map((work, index) => (
        <div key={index} className="mb-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">{work.jobTitle}</h3>
          <p className="text-gray-600 dark:text-gray-400">{work.company}</p>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
            {work.description?.map((desc, idx) => (
              <li key={idx}>{desc}</li>
            ))}
          </ul>
        </div>
      ))
    ) : (
      <p className="text-gray-600 dark:text-gray-400">No work experience listed.</p>
    )}
  </section>
</div>

  );
});

export default TemplateOne;
