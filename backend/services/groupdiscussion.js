require("dotenv").config();
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Function to process group discussion notes
const processGroupDiscussion = async (studentNotes, discussionTopic) => {
  try {
    const prompt = `I will provide you with two inputs:
      - Notes: Unstructured thoughts noted down by a student after brainstorming.
      - Topic: The topic for the group discussion.

      Your task is to process and return a JSON object with the following structure:

      {
          "structuredNotes": "Properly formatted version of the student's notes in professional English, organized logically so the student can present effectively during the discussion.",
          "expectedResponses": ["List of possible responses or counterpoints other participants might provide after listening to the student's points."],
          "brainstormedStructure": "A clear outline or structure the student can follow to present their points effectively during the discussion."
      }

      Follow these strict guidelines:
      - Ensure the **structuredNotes** are concise, logical, and grammatically correct, tailored to the given topic.
      - The **expectedResponses** should reflect diverse opinions or counterarguments others might bring up during the discussion.
      - The **brainstormedStructure** should include a clear opening, main points, and a closing remark the student can use to summarize their stance.

      Below are the inputs:
      Notes: "${studentNotes}"
      Topic: "${discussionTopic}"`;

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-70b-8192",
    });

    const { choices } = response;
    if (choices && choices[0]?.message?.content) {
      const rawContent = choices[0].message.content;
      console.log("Raw Content: ", rawContent);
      const result = extractRelevantJSON(rawContent);
      console.log("Processed Result: ", result);
      return JSON.parse(result);
    } else {
      console.log("No valid response received.");
      return {
        structuredNotes: "Unable to process the notes.",
        expectedResponses: [],
        brainstormedStructure: "No structure available.",
      };
    }
  } catch (error) {
    console.error("Error calling Groq API:", error);
    throw new Error("Groq API error");
  }
};

// Helper function to extract relevant JSON data
const extractRelevantJSON = (content) => {
  try {
    const jsonObject = JSON.parse(content);
    const trimmedObject = {
      structuredNotes: jsonObject.structuredNotes || "Unable to process the notes.",
      expectedResponses: jsonObject.expectedResponses || [],
      brainstormedStructure: jsonObject.brainstormedStructure || "No structure available.",
    };
    return JSON.stringify(trimmedObject);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return JSON.stringify({
      structuredNotes: "Unable to process the notes.",
      expectedResponses: [],
      brainstormedStructure: "No structure available.",
    });
  }
};

module.exports = {
  processGroupDiscussion,
};