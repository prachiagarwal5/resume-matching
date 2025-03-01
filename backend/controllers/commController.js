const service = require("../services/groupdiscussion");

const commController = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "No text provided",
      });
    }

    // Process with group discussion service
    const analysisResult = await service(text);

    return res.status(200).json({
      success: true,
      data: {
        text: text,
        analysis: analysisResult,
      },
    });
  } catch (error) {
    console.error("Controller error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error processing text",
    });
  }
};

module.exports = commController;
