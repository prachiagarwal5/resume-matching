require('dotenv').config();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Function to generate resume from raw JSON data
const generateResume = async (candidateData) => {
try {
const prompt = `I will provide you with raw JSON data of a candidate's information. Your task is to generate a structured JSON response representing the candidate's resume.
        
- Parse the candidate’s information to construct a resume in JSON format.
- Ensure all sections like contact details, education, work experience, projects, and skills are properly structured.
- Include all **skills** listed in the raw data under a separate "Skills" section, ensuring they are categorized as **technical** and **soft skills**.
- Return the response in **strict JSON format** as outlined below.

### JSON Structure:

{
  "contactInformation": {
    "name": "Candidate's Name",
    "email": "Candidate's Email",
    "phone": "Candidate's Phone Number",
    "linkedin": "LinkedIn Profile (if available)",
    "github": "GitHub Profile (if available)"
  },
  "objective": "A concise summary of the candidate’s strengths and career goals (2-3 sentences).",
  "education": [
    {
      "degree": "Degree Name",
      "institution": "Institution Name",
      "location": "Institution Location",
      "startDate": "Start Date",
      "endDate": "End Date",
      "relevantCoursework": ["Course 1", "Course 2"]
    }
  ],
  "workExperience": [
    {
      "jobTitle": "Job Title",
      "company": "Company Name",
      "location": "Company Location",
      "startDate": "Start Date",
      "endDate": "End Date",
      "achievements": [
        "Bullet point 1 detailing an achievement or responsibility",
        "Bullet point 2 detailing another achievement"
      ]
    }
  ],
  "skills": {
    "technicalSkills": ["Skill 1", "Skill 2", "Skill 3"],
    "softSkills": ["Skill 1", "Skill 2"]
  },
  "projects": [
    {
      "projectTitle": "Project Title",
      "description": "A brief description of the project, focusing on technologies used and outcomes.",
      "technologies": ["Tech 1", "Tech 2"]
    }
  ],
  "certifications": [
    {
      "name": "Certification Name",
      "date": "Date of Completion"
    }
  ]
}

Here is the candidate's raw JSON data: 
${JSON.stringify(candidateData)}

Return the JSON object strictly following the structure mentioned above.`;

const response = await groq.chat.completions.create({
    messages: [
        {
            role: "user",
            content: prompt,
        },
    ],
    model: "llama3-70b-8192", // Adjust the model if needed
    max_tokens: 3000, // Set token limit for detailed JSON output
});

return response.data;
} catch (error) {
    console.error("Error generating resume JSON:", error);
}
};
