require('dotenv').config();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const analyzeResume = async (resumeText, jobDescription) => {
    try {
        const prompt = `
    I will provide you with two inputs:
    
    Resume Text: A candidate's resume in text format.
    Job Description (JD): A job listing or description that the candidate is applying to.

    Your task is to evaluate the resume in relation to the JD and return a detailed, constructive report covering the following areas. Make sure to go beyond simple keyword matching. 
    Comprehend the context and meaning behind both the resume and the JD to identify relevant skills, projects, and experiences. Your goal is to help the user craft a more professional 
    and tailored resume.

    Here is the Resume Text: "${resumeText}"
    Here is the Job Description: "${jobDescription}"

    Please evaluate and return a JSON object with the following fields:

    matchedSkills: A list of skills from the resume that match the skills required in the JD. Ensure these skills are matched contextually, not just by keywords. If the skill is demonstrated through a project or experience, explain how it aligns with the JD.

    suggestedSkills: A list of additional skills that the candidate could add to their resume to make it more aligned with the JD. Suggest both technical and soft skills if relevant, and consider any gaps between the JD and resume.

    matchedProjectsAndInternships: Identify and return the specific projects and internships from the resume that align most closely with the JD. Instead of simply finding keyword matches, explain why certain experiences or projects are relevant based on their context, outcomes, or the technologies used.

    rephrasedProjectsAndInternships: Provide examples of how to rephrase certain project or internship descriptions in the resume to better align with the JD. Ensure that the rephrased versions emphasize the most relevant skills, technologies, and outcomes while presenting them in a more professional and impactful manner.

    resumeImprovementSuggestions: Offer suggestions for how the candidate can enhance their resume to make it look more professional and tailored to the JD. This should include advice on structure, formatting, and content—such as improving the clarity of achievements, highlighting key skills, and using action-oriented language. Include tips on how to present information succinctly and effectively, as well as how to improve readability and overall impact.

    The JSON object should be structured like this:
    {
        "resumeText": "The candidate's resume text",
        "jobDescription": "The provided job description",
        "matchedSkills": ["Skill1 (contextual explanation)", "Skill2 (contextual explanation)", "Skill3 (contextual explanation)"],
        "suggestedSkills": ["Suggested Skill 1 (with explanation)", "Suggested Skill 2 (with explanation)"],
        "matchedProjectsAndInternships": [
            {
                "project": "Project Title 1",
                "description": "Explain how this project aligns contextually with the JD and what was achieved"
            },
            {
                "internship": "Internship Title 1",
                "description": "Explain how this internship aligns contextually with the JD"
            }
        ],
        "rephrasedProjectsAndInternships": [
            {
                "originalProject": "Original project description",
                "rephrasedProject": "Rephrased project description aligning more professionally and contextually with the JD"
            },
            {
                "originalInternship": "Original internship description",
                "rephrasedInternship": "Rephrased internship description to align with the JD and highlight key outcomes"
            }
        ],
        "resumeImprovementSuggestions": [
            "Suggestion 1 for improving the overall professionalism and structure of the resume",
            "Suggestion 2 for highlighting skills and achievements more clearly",
            "Suggestion 3 for enhancing readability and impact"
        ]
    }

    Ensure the keys are exactly "resumeText", "jobDescription", "matchedSkills", "suggestedSkills", "matchedProjectsAndInternships", "rephrasedProjectsAndInternships", and "resumeImprovementSuggestions". The focus should be on providing actionable, contextual feedback that helps the user present their resume in a professional, impactful way that aligns with the job requirements.
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
