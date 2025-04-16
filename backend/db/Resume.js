const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    gmail: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    linkedIn: { type: String, required: true },
    github: { type: String, required: true },
    location: { type: String, required: true },
    graduation: {
      degree: { type: String, required: true },
      universityName: { type: String, required: true },
      location: { type: String, required: true },
      yearSpan: { type: String, required: true },
      cpi: { type: String, required: true },
    },
    intermediate: {
      schoolName: { type: String, required: true },
      percentage: { type: String, required: true },
      yearSpan: { type: String, required: true },
      location: { type: String, required: true },
    },
    highSchool: {
      schoolName: { type: String, required: true },
      percentage: { type: String, required: true },
      yearSpan: { type: String, required: true },
      location: { type: String, required: true },
    },
  experience: [
    {
      designation: { type: String, required: true },
      companyName: { type: String, required: true },
      description: [{ type: String, required: true }],
    },
  ],
  projects: [
    {
      title: { type: String, required: true },
      description: [{ type: String, required: true }],
    },
  ],
    technicalSkills: [{ type: String, required: true }],
    softSkills: [{ type: String, required: true }],
  certifications: [
    {
      name: { type: String, required: true },
    },
  ],
  achievements: [{ type: String, required: true }],
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
