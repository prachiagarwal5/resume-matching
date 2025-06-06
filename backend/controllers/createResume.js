const { generateResume } = require("../services/createResume");
const generateResumePDF = require("../services/GenrateResumePdf").default;
const PdfService = require("../services/pdfService");
const Resume = require("../db/Resume");
const checkResumeSimilarity =
  require("../services/CheckResumeSimilarity").default;

function mapLLMResumeToSchema(llmResume, userId) {
  const contact = llmResume.contactInformation || {};
  const education = llmResume.education || {};
  // Accept both "inter" and "intermediate"
  const inter = education.intermediate || education.inter || {};

  return {
    userId,
    name: contact.name || "",
    gmail: contact.email || "",
    phoneNumber: contact.phone || "",
    linkedIn: contact.linkedin || "",
    github: contact.github || "",
    location: contact.location || "",
    objective: llmResume.objective || "",
    graduation: {
      degree: education.graduation?.degree || "",
      universityName:
        education.graduation?.institution ||
        education.graduation?.university ||
        "",
      location: education.graduation?.location || "",
      yearSpan: education.graduation?.yearSpan || "",
      cpi: education.graduation?.CPI || "",
    },
    intermediate: {
      schoolName: inter.schoolName || "",
      percentage: inter.percentage || "",
      stream: inter.stream || "",
      yearSpan: inter.yearSpan || "",
      location: inter.location || "",
    },
    highSchool: {
      schoolName: education.highSchool?.schoolName || "",
      percentage: education.highSchool?.percentage || "",
      yearSpan: education.highSchool?.yearSpan || "",
      location: education.highSchool?.location || "",
    },
    experience: (llmResume.workExperience || []).map((exp) => ({
      designation: exp.jobTitle || "",
      companyName: exp.company || "",
      description: Array.isArray(exp.description)
        ? exp.description
        : [exp.description || ""],
    })),
    projects: (llmResume.projects || []).map((proj) => ({
      title: proj.projectTitle || "",
      description: Array.isArray(proj.description)
        ? proj.description
        : [proj.description || ""],
    })),
    technicalSkills: llmResume.skills?.technicalSkills || [],
    softSkills: llmResume.skills?.softSkills || [],
    certification: llmResume.certifications || [],
    achievements: llmResume.achievements || [],
  };
}

const createResume = async (req, res) => {
  try {
    const formData = req.body;
    console.log(formData);
    const userId = formData.userId;
    console.log(userId);

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    // Find existing resume for this user
    const existingResume = await Resume.findOne({ userId: userId });

    if (existingResume) {
      // Use LLM to check for major changes
      const similarityResult = await checkResumeSimilarity(
        existingResume.toObject(),
        formData,
      );

      if (!similarityResult.isMajorChange) {
        return res.status(200).json({
          success: true,
          message: "No major changes detected. Returning existing resume.",
          resume: existingResume,
        });
      }
      // else: proceed to create new resume
    }

    // Generate resume (if you have extra processing)
    const resumeDataLLM = await generateResume(formData);
    const resumeData = mapLLMResumeToSchema(resumeDataLLM, userId);

    // Save new resume
    const newResume = new Resume(resumeData);
    await newResume.save();

    res.status(200).json({
      success: true,
      message: "Resume created successfully.",
      resume: newResume,
    });
  } catch (error) {
    console.error("Error processing form data:", error);
    res.status(500).json({
      success: false,
      message: "Error processing form data",
      error: error.message,
    });
  }
};

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const userId = req.body.userId;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Extract text from file
    const resumeText = await PdfService.extractText(req.file.path);
    console.log("Extracted text from PDF:", resumeText);

    // Generate resume JSON from text
    let resumeData = await generateResumePDF(resumeText);
    console.log("Generated resume data:", resumeData);

    // Ensure resumeData is an object
    if (typeof resumeData === "string") {
      resumeData = JSON.parse(resumeData);
    }

    // Add user ID to resume data
    resumeData.userId = userId;

    // Store resume data into the db
    const newResume = new Resume(resumeData);
    await newResume.save();

    // Clean up uploaded file
    PdfService.cleanup(req.file.path);

    return res.status(200).json({
      success: true,
      data: newResume,
    });
  } catch (error) {
    console.error("Controller error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error uploading resume",
    });
  }
};

module.exports = { createResume, uploadResume };
