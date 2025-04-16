require("dotenv").config();
// const OpenAI = require("openai");

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
// Function to process group discussion notes
const processGroupDiscussion = async (studentNotes, discussionTopic) => {
  try {
    const prompt = `I will provide you with two inputs:
      - Notes: Unstructured thoughts noted down by a student after brainstorming.
      - Topic: The topic for the group discussion.

      Your task is to process and return a JSON object that will help the student understand and improve their approach to the group discussion. Create the following structure:

      {
          "structuredNotes": "Properly formatted version of the student's notes in professional English, organized logically so the student can present effectively during the discussion.",
          "expectedResponses": ["List of possible responses or counterpoints other participants might provide after listening to the student's points."],
          "brainstormedStructure": "A clear outline or structure the student can follow to present their points effectively during the discussion.",
          "improvementSuggestions": "Specific feedback on what the student could improve in their notes and thinking process, including gaps in logic or missing perspectives.",
          "keyInsights": ["3-5 critical insights or facts about the topic that would strengthen the student's position"],
          "commonPitfalls": ["List of common mistakes students make when discussing this topic"],
          "persuasiveTechniques": "Actionable advice on rhetorical techniques that would enhance the student's persuasiveness during the discussion."
      }

      Follow these educational enhancement guidelines:
      
      - For **structuredNotes**: Transform the raw notes into a coherent, logical flow with clear topic sentences and supporting evidence. Highlight the strongest arguments and restructure weak ones. Use professional terminology relevant to the topic.
      
      - For **expectedResponses**: Include diverse perspectives (conservative, liberal, technical, ethical, economic, etc.) that show the student how to anticipate counterarguments. For each response, briefly note how it challenges the student's position.
      
      - For **brainstormedStructure**: Create a detailed discussion framework with:
          * An attention-grabbing introduction technique
          * 3-4 main argument points in logical sequence
          * Supporting evidence recommendations for each point
          * Transition phrases between major points
          * An impactful conclusion that reinforces their stance
      
      - For **improvementSuggestions**: Provide constructive feedback on:
          * Logical gaps in their reasoning
          * Missing stakeholder perspectives
          * Areas where evidence could be strengthened
          * Balance between emotional and logical appeals
      
      - For **keyInsights**: Focus on research-backed facts or statistics that would significantly strengthen their position but aren't in their original notes.
      
      - For **commonPitfalls**: Warn about typical discussion mistakes like talking too much, not listening to others, using circular reasoning, or relying on logical fallacies.
      
      - For **persuasiveTechniques**: Recommend specific communication strategies like strategic questioning, effective use of pauses, handling interruptions, or techniques to build consensus.

    ### Response Format:
     - And stick to the given jason format dont change the format and no other information should be added in the response
     - Format note: Provide ONLY the JSON object with no additional text
     - No introduction text like "Here's a question..." or "Based on..."
     - The response should start directly with "{" and end with "}"

      Below are the inputs:
      Notes: "${studentNotes}"
      Topic: "${discussionTopic}"`;

      const response = await groq.chat.completions.create({
        messages: [
          { 
            role: "system", 
            content: "You are a strict evaluator for resumes against job descriptions. Follow the provided guidelines and return only the JSON object as specified." 
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        // model: "gpt-4o-mini",
        // max_tokens: 1000,
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
        improvementSuggestions: "No suggestions available.",
        keyInsights: [],
        commonPitfalls: [],
        persuasiveTechniques: "No techniques available."
      };
    }
  } catch (error) {
    console.error("Error calling Groq API:", error);
    throw new Error("Groq API error");
  }
};

const validateInputs = (notes, topic) => {
  if (!notes || typeof notes !== 'string' || notes.trim().length === 0) {
    throw new Error('Invalid or empty notes provided');
  }
  if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
    throw new Error('Invalid or empty topic provided');
  }
};

// Helper function to extract relevant JSON data
const extractRelevantJSON = (content) => {
  try {
    // Check if the content itself is already a valid JSON object
    if (typeof content === 'object' && content !== null) {
      return JSON.stringify(ensureValidStructure(content));
    }

    // If content is a string, try parsing it directly first
    if (typeof content === 'string') {
      try {
        const directParse = JSON.parse(content);
        return JSON.stringify(ensureValidStructure(directParse));
      } catch (directParseError) {
        // Not a direct JSON string, continue with extraction
        console.log("Not a direct JSON string, trying extraction");
      }

      // Try to extract JSON from the content using regex
      const jsonMatch = content.match(/```(?:json)?\s*({[\s\S]*?})\s*```/);
      
      if (!jsonMatch) {
        // If no JSON block found with code fences, try to extract any JSON object
        const directJsonMatch = content.match(/{[\s\S]*?}/);
        if (!directJsonMatch) {
          console.log("No JSON match found in content");
          throw new Error('No valid JSON found in response');
        }
        
        try {
          const extractedJson = JSON.parse(directJsonMatch[0]);
          return JSON.stringify(ensureValidStructure(extractedJson));
        } catch (parseError) {
          console.log("Failed to parse extracted JSON", parseError);
          throw new Error('Failed to parse extracted JSON');
        }
      }

      // Get the JSON content from the matched group
      const jsonString = jsonMatch[1].trim();
      try {
        const parsedJson = JSON.parse(jsonString);
        return JSON.stringify(ensureValidStructure(parsedJson));
      } catch (parseError) {
        console.log("Failed to parse JSON from code fence", parseError);
        throw new Error('Failed to parse JSON from code fence');
      }
    }

    // If we've reached here, we couldn't find valid JSON
    throw new Error('No valid JSON found in response');
  } catch (error) {
    console.error("Error parsing JSON:", error);
    // Return default structure if parsing fails
    return JSON.stringify({
      structuredNotes: "Unable to process the notes.",
      expectedResponses: [],
      brainstormedStructure: "No structure available.",
      improvementSuggestions: "No suggestions available.",
      keyInsights: [],
      commonPitfalls: [],
      persuasiveTechniques: "No techniques available."
    });
  }
};

// Helper function to ensure all required fields are present
const ensureValidStructure = (jsonObject) => {
  // Handle if jsonObject is already a string
  if (typeof jsonObject === 'string') {
    try {
      jsonObject = JSON.parse(jsonObject);
    } catch (e) {
      console.error("Failed to parse jsonObject string:", e);
      jsonObject = {};
    }
  }

  return {
    structuredNotes: jsonObject.structuredNotes || "Unable to process the notes.",
    expectedResponses: Array.isArray(jsonObject.expectedResponses) 
      ? jsonObject.expectedResponses 
      : [],
    brainstormedStructure: jsonObject.brainstormedStructure || "No structure available.",
    improvementSuggestions: Array.isArray(jsonObject.improvementSuggestions)
      ? jsonObject.improvementSuggestions
      : (jsonObject.improvementSuggestions ? [jsonObject.improvementSuggestions] : []),
    keyInsights: Array.isArray(jsonObject.keyInsights) 
      ? jsonObject.keyInsights 
      : [],
    commonPitfalls: Array.isArray(jsonObject.commonPitfalls) 
      ? jsonObject.commonPitfalls 
      : [],
    persuasiveTechniques: jsonObject.persuasiveTechniques || "No techniques available."
  };
};


module.exports = {
  processGroupDiscussion,
  validateInputs,
};