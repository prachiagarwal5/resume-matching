import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCode, FaCheck } from "react-icons/fa";
import PersonalInformation from "../Component/createResume/PersonalInformation";
import Education from "../Component/createResume/Education";
import Skills from "../Component/createResume/Skills";
import Projects from "../Component/createResume/Projects";
import Experience from "../Component/createResume/Experience";
import Certifications from "../Component/createResume/Certifications";
import Achievements from "../Component/createResume/Achievements";

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
    projects: [{ title: "", description: "" }],
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
      projects: [...formData.projects, { title: "", description: "" }],
    });
  };

  const addCertification = () => {
    setFormData({
      ...formData,
      certification: [...formData.certification, ""],
    });
  };

  const addAchieveInput = () => {
    setFormData({
      ...formData,
      achievements: [...formData.achievements, ""],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transformedData = {
      contactInformation: {
        name: formData.name,
        email: formData.gmail,
        phone: formData.phoneNumber,
        linkedin: formData.linkedIn,
        github: formData.github,
        location: formData.location,
      },
      objective: "",
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

    console.log("Transformed Data (create.jsx):", transformedData);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/form/submit",
        formData,
      );
      console.log("Data sent successfully:", response.data);

      navigate("/template-selection", {
        state: { formData: response.data },
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

  const SectionTitle = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-2 text-xl font-bold text-white mb-4">
      <Icon className="text-purple-500" />
      <h2>{title}</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 w-screen">
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

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <PersonalInformation
            formData={formData}
            handleInputChange={handleInputChange}
            inputClasses={inputClasses}
            labelClasses={labelClasses}
            sectionClasses={sectionClasses}
            SectionTitle={SectionTitle}
          />
          <Education
            formData={formData}
            handleInputChange={handleInputChange}
            inputClasses={inputClasses}
            labelClasses={labelClasses}
            sectionClasses={sectionClasses}
            SectionTitle={SectionTitle}
          />
          <Skills
            formData={formData}
            handleSkillChange={handleSkillChange}
            addSkillInput={addSkillInput}
            removeSkill={removeSkill}
            inputClasses={inputClasses}
            labelClasses={labelClasses}
            sectionClasses={sectionClasses}
            SectionTitle={SectionTitle}
          />
          <Projects
            formData={formData}
            handleProjectChange={handleProjectChange}
            addProjectInput={addProjectInput}
            removeProject={removeProject}
            inputClasses={inputClasses}
            labelClasses={labelClasses}
            sectionClasses={sectionClasses}
            SectionTitle={SectionTitle}
          />
          <Experience
            formData={formData}
            handleExperienceChange={handleExperienceChange}
            addExperienceInput={addExperienceInput}
            removeExperience={removeExperience}
            inputClasses={inputClasses}
            labelClasses={labelClasses}
            sectionClasses={sectionClasses}
            SectionTitle={SectionTitle}
          />
          <Certifications
            formData={formData}
            handleCertificationChange={handleCertificationChange}
            addCertification={addCertification}
            removeCertification={removeCertification}
            inputClasses={inputClasses}
            labelClasses={labelClasses}
            sectionClasses={sectionClasses}
            SectionTitle={SectionTitle}
          />
          <Achievements
            formData={formData}
            handleAchieveChange={handleAchieveChange}
            addAchieveInput={addAchieveInput}
            removeAchievement={removeAchievement}
            inputClasses={inputClasses}
            labelClasses={labelClasses}
            sectionClasses={sectionClasses}
            SectionTitle={SectionTitle}
          />
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700
                                       transition duration-300 flex items-center gap-2 text-lg font-semibold"
            >
              <FaCheck /> Create Resume
            </button>
          </div>
        </form>
      </main>

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
