import React from 'react';

const TemplateOne = ({ formData }) => {
  console.log("Form Data received in TemplateOne:", formData);

  if (!formData) {
    return <div className="text-center text-gray-500">No data available for this template.</div>; 
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg dark:bg-gray-800 transition duration-300 ease-in-out">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">{formData.contactInformation?.name || 'Your Name'}</h1>
        <div className="flex justify-center space-x-4 text-sm text-gray-700 dark:text-gray-400">
          <span>{formData.contactInformation?.phone || 'Your Phone'}</span>
          <span>{formData.contactInformation?.email || 'Your Email'}</span>
          <span>{formData.contactInformation?.studentId || 'Your ID'}</span>
          <a href={formData.contactInformation?.github || '#'} className="text-blue-600 dark:text-blue-400">{formData.contactInformation?.github ? 'Github' : 'No GitHub Profile'}</a>
          <a href={formData.contactInformation?.linkedin || '#'} className="text-blue-600 dark:text-blue-400">{formData.contactInformation?.linkedin ? 'LinkedIn' : 'No LinkedIn Profile'}</a>
        </div>
      </header>

      {/* Education Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 border-b-2 border-gray-300 dark:border-gray-600">EDUCATION</h2>
        {formData.education ? (
          <div className="mb-2">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">{formData.education.graduation.degree} <span className="font-normal">{formData.education.graduation.yearSpan}</span></h3>
            <p className="text-gray-600 dark:text-gray-400">{formData.education.graduation.institution}</p>
            <p className="text-gray-600 dark:text-gray-400">{formData.education.graduation.CPI}</p>
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No education details available.</p>
        )}
      </section>

      {/* Projects Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 border-b-2 border-gray-300 dark:border-gray-600">ACADEMIC PROJECT</h2>
        {formData.projects?.length > 0 ? (
          formData.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">{project.title}</h3>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
                {project.description.map((desc, descIndex) => (
                  <li key={descIndex}>{desc}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No projects available.</p>
        )}
      </section>

      {/* Internship Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 border-b-2 border-gray-300 dark:border-gray-600">INTERNSHIP</h2>
        {formData.internships?.length > 0 ? (
          formData.internships.map((internship, index) => (
            <div key={index} className="mb-2">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">{internship.position}, {internship.company} <span className="font-normal">{internship.duration}</span></h3>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
                {internship.responsibilities.map((responsibility, respIndex) => (
                  <li key={respIndex}>{responsibility}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No internship details available.</p>
        )}
      </section>

      {/* Technical Skills Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 border-b-2 border-gray-300 dark:border-gray-600">TECHNICAL SKILLS</h2>
        <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
          {formData.skills?.length > 0 ? (
            formData.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))
          ) : (
            <li>No skills listed.</li>
          )}
        </ul>
      </section>

      {/* Certifications Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 border-b-2 border-gray-300 dark:border-gray-600">CERTIFICATIONS</h2>
        <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
          {formData.certifications?.length > 0 ? (
            formData.certifications.map((certification, index) => (
              <li key={index} className="flex justify-between">
                {certification.title} <a href={certification.link} className="text-blue-600 dark:text-blue-400 hover:underline">LINK</a>
              </li>
            ))
          ) : (
            <li>No certifications listed.</li>
          )}
        </ul>
      </section>

      {/* Positions of Responsibility Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 border-b-2 border-gray-300 dark:border-gray-600">POSITIONS OF RESPONSIBILITY</h2>
        <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
          {formData.positions?.length > 0 ? (
            formData.positions.map((position, index) => (
              <li key={index}>
                <strong>{position.title}</strong>
                <ul className="list-disc pl-5">
                  {position.responsibilities.map((resp, respIndex) => (
                    <li key={respIndex}>{resp}</li>
                  ))}
                </ul>
              </li>
            ))
          ) : (
            <li>No positions of responsibility listed.</li>
          )}
        </ul>
      </section>

      {/* Extra-Curricular Activities Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-2 border-b-2 border-gray-300 dark:border-gray-600">EXTRA-CURRICULAR ACTIVITIES AND ACHIEVEMENTS</h2>
        <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
          {formData.activities?.length > 0 ? (
            formData.activities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))
          ) : (
            <li>No activities listed.</li>
          )}
        </ul>
      </section>
    </div>
  );
};

export default TemplateOne;
