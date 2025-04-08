const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  contactInformation: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    linkedin: { type: String, required: true },
    github: { type: String, required: true },
    location: { type: String, required: true },
  },
  education: {
    graduation: {
      degree: { type: String, required: true },
      institution: { type: String, required: true },
      location: { type: String, required: true },
      yearSpan: { type: String, required: true },
      CPI: { type: String, required: true },
    },
    intermediate: {
      schoolName: { type: String, required: true },
      percentage: { type: String, required: true },
      stream: { type: String, required: true },
      yearSpan: { type: String, required: true },
      location: { type: String, required: true },
    },
    highSchool: {
      schoolName: { type: String, required: true },
      percentage: { type: String, required: true },
      yearSpan: { type: String, required: true },
      location: { type: String, required: true },
    },
  },
  workExperience: [
    {
      jobTitle: { type: String, required: true },
      company: { type: String, required: true },
      description: [{ type: String, required: true }],
    },
  ],
  projects: [
    {
      projectTitle: { type: String, required: true },
      description: [{ type: String, required: true }],
    },
  ],
  skills: {
    technicalSkills: [{ type: String, required: true }],
    softSkills: [{ type: String, required: true }],
  },
  certifications: [
    {
      name: { type: String, required: true },
    },
  ],
  achievements: [{ type: String, required: true }],
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
