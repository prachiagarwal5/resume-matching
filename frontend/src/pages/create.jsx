import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaMapMarkerAlt,
  FaUniversity,
  FaGraduationCap,
  FaSchool,
  FaBriefcase,
  FaCode,
  FaCertificate,
  FaTrophy,
  FaPlus,
  FaTrash,
  FaCheck,
  FaProjectDiagram,
} from "react-icons/fa";

const CreateResume = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    gmail: "",
    linkedIn: "",
    github: "",
    location: "",
    graduation: {
      universityName: "",
      cpi: "",
      degree: "",
      yearSpan: "",
      location: "",
    },
    intermediate: {
      schoolName: "",
      percentage: "",
      stream: "",
      yearSpan: "",
      location: "",
    },
    highSchool: {
      schoolName: "",
      percentage: "",
      yearSpan: "",
      location: "",
    },
    technicalSkills: [""],
    softSkills: [""],
    projects: [{ title: "", description: "" }], // Initialize with one empty project
    certification: [""],
    achievements: [""],
    experience: [{ designation: "", companyName: "", description: "" }],
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
      [type]: [...formData[type], ""],
    });
  };

  const addProjectInput = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { title: "", description: "" }], // Add an empty project object
    });
  };
  const addCertification = () => {
    // setFormData({
    //   ...formData,
    //   projects: [...formData.certification, { title: ''}], // Add an empty project object
    // });
    setFormData({
      ...formData,
      certification: [...formData.certification, ""],
    });
  };
  const addAchieveInput = () => {
    //     setFormData({
    //       ...formData,
    //       achievements: [...formData.achievements,""], // Add an empty project object
    //     });
    setFormData({
      ...formData,
      achievements: [...formData.achievements, ""],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Resume Data Submitted: ', formData);
    const transformedData = {
      contactInformation: {
        name: formData.name,
        email: formData.gmail,
        phone: formData.phoneNumber,
        linkedin: formData.linkedIn,
        github: formData.github,
        location: formData.location,
      },
      objective: "", // Add if you have this field
      education: {
        graduation: {
          degree: formData.graduation.degree,
          institution: formData.graduation.universityName,
          location: formData.graduation.location,
          yearSpan: formData.graduation.yearSpan,
          CPI: formData.graduation.cpi,
        },
        intermediate: {
          schoolName: formData.intermediate.schoolName,
          percentage: formData.intermediate.percentage,
          stream: formData.intermediate.stream,
          yearSpan: formData.intermediate.yearSpan,
          location: formData.intermediate.location,
        },
        highSchool: {
          schoolName: formData.highSchool.schoolName,
          percentage: formData.highSchool.percentage,
          yearSpan: formData.highSchool.yearSpan,
          location: formData.highSchool.location,
        },
      },
      workExperience: formData.experience.map((exp) => ({
        jobTitle: exp.designation,
        company: exp.companyName,
        description: [exp.description],
      })),
      projects: formData.projects.map((proj) => ({
        projectTitle: proj.title,
        description: [proj.description],
      })),
      skills: {
        technicalSkills: formData.technicalSkills,
        softSkills: formData.softSkills,
      },
      certifications: formData.certification.map((cert) => ({
        name: cert,
      })),
      achievements: formData.achievements,
    };

    console.log("Transformed Data:", transformedData);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/form/submit",
        formData,
      );
      console.log("Data sent successfully:", response.data);

      // Navigate to the TemplateSelection page and pass the received data
      navigate("/template-selection", {
        state: { formData: transformedData },
      });
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const addExperienceInput = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        { designation: "", companyName: "", description: "" },
      ],
    });
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...formData.experience];
    newExperience[index][field] = value;
    setFormData({ ...formData, experience: newExperience });
  };

  const removeSkill = (index, type) => {
    const updatedSkills = [...formData[type]];
    updatedSkills.splice(index, 1);
    setFormData({
      ...formData,
      [type]: updatedSkills,
    });
  };

  const removeProject = (index) => {
    const updatedProjects = [...formData.projects];
    updatedProjects.splice(index, 1);
    setFormData({
      ...formData,
      projects: updatedProjects,
    });
  };

  const removeExperience = (index) => {
    const updatedExperience = [...formData.experience];
    updatedExperience.splice(index, 1);
    setFormData({
      ...formData,
      experience: updatedExperience,
    });
  };

  const removeCertification = (index) => {
    const updatedCertifications = [...formData.certification];
    updatedCertifications.splice(index, 1);
    setFormData({
      ...formData,
      certification: updatedCertifications,
    });
  };

  const removeAchievement = (index) => {
    const updatedAchievements = [...formData.achievements];
    updatedAchievements.splice(index, 1);
    setFormData({
      ...formData,
      achievements: updatedAchievements,
    });
  };

  const inputClasses = `
      w-full px-4 py-2 bg-gray-800 text-white border border-gray-700
      rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500
      focus:border-transparent transition duration-200
    `;

  const labelClasses = `
      block text-gray-300 font-medium mb-2
    `;

  const sectionClasses = `
      bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700
      hover:border-purple-500 transition duration-300
    `;

  const buttonClasses = `
      bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700
      transition duration-300 flex items-center justify-center gap-2
    `;

  // Section title component
  const SectionTitle = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-2 text-xl font-bold text-white mb-4">
      <Icon className="text-purple-500" />
      <h2>{title}</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 w-screen">
      {/* Navbar */}
      <nav className="bg-gray-800 border-b border-gray-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <FaCode className="text-purple-500 text-2xl" />
              <span className="text-xl font-bold text-white">
                Resume Builder
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-300 hover:text-white transition duration-200">
                Help
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-200">
                Save Draft
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <section className={sectionClasses}>
            <SectionTitle icon={FaUser} title="Personal Information" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className={labelClasses}>
                  <FaUser className="inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  className={inputClasses}
                  value={formData.name}
                  onChange={(e) => handleInputChange(e, null, "name")}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className={labelClasses}>
                  <FaPhone className="inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  className={inputClasses}
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange(e, null, "phoneNumber")}
                  placeholder="+1 234 567 8900"
                  required
                />
              </div>
              <div>
                <label className={labelClasses}>
                  <FaEnvelope className="inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  className={inputClasses}
                  value={formData.gmail}
                  onChange={(e) => handleInputChange(e, null, "gmail")}
                  placeholder="johndoe@example.com"
                  required
                />
              </div>
              <div>
                <label className={labelClasses}>
                  <FaLinkedin className="inline mr-2" />
                  LinkedIn
                </label>
                <input
                  type="url"
                  className={inputClasses}
                  value={formData.linkedIn}
                  onChange={(e) => handleInputChange(e, null, "linkedIn")}
                  placeholder="linkedin.com/in/johndoe"
                />
              </div>
              <div>
                <label className={labelClasses}>
                  <FaGithub className="inline mr-2" />
                  GitHub
                </label>
                <input
                  type="url"
                  className={inputClasses}
                  value={formData.github}
                  onChange={(e) => handleInputChange(e, null, "github")}
                  placeholder="github.com/johndoe"
                />
              </div>
              <div>
                <label className={labelClasses}>
                  <FaMapMarkerAlt className="inline mr-2" />
                  Location
                </label>
                <input
                  type="text"
                  className={inputClasses}
                  value={formData.location}
                  onChange={(e) => handleInputChange(e, null, "location")}
                  placeholder="City, Country"
                  required
                />
              </div>
            </div>
          </section>

          {/* Education Section */}
          <section className={sectionClasses}>
            <SectionTitle icon={FaGraduationCap} title="Education" />

            {/* Graduation */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-4">
                Graduation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className={labelClasses}>University Name</label>
                  <input
                    type="text"
                    className={inputClasses}
                    value={formData.graduation.universityName}
                    onChange={(e) =>
                      handleInputChange(e, "graduation", "universityName")
                    }
                    placeholder="University Name"
                    required
                  />
                </div>
                <div>
                  <label className={labelClasses}>Degree</label>
                  <input
                    type="text"
                    className={inputClasses}
                    value={formData.graduation.degree}
                    onChange={(e) =>
                      handleInputChange(e, "graduation", "degree")
                    }
                    placeholder="Bachelor of Technology"
                    required
                  />
                </div>
                <div>
                  <label className={labelClasses}>CPI/CGPA</label>
                  <input
                    type="text"
                    className={inputClasses}
                    value={formData.graduation.cpi}
                    onChange={(e) => handleInputChange(e, "graduation", "cpi")}
                    placeholder="3.8/4.0"
                    required
                  />
                </div>
                <div>
                  <label className={labelClasses}>Year Span</label>
                  <input
                    type="text"
                    className={inputClasses}
                    value={formData.graduation.yearSpan}
                    onChange={(e) =>
                      handleInputChange(e, "graduation", "yearSpan")
                    }
                    placeholder="2020-2024"
                    required
                  />
                </div>
                <div>
                  <label className={labelClasses}>Location</label>
                  <input
                    type="text"
                    className={inputClasses}
                    value={formData.graduation.location}
                    onChange={(e) =>
                      handleInputChange(e, "graduation", "location")
                    }
                    placeholder="City, Country"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Intermediate */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-4">
                Intermediate
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className={labelClasses}>School Name</label>
                  <input
                    type="text"
                    className={inputClasses}
                    value={formData.intermediate.schoolName}
                    onChange={(e) =>
                      handleInputChange(e, "intermediate", "schoolName")
                    }
                    placeholder="School Name"
                    required
                  />
                </div>
                <div>
                  <label className={labelClasses}>Stream</label>
                  <input
                    type="text"
                    className={inputClasses}
                    value={formData.intermediate.stream}
                    onChange={(e) =>
                      handleInputChange(e, "intermediate", "stream")
                    }
                    placeholder="Science/Commerce/Arts"
                    required
                  />
                </div>
                <div>
                  <label className={labelClasses}>Percentage/CGPA</label>
                  <input
                    type="text"
                    className={inputClasses}
                    value={formData.intermediate.percentage}
                    onChange={(e) =>
                      handleInputChange(e, "intermediate", "percentage")
                    }
                    placeholder="95%"
                    required
                  />
                </div>
                <div>
                  <label className={labelClasses}>Year Span</label>
                  <input
                    type="text"
                    className={inputClasses}
                    value={formData.intermediate.yearSpan}
                    onChange={(e) =>
                      handleInputChange(e, "intermediate", "yearSpan")
                    }
                    placeholder="2018-2020"
                    required
                  />
                </div>
                <div>
                  <label className={labelClasses}>Location</label>
                  <input
                    type="text"
                    className={inputClasses}
                    value={formData.intermediate.location}
                    onChange={(e) =>
                      handleInputChange(e, "intermediate", "location")
                    }
                    placeholder="City, Country"
                    required
                  />
                </div>
              </div>
            </div>

            {/* High School */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-4">
                High School
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className={labelClasses}>School Name</label>
                  <input
                    type="text"
                    className={inputClasses}
                    value={formData.highSchool.schoolName}
                    onChange={(e) =>
                      handleInputChange(e, "highSchool", "schoolName")
                    }
                    placeholder="School Name"
                    required
                  />
                </div>
                <div>
                  <label className={labelClasses}>Percentage/CGPA</label>
                  <input
                    type="text"
                    className={inputClasses}
                    value={formData.highSchool.percentage}
                    onChange={(e) =>
                      handleInputChange(e, "highSchool", "percentage")
                    }
                    placeholder="90%"
                    required
                  />
                </div>
                <div>
                  <label className={labelClasses}>Year Span</label>
                  <input
                    type="text"
                    className={inputClasses}
                    value={formData.highSchool.yearSpan}
                    onChange={(e) =>
                      handleInputChange(e, "highSchool", "yearSpan")
                    }
                    placeholder="2018"
                    required
                  />
                </div>
                <div>
                  <label className={labelClasses}>Location</label>
                  <input
                    type="text"
                    className={inputClasses}
                    value={formData.highSchool.location}
                    onChange={(e) =>
                      handleInputChange(e, "highSchool", "location")
                    }
                    placeholder="City, Country"
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className={sectionClasses}>
            <SectionTitle icon={FaCode} title="Skills" />

            {/* Technical Skills */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-purple-400">
                  Technical Skills
                </h3>
                <button
                  type="button"
                  onClick={() => addSkillInput("technicalSkills")}
                  className="text-purple-500 hover:text-purple-400 transition-colors duration-200"
                >
                  <FaPlus className="text-xl" />
                </button>
              </div>
              <div className="space-y-3">
                {formData.technicalSkills.map((skill, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      className={inputClasses}
                      value={skill}
                      onChange={(e) =>
                        handleSkillChange(
                          index,
                          "technicalSkills",
                          e.target.value,
                        )
                      }
                      placeholder="e.g., JavaScript, React, Node.js"
                    />
                    <button
                      type="button"
                      onClick={() => removeSkill(index, "technicalSkills")}
                      className="text-red-500 hover:text-red-400 transition-colors duration-200"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-purple-400">
                  Soft Skills
                </h3>
                <button
                  type="button"
                  onClick={() => addSkillInput("softSkills")}
                  className="text-purple-500 hover:text-purple-400 transition-colors duration-200"
                >
                  <FaPlus className="text-xl" />
                </button>
              </div>
              <div className="space-y-3">
                {formData.softSkills.map((skill, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      className={inputClasses}
                      value={skill}
                      onChange={(e) =>
                        handleSkillChange(index, "softSkills", e.target.value)
                      }
                      placeholder="e.g., Leadership, Communication, Team Work"
                    />
                    <button
                      type="button"
                      onClick={() => removeSkill(index, "softSkills")}
                      className="text-red-500 hover:text-red-400 transition-colors duration-200"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects Section */}
            <section className={sectionClasses}>
              <div className="flex justify-between items-center mb-6">
                <SectionTitle icon={FaProjectDiagram} title="Projects" />
                <button
                  type="button"
                  onClick={addProjectInput}
                  className="text-purple-500 hover:text-purple-400 transition-colors duration-200"
                >
                  <FaPlus className="text-xl" />
                </button>
              </div>

              {formData.projects.map((project, index) => (
                <div key={index} className="mb-6 p-4 bg-gray-700 rounded-lg">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className={labelClasses}>Project Title</label>
                      <input
                        type="text"
                        className={inputClasses}
                        value={project.title}
                        onChange={(e) =>
                          handleProjectChange(index, "title", e.target.value)
                        }
                        placeholder="Project Name"
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClasses}>Description</label>
                      <textarea
                        className={`${inputClasses} min-h-[100px]`}
                        value={project.description}
                        onChange={(e) =>
                          handleProjectChange(
                            index,
                            "description",
                            e.target.value,
                          )
                        }
                        placeholder="Describe your project, technologies used, and outcomes"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    className="mt-2 text-red-500 hover:text-red-400 transition-colors duration-200"
                  >
                    <FaTrash /> Remove Project
                  </button>
                </div>
              ))}
            </section>

            {/* Experience Section */}
            <section className={sectionClasses}>
              <div className="flex justify-between items-center mb-6">
                <SectionTitle icon={FaBriefcase} title="Work Experience" />
                <button
                  type="button"
                  onClick={addExperienceInput}
                  className="text-purple-500 hover:text-purple-400 transition-colors duration-200"
                >
                  <FaPlus className="text-xl" />
                </button>
              </div>

              {formData.experience.map((exp, index) => (
                <div key={index} className="mb-6 p-4 bg-gray-700 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClasses}>Designation</label>
                      <input
                        type="text"
                        className={inputClasses}
                        value={exp.designation}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "designation",
                            e.target.value,
                          )
                        }
                        placeholder="Job Title"
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClasses}>Company Name</label>
                      <input
                        type="text"
                        className={inputClasses}
                        value={exp.companyName}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "companyName",
                            e.target.value,
                          )
                        }
                        placeholder="Company Name"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className={labelClasses}>Description</label>
                      <textarea
                        className={`${inputClasses} min-h-[100px]`}
                        value={exp.description}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "description",
                            e.target.value,
                          )
                        }
                        placeholder="Describe your role, responsibilities, and achievements"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="mt-2 text-red-500 hover:text-red-400 transition-colors duration-200"
                  >
                    <FaTrash /> Remove Experience
                  </button>
                </div>
              ))}
            </section>

            {/* Certifications Section */}
            <section className={sectionClasses}>
              <div className="flex justify-between items-center mb-6">
                <SectionTitle icon={FaCertificate} title="Certifications" />
                <button
                  type="button"
                  onClick={addCertification}
                  className="text-purple-500 hover:text-purple-400 transition-colors duration-200"
                >
                  <FaPlus className="text-xl" />
                </button>
              </div>

              {formData.certification.map((cert, index) => (
                <div key={index} className="flex gap-2 mb-3">
                  <input
                    type="text"
                    className={inputClasses}
                    value={cert}
                    onChange={(e) =>
                      handleCertificationChange(index, null, e.target.value)
                    }
                    placeholder="Certification name and issuing organization"
                  />
                  <button
                    type="button"
                    onClick={() => removeCertification(index)}
                    className="text-red-500 hover:text-red-400 transition-colors duration-200"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </section>

            {/* Achievements Section */}
            <section className={sectionClasses}>
              <div className="flex justify-between items-center mb-6">
                <SectionTitle icon={FaTrophy} title="Achievements" />
                <button
                  type="button"
                  onClick={addAchieveInput}
                  className="text-purple-500 hover:text-purple-400 transition-colors duration-200"
                >
                  <FaPlus className="text-xl" />
                </button>
              </div>

              {formData.achievements.map((achievement, index) => (
                <div key={index} className="flex gap-2 mb-3">
                  <input
                    type="text"
                    className={inputClasses}
                    value={achievement}
                    onChange={(e) =>
                      handleAchieveChange(index, null, e.target.value)
                    }
                    placeholder="Describe your achievement"
                  />
                  <button
                    type="button"
                    onClick={() => removeAchievement(index)}
                    className="text-red-500 hover:text-red-400 transition-colors duration-200"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </section>

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700
                                       transition duration-300 flex items-center gap-2 text-lg font-semibold"
              >
                <FaCheck /> Create Resume
              </button>
            </div>
          </section>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-400">
          <p className="text-sm">
            Create your professional resume with our easy-to-use builder.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CreateResume;
