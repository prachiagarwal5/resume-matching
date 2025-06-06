const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  gmail: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  linkedIn: { type: String, required: true },
  github: { type: String },
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
      designation: { type: String },
      companyName: { type: String },
      description: [{ type: String }],
    },
  ],
  projects: [
    {
      title: { type: String },
      description: [{ type: String }],
    },
  ],
  technicalSkills: [{ type: String, required: true }],
  softSkills: [{ type: String, required: true }],
  certification: [
    {
      name: { type: String },
    },
  ],
  achievements: [{ type: String }],
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
