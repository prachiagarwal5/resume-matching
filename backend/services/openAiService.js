require('dotenv').config();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const analyzeResume = async (resumeText, jobDescription) => {
    try {
        const prompt = `
I will provide you with two inputs: 
- Resume Text: The candidate's resume in text format.
- Job Description (JD): The job description the candidate is applying for.

Your task is to analyze the resume in context with the JD and provide a detailed, professional report. Focus on matching relevant skills, experiences, and projects, but go beyond simple keyword matching by understanding the context and intent behind both the resume and the JD. The goal is to help the candidate enhance their resume, making it more aligned with the job and improving their chances of being shortlisted.

Inputs:
- Resume Text: "${resumeText}"
- Job Description: "${jobDescription}"

Return a JSON object containing the following fields:

1. **matchedSkills**: 
    - A list of skills from the resume that align with the skills required in the JD.
    - Include context for each skill—how it was demonstrated through experiences, projects, or achievements.
    - Focus on meaningful alignment, not just keyword matches.

2. **suggestedSkills**: 
    - A list of skills the candidate could add to their resume to better match the JD.
    - Suggest both technical and soft skills where relevant, identifying gaps that could make the resume stronger.
    - Explain why each suggested skill would be beneficial.

3. **matchedProjectsAndInternships**: 
    - Identify specific projects or internships from the resume that closely align with the JD.
    - Provide a context-based explanation of why these experiences are relevant, highlighting technologies, outcomes, or key responsibilities.

4. **rephrasedProjectsAndInternships**: 
    - Offer improved versions of the project or internship descriptions from the resume to better align with the JD.
    - Focus on presenting skills, outcomes, and responsibilities in a professional and impactful way, tailoring them to the job requirements.

5. **resumeImprovementSuggestions**: 
    - Provide actionable suggestions to improve the overall quality and professionalism of the resume.
    - Focus on areas such as structure, clarity, formatting, and how to highlight key achievements effectively.
    - Offer guidance on how to make the resume more impactful, readable, and tailored to the job.

### The JSON object should follow this structure:

{
    "resumeText": "The candidate's resume text",
    "jobDescription": "The provided job description",
    "matchedSkills": [
        "Skill1 (with contextual explanation)", 
        "Skill2 (with contextual explanation)"
    ],
    "suggestedSkills": [
        "Suggested Skill1 (with explanation)", 
        "Suggested Skill2 (with explanation)"
    ],
    "matchedProjectsAndInternships": [
        {
            "project": "Project Title",
            "description": "Explanation of how this project aligns with the JD"
        },
        {
            "internship": "Internship Title",
            "description": "Explanation of how this internship aligns with the JD"
        }
    ],
    "rephrasedProjectsAndInternships": [
        {
            "originalProject": "Original project description",
            "rephrasedProject": "Rephrased description tailored to JD"
        },
        {
            "originalInternship": "Original internship description",
            "rephrasedInternship": "Rephrased internship description to better align with the JD"
        }
    ],
    "resumeImprovementSuggestions": [
        "Improvement suggestion 1",
        "Improvement suggestion 2",
        "Improvement suggestion 3"
    ]
}

Ensure the keys are exactly as shown. The goal is to provide actionable, professional feedback that helps the user refine their resume to improve alignment with the job requirements, while enhancing its overall professionalism and impact.
`;


    
    
        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "llama3-8b-8192", // Adjust the model if needed
        });
        
        // Log response to check the data structure
        console.log(response);
        
        const { choices } = response;
        if (choices && choices[0]?.message?.content) {
            console.log("Matched Skills:", choices[0].message.content);
            return {
                matches: choices[0].message.content,
            };
        } else {
            console.log("No matches found.");
            return {
                matches: "No matches found.",
            };
        }
    } catch (error) {
        console.error('Error calling Groq API:', error);
        throw new Error('Groq API error');
    }
};

module.exports = { analyzeResume };
