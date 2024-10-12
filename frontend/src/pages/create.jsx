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
    location: '',
    graduation: {
      universityName: '',
      cpi: '',
      degree: '',
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
    certification:[""],
    achievements:[""],
    experience: [{ designation: '', companyName: '', description: '' }],
  });
  const navigate = useNavigate();

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
  const handleCertificationChange = (index, field, value) => {
    const updatedCertifications = [...formData.certification];
    updatedCertifications[index] = value;
    setFormData({
      ...formData,
      certification: updatedCertifications,
    });
  };

  const handleAchieveChange = (index, field, value) => {
    const updatedAchievements = [...formData.achievements];
    updatedAchievements[index] = value;
    setFormData({
      ...formData,
      achievements: updatedAchievements,
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
  const addCertification= () => {
    // setFormData({
    //   ...formData,
    //   projects: [...formData.certification, { title: ''}], // Add an empty project object
    // });
    setFormData({
      ...formData,
      certification: [...formData.certification, ''],
    });
  };
  const addAchieveInput = () => {
//     setFormData({
//       ...formData,
//       achievements: [...formData.achievements,""], // Add an empty project object
//     });
setFormData({
  ...formData,
  achievements: [...formData.achievements, ''],
});
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Resume Data Submitted: ', formData);
  
  try {
    const response = await axios.post('http://localhost:5001/api/form/submit', formData); 
    console.log('Data sent successfully:', response.data);

    // Navigate to the TemplateSelection page and pass the received data
    navigate('/template-selection', { state: { formData: response.data } });
  } catch (error) {
    console.error('Error sending data:', error);
  }
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
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900 flex flex-col items-center w-screen">
  {/* Navbar */}
  <nav className="bg-white dark:bg-gray-800 bg-opacity-80 text-purple-900 dark:text-white w-full p-4 shadow-lg flex justify-between items-center">
    <div className="text-3xl font-extrabold tracking-wide transition duration-300 hover:text-purple-700 dark:hover:text-purple-400">
      GLA Resume Fit
    </div>
    <div className="flex items-center">
      <span className="text-lg font-semibold mr-4">Hi, xyz</span>
      <div className="w-12 h-12 bg-purple-700 dark:bg-purple-600 text-white rounded-full flex items-center justify-center shadow-md transition duration-300 hover:shadow-lg">
        P
      </div>
    </div>
  </nav>

      {/* Form */}
      <div className="w-full max-w-4xl mt-12 bg-white dark:bg-gray-800 p-8 shadow-2xl rounded-lg">
  <h2 className="text-2xl font-bold text-center text-purple-700 dark:text-purple-400 mb-8">
    Create Your Resume
  </h2>
  <form onSubmit={handleSubmit} className="space-y-6">
    {/* Name, Phone Number, and Gmail in one row */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="relative">
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Name</label>
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition duration-300 ease-in-out focus-within:border-purple-600 dark:focus-within:border-purple-400">
          <i className="fas fa-user text-gray-400 mx-2"></i>
          <input
            type="text"
            className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
            value={formData.name}
            onChange={(e) => handleInputChange(e, null, 'name')}
            required
          />
        </div>
      </div>
      <div className="relative">
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Phone Number</label>
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition duration-300 ease-in-out focus-within:border-purple-600 dark:focus-within:border-purple-400">
          <i className="fas fa-phone text-gray-400 mx-2"></i>
          <input
            type="tel"
            className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange(e, null, 'phoneNumber')}
            required
          />
        </div>
      </div>
      <div className="relative">
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Gmail</label>
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition duration-300 ease-in-out focus-within:border-purple-600 dark:focus-within:border-purple-400">
          <i className="fas fa-envelope text-gray-400 mx-2"></i>
          <input
            type="email"
            className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
            value={formData.gmail}
            onChange={(e) => handleInputChange(e, null, 'gmail')}
            required
          />
        </div>
      </div>
    </div>

    {/* LinkedIn and GitHub profile in one row */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="relative">
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">LinkedIn Profile</label>
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition duration-300 ease-in-out focus-within:border-purple-600 dark:focus-within:border-purple-400">
          <i className="fab fa-linkedin text-gray-400 mx-2"></i>
          <input
            type="url"
            className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
            value={formData.linkedIn}
            onChange={(e) => handleInputChange(e, null, 'linkedIn')}
          />
        </div>
      </div>
      <div className="relative">
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">GitHub Profile</label>
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition duration-300 ease-in-out focus-within:border-purple-600 dark:focus-within:border-purple-400">
          <i className="fab fa-github text-gray-400 mx-2"></i>
          <input
            type="url"
            className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
            value={formData.github}
            onChange={(e) => handleInputChange(e, null, 'github')}
          />
        </div>
      </div>
      <div className="relative">
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Location</label>
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition duration-300 ease-in-out focus-within:border-purple-600 dark:focus-within:border-purple-400">
          <i className="fas fa-map-marker-alt text-gray-400 mx-2"></i>
          <input
            type="text"
            className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
            value={formData.location}
            onChange={(e) => handleInputChange(e, null, 'location')}
            required
          />
        </div>
      </div>
    </div>

    {/* Graduation */}
    <div>
      <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">Graduation</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">University Name</label>
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition duration-300 ease-in-out focus-within:border-purple-600 dark:focus-within:border-purple-400">
            <i className="fas fa-university text-gray-400 mx-2"></i>
            <input
              type="text"
              className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
              value={formData.graduation.universityName}
              onChange={(e) => handleInputChange(e, 'graduation', 'universityName')}
              required
            />
          </div>
        </div>
        <div className="relative">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">CPI</label>
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition duration-300 ease-in-out focus-within:border-purple-600 dark:focus-within:border-purple-400">
            <i className="fas fa-graduation-cap text-gray-400 mx-2"></i>
            <input
              type="text"
              className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
              value={formData.graduation.cpi}
              onChange={(e) => handleInputChange(e, 'graduation', 'cpi')}
              required
            />
          </div>
        </div>
        <div className="relative">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Degree</label>
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition duration-300 ease-in-out focus-within:border-purple-600 dark:focus-within:border-purple-400">
            <i className="fas fa-book text-gray-400 mx-2"></i>
            <input
              type="text"
              className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
              value={formData.graduation.degree}
              onChange={(e) => handleInputChange(e, 'graduation', 'degree')}
              required
            />
          </div>
        </div>
        <div className="relative">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">End Date</label>
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition duration-300 ease-in-out focus-within:border-purple-600 dark:focus-within:border-purple-400">
            <i className="fas fa-calendar-alt text-gray-400 mx-2"></i>
            <input
              type="text"
              className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
              value={formData.graduation.yearSpan}
              onChange={(e) => handleInputChange(e, 'graduation', 'yearSpan')}
              required
            />
          </div>
        </div>
        <div className="relative">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Location</label>
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition duration-300 ease-in-out focus-within:border-purple-600 dark:focus-within:border-purple-400">
            <i className="fas fa-map-marker-alt text-gray-400 mx-2"></i>
            <input
              type="text"
              className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
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
  <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">Intermediate</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {['schoolName', 'percentage', 'stream', 'yearSpan', 'location'].map((field, index) => (
      <div className="relative" key={index}>
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2 capitalize">{field}</label>
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition duration-300 ease-in-out focus-within:border-purple-600 dark:focus-within:border-purple-400">
          <i className={`fas ${field === 'schoolName' ? 'fa-school' : field === 'percentage' ? 'fa-percent' : field === 'stream' ? 'fa-book' : field === 'yearSpan' ? 'fa-calendar-alt' : 'fa-map-marker-alt'} text-gray-400 mx-2`}></i>
          <input
            type="text"
            className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
            value={formData.intermediate[field]}
            onChange={(e) => handleInputChange(e, 'intermediate', field)}
            required
          />
        </div>
      </div>
    ))}
  </div>
</div>

{/* High School */}
<div>
  <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">High School</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {['schoolName', 'percentage', 'yearSpan', 'location'].map((field, index) => (
      <div className="relative" key={index}>
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2 capitalize">{field}</label>
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition duration-300 ease-in-out focus-within:border-purple-600 dark:focus-within:border-purple-400">
          <i className={`fas ${field === 'schoolName' ? 'fa-school' : field === 'percentage' ? 'fa-percent' : field === 'yearSpan' ? 'fa-calendar-alt' : 'fa-map-marker-alt'} text-gray-400 mx-2`}></i>
          <input
            type="text"
            className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
            value={formData.highSchool[field]}
            onChange={(e) => handleInputChange(e, 'highSchool', field)}
            required
          />
        </div>
      </div>
    ))}
  </div>
