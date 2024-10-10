import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Resume Data Submitted: ', formData);
    try {
      const response = await axios.post('http://localhost:5001/api/form/submit', formData); 
      console.log('Data sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending data:', error);
    }
    // Here, you can send the data to the backend or any other logic
  };
  const addExperienceInput = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { designation: '', companyName: '', description: '' }],
    });
  };
  const navigate = useNavigate();
  const handleResumeCreation = () => {
   
    navigate('/resume'); // Redirect to the resume page
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
  <div className="relative">
    <label className="block text-gray-700 font-semibold mb-2">Name</label>
    <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
      <i className="fas fa-user text-gray-400 mx-2"></i>
      <input
        type="text"
        className="w-full px-4 py-2 focus:outline-none"
        value={formData.name}
        onChange={(e) => handleInputChange(e, null, 'name')}
        required
      />
    </div>
  </div>
  <div className="relative">
    <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
    <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
      <i className="fas fa-phone text-gray-400 mx-2"></i>
      <input
        type="tel"
        className="w-full px-4 py-2 focus:outline-none"
        value={formData.phoneNumber}
        onChange={(e) => handleInputChange(e, null, 'phoneNumber')}
        required
      />
    </div>
  </div>
  <div className="relative">
    <label className="block text-gray-700 font-semibold mb-2">Gmail</label>
    <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
      <i className="fas fa-envelope text-gray-400 mx-2"></i>
      <input
        type="email"
        className="w-full px-4 py-2 focus:outline-none"
        value={formData.gmail}
        onChange={(e) => handleInputChange(e, null, 'gmail')}
        required
      />
    </div>
  </div>
</div>


          {/* LinkedIn and GitHub profile in one row */}
          <div className="grid grid-cols-3 gap-4">
  <div className="relative">
    <label className="block text-gray-700 font-semibold mb-2">LinkedIn Profile</label>
    <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
      <i className="fab fa-linkedin text-gray-400 mx-2"></i> {/* LinkedIn icon */}
      <input
        type="url"
        className="w-full px-4 py-2 focus:outline-none"
        value={formData.linkedIn}
        onChange={(e) => handleInputChange(e, null, 'linkedIn')}
      />
    </div>
  </div>
  <div className="relative">
    <label className="block text-gray-700 font-semibold mb-2">GitHub Profile</label>
    <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
      <i className="fab fa-github text-gray-400 mx-2"></i> {/* GitHub icon */}
      <input
        type="url"
        className="w-full px-4 py-2 focus:outline-none"
        value={formData.github}
        onChange={(e) => handleInputChange(e, null, 'github')}
      />
    </div>
  </div>
  <div className="relative">
      <label className="block text-gray-700 font-semibold mb-2">Location</label>
      <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
        <i className="fas fa-map-marker-alt text-gray-400 mx-2"></i> {/* Location icon */}
        <input
          type="text"
          className="w-full px-4 py-2 focus:outline-none"
          value={formData.graduation.location}
          onChange={(e) => handleInputChange(e, 'graduation', 'location')}
          required
        />
      </div>
    </div>
</div>


          {/* Graduation */}
          <div>
  <h3 className="text-xl font-semibold text-purple-600 mb-4">Graduation</h3>
  <div className="grid grid-cols-2 gap-4">
    <div className="relative">
      <label className="block text-gray-700 font-semibold mb-2">University Name</label>
      <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
        <i className="fas fa-university text-gray-400 mx-2"></i> {/* University icon */}
        <input
          type="text"
          className="w-full px-4 py-2 focus:outline-none"
          value={formData.graduation.universityName}
          onChange={(e) => handleInputChange(e, 'graduation', 'universityName')}
          required
        />
      </div>
    </div>
    <div className="relative">
      <label className="block text-gray-700 font-semibold mb-2">CPI</label>
      <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
        <i className="fas fa-graduation-cap text-gray-400 mx-2"></i> {/* CPI icon */}
        <input
          type="text"
          className="w-full px-4 py-2 focus:outline-none"
          value={formData.graduation.cpi}
          onChange={(e) => handleInputChange(e, 'graduation', 'cpi')}
          required
        />
      </div>
    </div>
    <div className="relative">
      <label className="block text-gray-700 font-semibold mb-2">Stream</label>
      <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
        <i className="fas fa-book text-gray-400 mx-2"></i> {/* Stream icon */}
        <input
          type="text"
          className="w-full px-4 py-2 focus:outline-none"
          value={formData.graduation.stream}
          onChange={(e) => handleInputChange(e, 'graduation', 'stream')}
          required
        />
      </div>
    </div>
    <div className="relative">
      <label className="block text-gray-700 font-semibold mb-2">Year Span</label>
      <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
        <i className="fas fa-calendar-alt text-gray-400 mx-2"></i> {/* Year Span icon */}
        <input
          type="text"
          className="w-full px-4 py-2 focus:outline-none"
          value={formData.graduation.yearSpan}
          onChange={(e) => handleInputChange(e, 'graduation', 'yearSpan')}
          required
        />
      </div>
    </div>
    <div className="relative">
      <label className="block text-gray-700 font-semibold mb-2">Location</label>
      <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
        <i className="fas fa-map-marker-alt text-gray-400 mx-2"></i> {/* Location icon */}
        <input
          type="text"
          className="w-full px-4 py-2 focus:outline-none"
          value={formData.graduation.location}
          onChange={(e) => handleInputChange(e, 'graduation', 'location')}
          required
        />
      </div>
    </div>
  </div>
</div>


          {/* Intermediate */}
          <div>
  <h3 className="text-xl font-semibold text-purple-600 mb-4">Intermediate</h3>
  <div className="grid grid-cols-2 gap-4">
    <div className="relative">
      <label className="block text-gray-700 font-semibold mb-2">School Name</label>
      <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
        <i className="fas fa-school text-gray-400 mx-2"></i> {/* School icon */}
        <input
          type="text"
          className="w-full px-4 py-2 focus:outline-none"
          value={formData.intermediate.schoolName}
          onChange={(e) => handleInputChange(e, 'intermediate', 'schoolName')}
          required
        />
      </div>
    </div>
    <div className="relative">
      <label className="block text-gray-700 font-semibold mb-2">Percentage</label>
      <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
        <i className="fas fa-percent text-gray-400 mx-2"></i> {/* Percentage icon */}
        <input
          type="text"
          className="w-full px-4 py-2 focus:outline-none"
          value={formData.intermediate.percentage}
          onChange={(e) => handleInputChange(e, 'intermediate', 'percentage')}
          required
        />
      </div>
    </div>
    <div className="relative">
      <label className="block text-gray-700 font-semibold mb-2">Stream</label>
      <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
        <i className="fas fa-book text-gray-400 mx-2"></i> {/* Stream icon */}
        <input
          type="text"
          className="w-full px-4 py-2 focus:outline-none"
          value={formData.intermediate.stream}
          onChange={(e) => handleInputChange(e, 'intermediate', 'stream')}
          required
        />
      </div>
    </div>
    <div className="relative">
      <label className="block text-gray-700 font-semibold mb-2">Year Span</label>
      <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
        <i className="fas fa-calendar-alt text-gray-400 mx-2"></i> {/* Year Span icon */}
        <input
          type="text"
          className="w-full px-4 py-2 focus:outline-none"
          value={formData.intermediate.yearSpan}
          onChange={(e) => handleInputChange(e, 'intermediate', 'yearSpan')}
          required
        />
      </div>
    </div>
    <div className="relative">
      <label className="block text-gray-700 font-semibold mb-2">Location</label>
      <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
        <i className="fas fa-map-marker-alt text-gray-400 mx-2"></i> {/* Location icon */}
        <input
          type="text"
          className="w-full px-4 py-2 focus:outline-none"
          value={formData.intermediate.location}
          onChange={(e) => handleInputChange(e, 'intermediate', 'location')}
          required
        />
      </div>
    </div>
  </div>
</div>


          {/* High School */}
          <div>
  <h3 className="text-xl font-semibold text-purple-600 mb-4">High School</h3>
  <div className="grid grid-cols-2 gap-4">
    <div className="relative">
      <label className="block text-gray-700 font-semibold mb-2">School Name</label>
      <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
        <i className="fas fa-school text-gray-400 mx-2"></i> {/* School icon */}
        <input
          type="text"
          className="w-full px-4 py-2 focus:outline-none"
          value={formData.highSchool.schoolName}
          onChange={(e) => handleInputChange(e, 'highSchool', 'schoolName')}
          required
        />
      </div>
    </div>
    <div className="relative">
      <label className="block text-gray-700 font-semibold mb-2">Percentage</label>
      <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
        <i className="fas fa-percent text-gray-400 mx-2"></i> {/* Percentage icon */}
        <input
          type="text"
          className="w-full px-4 py-2 focus:outline-none"
          value={formData.highSchool.percentage}
          onChange={(e) => handleInputChange(e, 'highSchool', 'percentage')}
          required
        />
      </div>
    </div>
    <div className="relative">
      <label className="block text-gray-700 font-semibold mb-2">Year Span</label>
      <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
        <i className="fas fa-calendar-alt text-gray-400 mx-2"></i> {/* Year Span icon */}
        <input
          type="text"
          className="w-full px-4 py-2 focus:outline-none"
          value={formData.highSchool.yearSpan}
          onChange={(e) => handleInputChange(e, 'highSchool', 'yearSpan')}
          required
        />
      </div>
    </div>
    <div className="relative">
      <label className="block text-gray-700 font-semibold mb-2">Location</label>
      <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
        <i className="fas fa-map-marker-alt text-gray-400 mx-2"></i> {/* Location icon */}
        <input
          type="text"
          className="w-full px-4 py-2 focus:outline-none"
          value={formData.highSchool.location}
          onChange={(e) => handleInputChange(e, 'highSchool', 'location')}
          required
        />
      </div>
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
          <div className="flex items-center border border-gray-300 rounded-lg shadow-sm w-full">
            <i className="fas fa-code text-gray-400 mx-2"></i> {/* Technical skills icon */}
            <input
              type="text"
              className="w-full px-4 py-2 focus:outline-none"
              value={skill}
              onChange={(e) => handleSkillChange(index, 'technicalSkills', e.target.value)}
            />
          </div>
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
          <div className="flex items-center border border-gray-300 rounded-lg shadow-sm w-full">
            <i className="fas fa-comments text-gray-400 mx-2"></i> {/* Soft skills icon */}
            <input
              type="text"
              className="w-full px-4 py-2 focus:outline-none"
              value={skill}
              onChange={(e) => handleSkillChange(index, 'softSkills', e.target.value)}
            />
          </div>
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
          <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
            <i className="fas fa-project-diagram text-gray-400 mx-2"></i> {/* Project icon */}
            <input
              type="text"
              className="w-full px-4 py-2 focus:outline-none"
              value={project.title}
              onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Project Description</label>
          <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
            <i className="fas fa-info-circle text-gray-400 mx-2"></i> {/* Description icon */}
            <textarea
              className="w-full px-4 py-2 focus:outline-none"
              value={project.description}
              onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
              required
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        className="mt-2 bg-purple-700 text-white p-2 rounded-full hover:bg-purple-800 transition duration-200"
        onClick={addProjectInput}
      >
        <i className="fas fa-plus"></i> {/* Plus icon for adding projects */}
      </button>
    </div>
  ))}
