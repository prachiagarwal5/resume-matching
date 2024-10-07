import React, { useState } from 'react';

const CreateResume = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    gmail: '',
    linkedIn: '',
    github: '',
    graduation: {
      universityName: '',
      cpi: '',
      stream: '',
      yearSpan: '',
      location: '',
    },
    intermediate: {
      schoolName: '',
      percentage: '',
      stream: '',
      yearSpan: '',
      location: '',
    },
    highSchool: {
      schoolName: '',
      percentage: '',
      yearSpan: '',
      location: '',
    },
    technicalSkills: [''],
    softSkills: [''],
    projects: [{ title: '', description: '' }], // Initialize with one empty project
    experience: [{ designation: '', companyName: '', description: '' }],
  });

  const handleInputChange = (e, section, field) => {
    if (section) {
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [field]: e.target.value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [field]: e.target.value,
      });
    }
  };

  const handleSkillChange = (index, type, value) => {
    const updatedSkills = [...formData[type]];
    updatedSkills[index] = value;
    setFormData({
      ...formData,
      [type]: updatedSkills,
    });
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index][field] = value;
    setFormData({
      ...formData,
      projects: updatedProjects,
    });
  };

  const addSkillInput = (type) => {
    setFormData({
      ...formData,
      [type]: [...formData[type], ''],
    });
  };

  const addProjectInput = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { title: '', description: '' }], // Add an empty project object
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Resume Data Submitted: ', formData);
    // Here, you can send the data to the backend or any other logic
  };
  const addExperienceInput = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { designation: '', companyName: '', description: '' }],
    });
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...formData.experience];
    newExperience[index][field] = value;
    setFormData({ ...formData, experience: newExperience });
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center w-screen">
      {/* Navbar */}
      <nav className="bg-white bg-opacity-80 text-purple-900 w-full p-4 shadow-lg flex justify-between items-center">
        <div className="text-3xl font-extrabold tracking-wide">GLA Resume Fit</div>
        <div className="flex items-center">
          <span className="text-lg font-semibold mr-4">Hi xyz</span>
          <div className="w-10 h-10 bg-purple-700 text-white rounded-full flex items-center justify-center">P</div>
        </div>
      </nav>

      {/* Form */}
      <div className="w-full max-w-4xl mt-12 bg-white p-8 shadow-2xl rounded-lg">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-8">Create Your Resume</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name, Phone Number, and Gmail in one row */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                value={formData.name}
                onChange={(e) => handleInputChange(e, null, 'name')}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
              <input
                type="tel"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange(e, null, 'phoneNumber')}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Gmail</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                value={formData.gmail}
                onChange={(e) => handleInputChange(e, null, 'gmail')}
                required
              />
            </div>
          </div>

          {/* LinkedIn and GitHub profile in one row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">LinkedIn Profile</label>
              <input
                type="url"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                value={formData.linkedIn}
                onChange={(e) => handleInputChange(e, null, 'linkedIn')}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">GitHub Profile</label>
              <input
                type="url"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                value={formData.github}
                onChange={(e) => handleInputChange(e, null, 'github')}
              />
            </div>
          </div>

          {/* Graduation */}
          <div>
            <h3 className="text-xl font-semibold text-purple-600 mb-4">Graduation</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">University Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={formData.graduation.universityName}
                  onChange={(e) => handleInputChange(e, 'graduation', 'universityName')}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">CPI</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={formData.graduation.cpi}
                  onChange={(e) => handleInputChange(e, 'graduation', 'cpi')}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Stream</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={formData.graduation.stream}
                  onChange={(e) => handleInputChange(e, 'graduation', 'stream')}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Year Span</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={formData.graduation.yearSpan}
                  onChange={(e) => handleInputChange(e, 'graduation', 'yearSpan')}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Location</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={formData.graduation.location}
                  onChange={(e) => handleInputChange(e, 'graduation', 'location')}
                  required
                />
              </div>
            </div>
          </div>

          {/* Intermediate */}
          <div>
            <h3 className="text-xl font-semibold text-purple-600 mb-4">Intermediate</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">School Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={formData.intermediate.schoolName}
                  onChange={(e) => handleInputChange(e, 'intermediate', 'schoolName')}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Percentage</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={formData.intermediate.percentage}
                  onChange={(e) => handleInputChange(e, 'intermediate', 'percentage')}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Stream</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={formData.intermediate.stream}
                  onChange={(e) => handleInputChange(e, 'intermediate', 'stream')}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Year Span</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={formData.intermediate.yearSpan}
                  onChange={(e) => handleInputChange(e, 'intermediate', 'yearSpan')}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Location</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={formData.intermediate.location}
                  onChange={(e) => handleInputChange(e, 'intermediate', 'location')}
                  required
                />
              </div>
            </div>
          </div>

          {/* High School */}
          <div>
            <h3 className="text-xl font-semibold text-purple-600 mb-4">High School</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">School Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={formData.highSchool.schoolName}
                  onChange={(e) => handleInputChange(e, 'highSchool', 'schoolName')}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Percentage</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={formData.highSchool.percentage}
                  onChange={(e) => handleInputChange(e, 'highSchool', 'percentage')}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Year Span</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={formData.highSchool.yearSpan}
                  onChange={(e) => handleInputChange(e, 'highSchool', 'yearSpan')}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Location</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={formData.highSchool.location}
                  onChange={(e) => handleInputChange(e, 'highSchool', 'location')}
                  required
                />
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <h3 className="text-xl font-semibold text-purple-600 mb-4">Skills</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Technical Skills */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Technical Skills</label>
                {formData.technicalSkills.map((skill, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      value={skill}
                      onChange={(e) => handleSkillChange(index, 'technicalSkills', e.target.value)}
                    />
                    <button
                      type="button"
                      className="ml-2 bg-purple-700 text-white p-2 rounded-full"
                      onClick={() => addSkillInput('technicalSkills')}
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>
              {/* Soft Skills */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Soft Skills</label>
                {formData.softSkills.map((skill, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      value={skill}
                      onChange={(e) => handleSkillChange(index, 'softSkills', e.target.value)}
                    />
                    <button
                      type="button"
                      className="ml-2 bg-purple-700 text-white p-2 rounded-full"
                      onClick={() => addSkillInput('softSkills')}
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div>
            <h3 className="text-xl font-semibold text-purple-600 mb-4">Projects</h3>
            {formData.projects.map((project, index) => (
              <div key={index} className="grid grid-cols-1 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Project Title</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      value={project.title}
                      onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Project Description</label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      value={project.description}
                      onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className=" bg-purple-700 text-white  rounded-full w-1/12"
                  onClick={addProjectInput}
                >
                  +
                </button>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-purple-600 mb-4">Work Experience</h3>
            {formData.experience.map((exp, index) => (
              <div key={index} className="grid grid-cols-1 mb-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Designation</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      value={exp.designation}
                      onChange={(e) => handleExperienceChange(index, 'designation', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Company Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      value={exp.companyName}
                      onChange={(e) => handleExperienceChange(index, 'companyName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Description</label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-2 bg-purple-700 text-white p-2 rounded-full"
                  onClick={addExperienceInput}
                >
                  +
                </button>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition duration-300"
            >
              Create Resume
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateResume;
