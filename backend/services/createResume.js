require("dotenv").config();
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY2 });

// Helper function to extract valid JSON from response
const extractValidJson = (data) => {
  try {
    // Regular expression to capture valid JSON structure from the response
    const jsonMatch = data.match(/{.*}/s);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]); // Parse only the JSON part
    }
    throw new Error("No valid JSON found in the response");
  } catch (error) {
    console.error("Error extracting JSON:", error);
    throw error; // Rethrow to handle it in the main function
  }
};

// Helper function to trim and validate the JSON structure
const trimResumeData = (data) => {
  try {
    const parsedData = extractValidJson(data);

    // Allowed keys in the JSON structure, now including 'projects' and 'certifications'
    const validKeys = [
      "contactInformation",
      "objective",
      "education",
      "skills",
      "workExperience",
      "achievements",
      "projects",
    ];

    // Filter out any unnecessary fields
    const trimmedData = {};
    validKeys.forEach((key) => {
      if (parsedData[key]) {
        trimmedData[key] = parsedData[key];
      } else {
        trimmedData[key] = "Empty"; // Handle empty fields
      }
    });

    return trimmedData;
  } catch (error) {
    console.error("Error parsing or trimming resume data:", error);
    return {};
  }
};

// Function to generate resume from raw JSON data
const generateResume = async (candidateData) => {
  try {
    const candidateDataString = JSON.stringify(candidateData);
    const prompt = `
    I will provide you with raw JSON data of a candidate's information.
    Your task is to generate a highly optimized, ATS-friendly resume in JSON format that would achieve an ATS score above 95%.
  
    This is the Candidate data: "${candidateData}"
  
    ### ATS Optimization Instructions:
    1. Analyze the job market trends and incorporate highly relevant keywords.
    2. Use industry-standard job titles and skills terminology.
    3. Ensure proper keyword density (5-8% keyword density for critical skills).
    4. Avoid graphics, tables, or complex formatting that might confuse ATS systems.
    5. Use standardized section headings that ATS systems can easily recognize.
  
    ### Content Enhancement Guidelines:
    1. Begin bullets with strong action verbs (e.g., "Implemented," "Developed," "Managed," "Optimized").
    2. Include quantifiable achievements with metrics (%, $, numbers).
    3. Mirror keywords from common job descriptions in your industry.
    4. Use full terms before abbreviations (e.g., "Application Programming Interface (API)").
    5. Incorporate both hard skills and soft skills strategically.
  
    ### Section-Specific Instructions:
    - Objective: Create a powerful 2-3 sentence summary focusing on value proposition and key skills.
    - Work Experience: Lead with impactful achievements, use metrics, and highlight relevant technologies.
    - Skills: Organize technical skills by categories (e.g., Programming Languages, Frameworks, Tools).
    - Projects: Emphasize problem-solving and technical implementation details.
    - Achievements: Quantify results and align with industry standards.
  
    ### Response Format:
    Return a JSON object strictly following this structure, ensuring 95%+ ATS optimization:
    {
      "contactInformation": {
        "name": "Full Name",
        "email": "professional.email@domain.com",
        "phone": "Contact Number",
        "linkedin": "LinkedIn URL",
        "github": "GitHub URL",
        "location": "City, State"
      },
      "objective": "ATS-optimized professional summary",
      "education": {
        "graduation": {
          "degree": "Complete Degree Name",
          "institution": "University Name",
          "location": "Location",
          "yearSpan": "YYYY-YYYY",
          "CPI": "GPA"
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
        }
      },
      "workExperience": [
        {
          "jobTitle": "Industry-Standard Title",
          "company": "Company Name",
          "description": [
            "• Achieved X% improvement by implementing Y solution using Z technology",
            "• Led team of X members to deliver Y project resulting in Z impact"
          ]
        }
      ],
      "projects": [
        {
          "projectTitle": "Descriptive Project Name",
          "description": [
            "• Problem solved and approach taken",
            "• Technologies and methodologies used",
            "• Quantifiable results and impact"
          ]
        }
      ],
      "skills": {
        "technicalSkills": [
          "Industry-Standard Skill 1",
          "Framework/Technology 2"
        ],
        "softSkills": [
          "Leadership",
          "Problem Solving",
          "Communication"
        ]
      },
      "certifications": [
        {
          "name": "Industry-Recognized Certification"
        }
      ],
      "achievements": [
        "Quantified achievement with metrics",
        "Recognition or award with context"
      ]
    }
  
    Ensure each section is optimized for maximum ATS compatibility and keyword matching.`;

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-70b-8192",
      max_tokens: 3000,
    });

    console.log("Raw Response:", response.choices[0].message.content);

    // Trim and validate the JSON response
    const trimmedResume = trimResumeData(response.choices[0].message.content);

    // console.log("Trimmed and Valid Resume:", trimmedResume);

    return trimmedResume;
  } catch (error) {
    console.error("Error generating resume JSON:", error);
    throw new Error("Groq API error");
  }
};

module.exports = { generateResume };