</div>

{/* Work Experience */}
<div>
  <h3 className="text-xl font-semibold text-purple-600 mb-4">Work Experience</h3>
  {formData.experience.map((exp, index) => (
    <div key={index} className="grid grid-cols-1 mb-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Designation</label>
          <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
            <i className="fas fa-briefcase text-gray-400 mx-2"></i> {/* Briefcase icon */}
            <input
              type="text"
              className="w-full px-4 py-2 focus:outline-none"
              value={exp.designation}
              onChange={(e) => handleExperienceChange(index, 'designation', e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Company Name</label>
          <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
            <i className="fas fa-building text-gray-400 mx-2"></i> {/* Building icon */}
            <input
              type="text"
              className="w-full px-4 py-2 focus:outline-none"
              value={exp.companyName}
              onChange={(e) => handleExperienceChange(index, 'companyName', e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
            <i className="fas fa-info-circle text-gray-400 mx-2"></i> {/* Info icon */}
            <textarea
              className="w-full px-4 py-2 focus:outline-none"
              value={exp.description}
              onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
              required
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        className="mt-2 bg-purple-700 text-white p-2 rounded-full hover:bg-purple-800 transition duration-200"
        onClick={addExperienceInput}
      >
        <i className="fas fa-plus"></i> {/* Plus icon for adding experience */}
      </button>
    </div>
  ))}
</div>


          {/* Submit Button */}
          <div className="flex justify-center">
            <button
             onClick={handleResumeCreation}
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
