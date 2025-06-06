import { Groq } from "groq-sdk";
import dotenv from "dotenv";
import { jsonrepair } from "jsonrepair";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const extractJson = (responseText) => {
  const jsonMatch = responseText.match(/{[\s\S]*}/);
  if (jsonMatch) {
    return jsonMatch[0];
  } else {
    throw new Error("No JSON object found in the response");
  }
};

const generateResumePDF = async (resumeData) => {
  try {
    const prompt = ` I will provide you the resume data and you have to simply fit that data into to the jason format provided below.
    Without modifing anything in the json format and no other information should be added in the response onlt the data given,
    and if any data is missing then put that data as "N/A" in the json format.

    data provided: ${resumeData}

      ### Response Format:
     - And stick to the given jason format dont change the format and no other information should be added in the response
     - Format note: Provide ONLY the JSON object with no additional text
     - No introduction text like "Here's a question..." or "Based on..."
     - The response should start directly with "{" and end with "}"
     - No extra spaces or new lines outside the JSON object
     - NO introduction text, preamble, or additional explanations
     - ONLY provide the exact JSON format requested with nothing else
     - ZERO extraneous words, commentary, or formatting outside the JSON structure
     - No additional text, comments, or explanations like "I hereby declare that all the above-mentioned information......" please give only the json format
     -*IMPORTANT*  Dont give this type of text "I hereby declare that all the above-mentioned information is correct to the best of my knowledge and belief. I bear the responsibility for the correctness of the above-mentioned particulars." please give only the json format
     - *IMPORTANT* No additional text, comments, or explanations like "I hereby declare that all the above-mentioned information......" please give only the json format
    Return a JSON object strictly following this structure:
    {  
        "name": "Full Name",
        "gmail": "professional.email@domain.com",
        "phoneNumber": "Contact Number",
        "linkedIn": "LinkedIn URL",
        "github": "GitHub URL",
        "location": "City, State",
        "graduation": {
          "degree": "Complete Degree Name",
          "universityName": "University Name",
          "location": "Location",
          "yearSpan": "YYYY-YYYY",
          "cpi": "GPA"
        },
        "intermediate": {
          "schoolName": "School Name",
          "percentage": "XX%",
          "stream": "Stream",
          "yearSpan": "YYYY-YYYY",
          "location": "Location"
        },
        "highSchool": {
          "schoolName": "School Name",
          "percentage": "XX%",
          "yearSpan": "YYYY-YYYY",
          "location": "Location"
        },
      "experience": [
        {
          "designation": "Industry-Standard Title",
          "companyName": "Company Name",
          "description": [
            "• Achieved X% improvement by implementing Y solution using Z technology",
            "• Led team of X members to deliver Y project resulting in Z impact"
          ]
        }
      ],
      "projects": [
        {
          "title": "Descriptive Project Name",
          "description": [
            "• Problem solved and approach taken",
            "• Technologies and methodologies used",
            "• Quantifiable results and impact"
          ]
        }
      ],
        "technicalSkills": [
          "Technical Skill 1",
          "Technical Skill 2",
          "Technical Skill 3",....
        ],
        "softSkills": [
          "Soft Skill 1",
          "Soft Skill 2",....
        ],
        "certification": [
          { "name": "Certified in Introduction to Generative AI" },
          { "name": "AWS Certified Solutions Architect" }
        ],
      "achievements": [
        "Quantified achievement with metrics"
      ]
    }
    `;
    const response = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama3-70b-8192",
    });

    console.log("Raw Response:", response);
    const rawContent = response.choices[0].message.content;
    const jsonString = extractJson(rawContent);
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(jsonString);
    } catch (e) {
      // Try to repair and parse again
      parsedResponse = JSON.parse(jsonrepair(jsonString));
    }
    return parsedResponse;
  } catch (error) {
    console.error("Error generating resume PDF:", error);
    throw new Error("Failed to generate resume PDF");
  }
};

export default generateResumePDF;