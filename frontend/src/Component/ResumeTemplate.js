import React from 'react';

const ResumeTemplate = ({ data }) => {
  const { name, linkedInId, githubId, projects, internships, workExperience, qualifications } = data;

  return (
    <div className="resume-template">
      <h1>{name}</h1>
      <p><strong>LinkedIn:</strong> {linkedInId}</p>
      <p><strong>GitHub:</strong> {githubId}</p>

      <h2>Projects</h2>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>{project}</li>
        ))}
      </ul>

      <h2>Internships</h2>
      <ul>
        {internships.map((internship, index) => (
          <li key={index}>{internship}</li>
        ))}
      </ul>

      <h2>Work Experience</h2>
      <ul>
        {workExperience.map((experience, index) => (
          <li key={index}>{experience}</li>
        ))}
      </ul>

      <h2>Qualifications</h2>
      <ul>
        {qualifications.map((qualification, index) => (
          <li key={index}>{qualification}</li>
        ))}
      </ul>
    </div>
  );
};

export default ResumeTemplate;
