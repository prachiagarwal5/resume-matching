require('dotenv').config();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Function to generate resume from raw JSON data
const generateResume = async (candidateData) => {
try {const prompt = `I will provide you with raw JSON data of a candidate's information. Your task is to generate a well-structured, ATS-compliant resume in JSON format, ensuring that it is formatted to pass ATS software checks effectively.
  Below is the Candidate data:"${candidateData}"
    ### Instructions:
    1. **Format**: Follow the exact structure as defined below, ensuring that all sections are clearly labeled and appropriately formatted.
    2. **Keywords**: Highlight and include the skills, achievements, and experiences in a way that optimizes for ATS keyword matching.
    3. **Skills Categorization**: Ensure all skills are divided into **technical** and **soft skills**.
    4. **Consistency**: Ensure consistency in date formats and section titles to adhere to ATS standards.
    5. **Avoid Graphics or Special Characters**: Keep the content simple and avoid using special characters or complex formatting.
    6. **Completion**: Ensure no section is left blank if data is available; otherwise, omit empty sections.
    7. **ATS Optimization**: Use commonly accepted keywords for job roles and responsibilities to enhance resume ranking for ATS systems.
    
    ### JSON Structure:
    
    {
      "contactInformation": {
        "name": "Candidate's Name",
        "gmail": "Candidate's Email",
        "phoneNumber": "Candidate's Phone Number",
        "linkedin": "LinkedIn Profile (if available)",
        "github": "GitHub Profile (if available)",
      },
      "objective": "A concise, ATS-optimized summary of the candidate’s strengths and career goals (2-3 sentences).",
      "education": [
        {
          "degree": "Degree Name",
          " universityName": "Institution Name",
          "location": "Institution Location",
          "startDate": "Start Date (Month, Year)",
          "endDate": "End Date (Month, Year)",
          "relevantCoursework": ["Course 1", "Course 2"]
        }
      ],
      "workExperience": [
        {
          "jobTitle": "Job Title",
          "company": "Company Name",
          "location": "Company Location",
          "startDate": "Start Date (Month, Year)",
          "endDate": "End Date (Month, Year)",
          "achievements": [
            "Action-oriented achievement 1 with quantifiable results (e.g., 'Increased X by Y% using Z')",
            "Action-oriented achievement 2 focusing on job-relevant tasks"
          ]
        }
      ],
      "skills": {
        "technicalSkills": ["Technical Skill 1", "Technical Skill 2", "Technical Skill 3"],
        "softSkills": ["Soft Skill 1", "Soft Skill 2"]
      },
      "projects": [
        {
          "projectTitle": "Project Title",
          "description": [
            "• Brief description point 1 about the project's purpose and goal.",
            "• Detailed point 2 explaining specific technologies used.",
            "• Point 3 about the candidate’s role and responsibilities in the project.",
            "• Point 4 describing the results or outcomes achieved (e.g., 'Reduced processing time by X%')."
          ],
          "technologies": ["Tech 1", "Tech 2"]
        }
      ],
      "certifications": [
        {
          "name": "Certification Name",
          "date": "Date of Completion (Month, Year)"
        }
      ],
      "keywords": {
        "keywordsToHighlight": ["Keyword 1", "Keyword 2", "Keyword 3"]
      }
    }
    
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
// console.log("************************************");
// console.log("Candidate Data:", candidateData);
console.log("************************************");
console.log("Generated resume JSON:", response.data);
console.log("************************************");


return response.data;
} catch (error) {
    console.error("Error generating resume JSON:", error);
}
};


module.exports = { generateResume };