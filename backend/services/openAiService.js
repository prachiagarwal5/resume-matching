require('dotenv').config();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const analyzeResume = async (resumeText, jobDescription) => {
    try {
        const prompt = `
    I will provide you with two inputs:
    Resume Text: A candidate's resume in text format.
    Job Description (JD): A job listing or description that the candidate is applying to.

    Your task is to evaluate the resume in relation to the JD and return a detailed, constructive report covering the following areas. 
    Be sure to match skills not just by keyword, but by context. For example, if the JD mentions "Python" for Data Structures and Algorithms (DSA), 
    match it only if Python was used for DSA in the resume, not for machine learning or other unrelated contexts.

    Here is the Resume Text: "${resumeText}"
    Here is the Job Description: "${jobDescription}"

    Please evaluate and return a JSON object with the following fields:

    matchedSkills: A list of skills from the resume that match the JD based on context. If the JD mentions a skill in a specific context (e.g., Python for DSA), ensure the skill is only matched if it appears in that context in the resume. Provide contextual explanations for each match.

    suggestedSkills: A list of additional skills that the candidate could add to their resume to make it more aligned with the JD. Suggest both technical and soft skills if relevant, and consider any contextual gaps between the JD and resume.

    matchedProjectsAndInternships: Identify specific projects and internships from the resume that align most closely with the JD. Explain why they match based on the context in which skills or technologies were used. For example, if a project involved Python for DSA and the JD requests Python for DSA, explain this alignment.

    rephrasedProjectsAndInternships: Provide examples of how to rephrase certain project or internship descriptions in the resume to better align with the JD. Ensure that rephrased versions emphasize relevant skills, technologies, and outcomes in the appropriate context, making them more impactful.

    resumeImprovementSuggestions: Offer suggestions for how the candidate can enhance their resume to make it more professional and tailored to the JD. This should include advice on structure, formatting, and content. Focus on improving clarity, readability, and how effectively skills are presented in relation to the JD's requirements.

    The JSON object should follow this structure:
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

    Focus on contextual alignment between the resume and JD, ensuring skills are matched based on the context in which they are mentioned and demonstrated.
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
