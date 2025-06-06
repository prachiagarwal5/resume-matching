import { Groq } from "groq-sdk";
import dotenv from "dotenv";
import { jsonrepair } from "jsonrepair";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * Uses LLM to check if two resumes are significantly different.
 * Returns { isMajorChange: boolean, reason: string }
 */
const checkResumeSimilarity = async (existingResume, newResume) => {
  try {
    const prompt = `
You are an expert resume analyzer. Compare the following two resumes (in JSON format).
Determine if there are any **major changes** between them (such as new job, new degree, new certifications, or significant edits in experience/projects/skills).
If the resumes are almost the same (only minor edits or formatting), reply with:
{ "isMajorChange": false, "reason": "No major changes detected. Resumes are similar." }
If there are major changes, reply with:
{ "isMajorChange": true, "reason": "Describe the major changes here." }

Existing Resume:
${JSON.stringify(existingResume, null, 2)}

New Resume:
${JSON.stringify(newResume, null, 2)}

Reply ONLY with the JSON object as described above.
`;

    const response = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama3-70b-8192",
    });

    const rawContent = response.choices[0].message.content;
    // Extract JSON from LLM response
    const jsonMatch = rawContent.match(/{[\s\S]*}/);
    let result;
    try {
      result = JSON.parse(jsonMatch[0]);
    } catch (e) {
      result = JSON.parse(jsonrepair(jsonMatch[0]));
    }
    return result;
  } catch (error) {
    console.error("Error checking resume similarity:", error);
    throw new Error("Failed to check resume similarity");
  }
};

export default checkResumeSimilarity;
