const { generateResume } = require("../services/createResume");
const generateResumePDF = require("../services/GenrateResumePdf").default;
const PdfService = require("../services/pdfService");
const Resume = require("../db/Resume");

const createResume = async (req, res) => {
  try {
    console.log("Received form data:", req.body);
    const formData = req.body;
    console.log("Form data:", formData);

    // Send the data to generateResume function
    const resume = await generateResume(formData); // Pass formData directly
    console.log("Generated resume:", resume);

    // Process the form data here (e.g., store in the database)
    res.status(200).json({
      success: true,
      message: "Form data received successfully",
      resume,
    });
  } catch (error) {
    console.error("Error processing form data:", error);
    res
      .status(500)
      .json({ success: false, message: "Error processing form data", error });
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
    resumeData.user = userId;

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