</div>

{/* Skills Section */}
<div>
  <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">Skills</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Technical Skills */}
    <div>
      <div className="flex justify-between items-center mb-4">
        <label className="block text-gray-700 dark:text-gray-200 font-semibold">Technical Skills</label>
        <button
          type="button"
          className="text-black bg-purple-600 hover:bg-purple-700 rounded-full p-2 transition duration-200"
          onClick={() => addSkillInput('technicalSkills')}
        >
          <i className="fas fa-plus text-white"></i>
        </button>
      </div>
      {formData.technicalSkills.map((skill, index) => (
        <div key={index} className="flex items-center mb-2">
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm w-full">
            <i className="fas fa-code text-gray-400 mx-2"></i>
            <input
              type="text"
              className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
              value={skill}
              onChange={(e) => handleSkillChange(index, 'technicalSkills', e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
    
    {/* Soft Skills */}
    <div>
      <div className="flex justify-between items-center mb-4">
        <label className="block text-gray-700 dark:text-gray-200 font-semibold">Soft Skills</label>
        <button
          type="button"
          className="text-black bg-purple-600 hover:bg-purple-700 rounded-full p-2 transition duration-200"
          onClick={() => addSkillInput('softSkills')}
        >
          <i className="fas fa-plus text-white"></i>
        </button>
      </div>
      {formData.softSkills.map((skill, index) => (
        <div key={index} className="flex items-center mb-2">
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm w-full">
            <i className="fas fa-comments text-gray-400 mx-2"></i>
            <input
              type="text"
              className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
              value={skill}
              onChange={(e) => handleSkillChange(index, 'softSkills', e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
</div>



         {/* Projects Section */}
<div className="mt-8">
  <div className='flex justify-between items-center'>
    <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">Projects</h3>
    <button
      type="button"
      className="text-white bg-purple-600 hover:bg-purple-700 rounded-full p-2 transition duration-200 shadow-md"
      onClick={addProjectInput}
    >
      <i className="fas fa-plus"></i> {/* Plus icon for adding projects */}
    </button>
  </div>
  {formData.projects.map((project, index) => (
    <div key={index} className="relative mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Project Title</label>
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition duration-300 ease-in-out focus-within:border-purple-600 dark:focus-within:border-purple-400">
            <i className="fas fa-project-diagram text-gray-400 mx-2"></i> {/* Project icon */}
            <input
              type="text"
              className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
              value={project.title}
              onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Project Description</label>
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition duration-300 ease-in-out focus-within:border-purple-600 dark:focus-within:border-purple-400">
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
    </div>
  ))}
</div>


{/* Certification */}
<div className="mt-8">
  <div className='flex justify-between items-center'>
    <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">Certification</h3>
    <button
      type="button"
      className="text-white bg-purple-600 hover:bg-purple-700 rounded-full p-2 transition duration-200 shadow-md"
      onClick={() => addCertification('certification')}
    >
      <i className="fas fa-plus"></i> {/* Plus icon for adding certifications */}
    </button>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {formData.certification.map((certifications, index) => (
      <div key={index} className="relative mb-6">
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Certification</label>
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition duration-300 ease-in-out focus-within:border-purple-600 dark:focus-within:border-purple-400">
          <i className="fas fa-certificate text-gray-400 mx-2"></i> {/* Certificate icon */}
          <input
            type="text"
            className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
            value={certifications}
            onChange={(e) => handleCertificationChange(index, null, e.target.value)}
            required
          />
        </div>
      </div>
    ))}
  </div>
</div>

{/* extracircular */}
<div className="mt-8">
  <div className='flex justify-between items-center'>
    <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">Extra-curricular Activities and Achievements</h3>
    <button
      type="button"
      className="text-white bg-purple-600 hover:bg-purple-700 rounded-full p-2 transition duration-200 shadow-md"
      onClick={addAchieveInput}
    >
      <i className="fas fa-plus"></i> {/* Plus icon for adding achievements */}
    </button>
  </div>
  {formData.achievements.map((achievement, index) => (
    <div key={index} className="grid grid-cols-1 mb-6">
      <div className="relative">
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Achievement</label>
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition duration-300 ease-in-out focus-within:border-purple-600 dark:focus-within:border-purple-400">
          <i className="fas fa-trophy text-gray-400 mx-2"></i> {/* Trophy icon for achievements */}
          <input
            type="text"
            className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
            value={achievement.achieve}
            onChange={(e) => handleAchieveChange(index, null, e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  ))}
</div>

{/* Work Experience */}
<div className="mt-8">
  <div className='flex justify-between items-center'>
    <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">Work Experience</h3>
    <button
      type="button"
      className="text-white bg-purple-600 hover:bg-purple-700 rounded-full p-2 transition duration-200 shadow-md"
      onClick={addExperienceInput}
    >
      <i className="fas fa-plus"></i> {/* Plus icon for adding experience */}
    </button>
  </div>
  {formData.experience.map((exp, index) => (
    <div key={index} className="grid grid-cols-1 mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Designation</label>
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition duration-300 ease-in-out focus-within:border-purple-600 dark:focus-within:border-purple-400">
            <i className="fas fa-briefcase text-gray-400 mx-2"></i> {/* Briefcase icon */}
            <input
              type="text"
              className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
              value={exp.designation}
              onChange={(e) => handleExperienceChange(index, 'designation', e.target.value)}
              required
            />
          </div>
        </div>
        <div className="relative">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Company Name</label>
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition duration-300 ease-in-out focus-within:border-purple-600 dark:focus-within:border-purple-400">
            <i className="fas fa-building text-gray-400 mx-2"></i> {/* Building icon */}
            <input
              type="text"
              className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400"
              value={exp.companyName}
              onChange={(e) => handleExperienceChange(index, 'companyName', e.target.value)}
              required
            />
          </div>
        </div>
        <div className="relative">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Description</label>
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition duration-300 ease-in-out focus-within:border-purple-600 dark:focus-within:border-purple-400">
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
    </div>
  ))}
</div>



          {/* Submit Button */}
          <div className="flex justify-center">
            <button
             onClick={handleSubmit}
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