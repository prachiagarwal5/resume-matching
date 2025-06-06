import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCode, FaCheck } from "react-icons/fa";
import PersonalInformation from "../Component/createResume/PersonalInformation";
import Education from "../Component/createResume/Education";
import Skills from "../Component/createResume/Skills";
import Projects from "../Component/createResume/Projects";
import Experience from "../Component/createResume/Experience";
import Certifications from "../Component/createResume/Certifications";
import Achievements from "../Component/createResume/Achievements";

const CreateResume = () => {
  const userId = localStorage.getItem("userId");
  const [formData, setFormData] = useState({
    userId: userId,
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
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.resumeData) {
      const resumeData = location.state.resumeData;
      setFormData({
        userId: resumeData.userId,
        name: resumeData.name || "",
        phoneNumber: resumeData.phoneNumber || "",
        gmail: resumeData.gmail || "",
        linkedIn: resumeData.linkedIn || "",
        github: resumeData.github || "",
        location: resumeData.location || "",
        graduation: resumeData.graduation || {
          universityName: "",
          cpi: "",
          degree: "",
          yearSpan: "",
          location: "",
        },
        intermediate: resumeData.intermediate || {
          schoolName: "",
          percentage: "",
          stream: "",
          yearSpan: "",
          location: "",
        },
        highSchool: resumeData.highSchool || {
          schoolName: "",
          percentage: "",
          yearSpan: "",
          location: "",
        },
        technicalSkills: resumeData.technicalSkills || [""],
        softSkills: resumeData.softSkills || [""],
        projects: resumeData.projects || [{ title: "", description: "" }],
        certification: resumeData.certification
          ? resumeData.certification.map((c) => c.name)
          : [""],
        achievements: resumeData.achievements || [""],
        experience: resumeData.experience || [
          { designation: "", companyName: "", description: "" },
        ],
      });
    }
  }, [location.state]);

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
    if (
      (type === "technicalSkills" && formData.technicalSkills.length < 5) ||
      (type === "softSkills" && formData.softSkills.length < 3)
    ) {
      setFormData({
        ...formData,
        [type]: [...formData[type], ""],
      });
    }
  };

  const addProjectInput = () => {
    if (formData.projects.length < 3) {
      setFormData({
        ...formData,
        projects: [...formData.projects, { title: "", description: "" }],
      });
    }
  };

  const addCertification = () => {
    if (formData.certification.length < 2) {
      setFormData({
        ...formData,
        certification: [...formData.certification, ""],
      });
    }
  };

  const addAchieveInput = () => {
    if (formData.achievements.length < 2) {
      setFormData({
        ...formData,
        achievements: [...formData.achievements, ""],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true
    const transformedData = {
      contactInformation: {
        name: formData.name,
        gmail: formData.gmail,
        phoneNumber: formData.phoneNumber,
        linkedIn: formData.linkedIn,
        github: formData.github,
        location: formData.location,
      },
      objective: "",
      education: {
        graduation: {
          degree: formData.graduation.degree,
          universityName: formData.graduation.universityName,
          location: formData.graduation.location,
          yearSpan: formData.graduation.yearSpan,
          cpi: formData.graduation.cpi,
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
      experience: formData.experience.map((exp) => ({
        designation: exp.designation,
        companyName: exp.companyName,
        description: [exp.description],
      })),
      projects: formData.projects.map((proj) => ({
        title: proj.title,
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

    // console.log("Transformed Data (create.jsx):", transformedData);

    try {
      const dataToSend = {
        ...formData,
        certification: formData.certification
          .filter((c) => c && c.trim() !== "") // remove empty
          .map((c) => ({ name: c })), // convert to {name: ...}
      };
      console.log("Data to send:", dataToSend);

      const response = await axios.post(
        "http://localhost:5001/api/form/submit",
        dataToSend,
      );
      console.log("Data sent successfully:", response.data);

      navigate("/template-selection", {
        state: { formData: response.data },
      });
    } catch (error) {
      console.error("Error sending data:", error);
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  const addExperienceInput = () => {
    if (formData.experience.length < 2) {
      setFormData({
        ...formData,
        experience: [
          ...formData.experience,
          { designation: "", companyName: "", description: "" },
        ],
      });
    }
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

  const SectionTitle = ({ icon: Icon, title, limit }) => (
    <div className="flex items-center gap-2 text-xl font-bold text-white mb-4">
      <Icon className="text-purple-500" />
      <h2>
        {title}
        {limit ? ` (AT MAX ${limit})` : ""} {/* Only show limit if provided */}
      </h2>
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
              {/* <button className="text-gray-300 hover:text-white transition duration-200">
                Help
              </button> */}
              {/* <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-200">
                Save Draft
              </button> */}
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
            SectionTitle={(props) => (
              <SectionTitle {...props} title="Personal Details" />
            )} // Removed "AT MAX"
          />
          <Education
            formData={formData}
            handleInputChange={handleInputChange}
            inputClasses={inputClasses}
            labelClasses={labelClasses}
            sectionClasses={sectionClasses}
            SectionTitle={(props) => (
              <SectionTitle {...props} title="Education" />
            )} // Removed "AT MAX"
          />
          <Skills
            formData={formData}
            handleSkillChange={handleSkillChange}
            addSkillInput={addSkillInput}
            removeSkill={removeSkill}
            inputClasses={inputClasses}
            labelClasses={labelClasses}
            sectionClasses={sectionClasses}
            SectionTitle={(props) => <SectionTitle {...props} />}
          />
          <Projects
            formData={formData}
            handleProjectChange={handleProjectChange}
            addProjectInput={addProjectInput}
            removeProject={removeProject}
            inputClasses={inputClasses}
            labelClasses={labelClasses}
            sectionClasses={sectionClasses}
            SectionTitle={(props) => <SectionTitle {...props} limit={3} />}
          />
          <Experience
            formData={formData}
            handleExperienceChange={handleExperienceChange}
            addExperienceInput={addExperienceInput}
            removeExperience={removeExperience}
            inputClasses={inputClasses}
            labelClasses={labelClasses}
            sectionClasses={sectionClasses}
            SectionTitle={(props) => <SectionTitle {...props} limit={2} />}
          />
          <Certifications
            formData={formData}
            handleCertificationChange={handleCertificationChange}
            addCertification={addCertification}
            removeCertification={removeCertification}
            inputClasses={inputClasses}
            labelClasses={labelClasses}
            sectionClasses={sectionClasses}
            SectionTitle={(props) => <SectionTitle {...props} limit={2} />}
          />
          <Achievements
            formData={formData}
            handleAchieveChange={handleAchieveChange}
            addAchieveInput={addAchieveInput}
            removeAchievement={removeAchievement}
            inputClasses={inputClasses}
            labelClasses={labelClasses}
            sectionClasses={sectionClasses}
            SectionTitle={(props) => <SectionTitle {...props} limit={2} />}
          />
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className={`bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700
                                       transition duration-300 flex items-center gap-2 text-lg font-semibold ${
                                         isLoading
                                           ? "opacity-50 cursor-not-allowed"
                                           : ""
                                       }`}
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? (
                <div>Creating....</div> // White circle loader
              ) : (
                <>
                  <FaCheck /> Create Resume
                </>
              )}
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

// Add loader styles
const loaderStyles = `
  .loader {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid #fff;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Inject loader styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = loaderStyles;
document.head.appendChild(styleSheet);

export default CreateResume;
